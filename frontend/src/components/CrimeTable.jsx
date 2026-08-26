import EmptyState from './EmptyState';
import { DatabaseIcon, EyeIcon } from './Icons';

function ArrestBadge({ value }) {
  if (value === true || value === 'true' || value === 'Yes') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
        Yes
      </span>
    );
  }
  if (value === false || value === 'false' || value === 'No') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
        No
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
      —
    </span>
  );
}

// records: expected shape { id, date, crimeType, description, district, location, arrest }
// This shape is the contract the future GET /api/crimes response should follow.
function CrimeTable({ records = [], loading = false }) {
  const columns = ['Date', 'Crime Type', 'Description', 'District', 'Location', 'Arrest', 'Actions'];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="text-left font-semibold text-slate-500 uppercase tracking-wide text-xs px-4 py-3 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-400 text-sm">
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
                <tr key={r.id ?? i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{r.date ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-800">{r.crimeType ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{r.description ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{r.district ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{r.location ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
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