import Papa from 'papaparse';
import { useEffect, useMemo, useState } from 'react';
import { FILTER_COLUMNS } from './schema';
import { filterRows, toNumber, uniqueOptions } from '../utils/dataUtils';
import { DataContext } from './DataContext';

function parseCsv(path) {
  return new Promise((resolve, reject) => {
    Papa.parse(path, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => resolve(data),
      error: reject,
    });
  });
}

export function DataProvider({ children }) {
  const [trialRows, setTrialRows] = useState([]);
  const [referenceRows, setReferenceRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      parseCsv(`${import.meta.env.BASE_URL}data/TrialData.csv`),
      parseCsv(`${import.meta.env.BASE_URL}data/IncludedStudies.csv`),
    ])
      .then(([trials, references]) => {
        setTrialRows(trials);
        setReferenceRows(references);
      })
      .catch((caughtError) => setError(caughtError))
      .finally(() => setLoading(false));
  }, []);

  const metadata = useMemo(() => {
    const years = trialRows.map((row) => toNumber(row.PublicationYear)).filter(Boolean);
    const yearRange = years.length ? [Math.min(...years), Math.max(...years)] : [2000, 2026];
    return {
      yearRange,
      phaseOptions: uniqueOptions(trialRows, FILTER_COLUMNS.phase),
      vaccineTypeOptions: uniqueOptions(trialRows, FILTER_COLUMNS.vaccineType),
      manufacturerOptions: uniqueOptions(trialRows, FILTER_COLUMNS.manufacturer),
    };
  }, [trialRows]);

  const [filters, setFilters] = useState({
    query: '',
    yearRange: [2000, 2026],
    phases: [],
    vaccineTypes: [],
    manufacturers: [],
  });

  useEffect(() => {
    if (!trialRows.length) return;
    setFilters({
      query: '',
      yearRange: metadata.yearRange,
      phases: metadata.phaseOptions,
      vaccineTypes: metadata.vaccineTypeOptions,
      manufacturers: metadata.manufacturerOptions,
    });
  }, [metadata, trialRows.length]);

  const filteredRows = useMemo(
    () => filterRows(trialRows, filters),
    [trialRows, filters],
  );

  const value = useMemo(
    () => ({
      trialRows,
      referenceRows,
      filteredRows,
      filters,
      setFilters,
      metadata,
      loading,
      error,
    }),
    [trialRows, referenceRows, filteredRows, filters, metadata, loading, error],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
