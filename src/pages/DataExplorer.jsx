import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable.jsx';
import MetricCard from '../components/MetricCard.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useData } from '../data/DataContext';
import { TABLE_COLUMNS } from '../data/schema';
import { countBy } from '../utils/dataUtils';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function DataExplorer() {
  usePageTitle('Data Explorer');
  const { filteredRows, trialRows } = useData();
  const allColumns = Object.keys(trialRows[0] ?? {});
  const [columns, setColumns] = useState(TABLE_COLUMNS);
  const [query, setQuery] = useState('');

  const visibleRows = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return filteredRows;
    return filteredRows.filter((row) =>
      columns.some((column) => String(row[column] ?? '').toLowerCase().includes(q)),
    );
  }, [filteredRows, query, columns]);

  const topConditions = countBy(visibleRows, 'ConditionCategory', { limit: 3 });

  return (
    <PageTransition>
      <SectionHeader
        eyebrow="Data explorer"
        title="Shape the clinical trials table"
        copy="Select columns, search within the filtered result set, and inspect records without leaving the app."
      />

      <section className="explorer-controls">
        <label className="field">
          <span>Search visible columns</span>
          <input
            value={query}
            placeholder="Search title, country, vaccine, result..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Visible columns</span>
          <select
            multiple
            value={columns}
            onChange={(event) =>
              setColumns(Array.from(event.target.selectedOptions, (option) => option.value))
            }
          >
            {allColumns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="metric-grid metric-grid--compact">
        <MetricCard label="Rows in table" value={visibleRows.length.toLocaleString()} />
        <MetricCard label="Columns selected" value={columns.length} tone="blue" />
        <MetricCard label="Top condition" value={topConditions[0]?.name ?? 'Not reported'} tone="gold" />
      </section>

      <DataTable rows={visibleRows} columns={columns.length ? columns : TABLE_COLUMNS} pageSize={18} />
    </PageTransition>
  );
}
