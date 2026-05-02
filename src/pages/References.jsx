import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useData } from '../data/DataContext';
import { usePageTitle } from '../hooks/usePageTitle.js';

const referenceColumns = ['Year', 'Title', 'Authors', 'Journal', 'Abstract'];

export default function References() {
  usePageTitle('References');
  const { referenceRows } = useData();
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return referenceRows;
    return referenceRows.filter((row) =>
      referenceColumns.some((column) => String(row[column] ?? '').toLowerCase().includes(q)),
    );
  }, [referenceRows, query]);

  return (
    <PageTransition>
      <SectionHeader
        eyebrow="References"
        title="Published clinical trial literature"
        copy="A searchable, paginated replacement for the Streamlit AgGrid references page."
      />
      <label className="field reference-search">
        <span>Search references</span>
        <input
          value={query}
          placeholder="Search author, title, journal, abstract..."
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <DataTable rows={rows} columns={referenceColumns} pageSize={10} />
    </PageTransition>
  );
}
