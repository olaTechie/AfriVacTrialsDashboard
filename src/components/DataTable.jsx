import { useEffect, useMemo, useState } from 'react';

export default function DataTable({ rows, columns, pageSize = 12 }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const visibleRows = useMemo(
    () => rows.slice(page * pageSize, page * pageSize + pageSize),
    [rows, page, pageSize],
  );

  useEffect(() => {
    if (page >= pageCount) setPage(0);
  }, [page, pageCount]);

  return (
    <div className="table-shell">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, index) => (
              <tr key={`${row.StudyTitle ?? row.Title ?? index}-${index}`}>
                {columns.map((column) => (
                  <td key={column}>{row[column] || 'Not reported'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span>
          Page {page + 1} of {pageCount} · {rows.length.toLocaleString()} records
        </span>
        <div>
          <button type="button" disabled={page === 0} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <button
            type="button"
            disabled={page >= pageCount - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
