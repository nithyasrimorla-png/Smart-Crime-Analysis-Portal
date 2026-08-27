import EmptyState from './EmptyState';
import { DatabaseIcon, EyeIcon } from './Icons';

function ArrestBadge({ value }) {
  if (value === true || value === 'true' || value === 'Yes') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success-light text-success">
        Yes
      </span>
    );
  }
  if (value === false || value === 'false' || value === 'No') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-warning-light text-warning">
        No
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-pale text-muted">
      —
    </span>
  );
}

// records: expected shape { id, date, crimeType, description, district, location, arrest }
// This shape is the contract the future GET /api/crimes response should follow.
function CrimeTable({ records = [], loading = false }) {
  const columns = ['Date', 'Crime Type', 'Description', 'District', 'Location', 'Arrest', 'Actions'];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-warmwhite border-b border-line">
              {columns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="text-left font-semibold text-muted uppercase tracking-wide text-xs px-4 py-3 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {loading && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-muted text-sm">
                  Loading records...
                </td>
              </tr>
            )}

            {!loading && records.length === 0 && (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState
                    icon={DatabaseIcon}
                    title="No crime records found."
                    description="Records will appear here once the backend and database are connected."
                  />
                </td>
              </tr>
            )}

            {!loading &&
              records.map((r, i) => (
                <tr key={r.id ?? i} className="hover:bg-pale/40 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-muted">{r.date ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-charcoal">{r.crimeType ?? '—'}</td>
                  <td className="px-4 py-3 text-muted max-w-xs truncate">{r.description ?? '—'}
                    <ArrestBadge value={r.arrest} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 text-xs font-medium"
                    >
                      <EyeIcon className="h-4 w-4" /> View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CrimeTable;