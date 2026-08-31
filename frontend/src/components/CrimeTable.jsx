import { EyeIcon } from "./Icons";

function CrimeTable({ records = [], loading = false }) {
  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">
          Loading crime records...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Date
              </th>

              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Crime Type
              </th>

              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Description
              </th>

              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                District
              </th>

              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Location
              </th>

              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Arrest
              </th>

              <th className="px-4 py-3 text-center font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {records.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-slate-50 transition"
              >
                {/* Date */}
                <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                  {record.date
                    ? new Date(record.date).toLocaleDateString()
                    : "—"}
                </td>

                {/* Crime Type */}
                <td className="px-4 py-3">
                  <span className="font-semibold text-slate-800">
                    {record.primary_type || "—"}
                  </span>
                </td>

                {/* Description */}
                <td className="px-4 py-3 text-slate-600 max-w-xs">
                  <div className="truncate" title={record.description}>
                    {record.description || "—"}
                  </div>
                </td>

                {/* District */}
                <td className="px-4 py-3 text-slate-600">
                  {record.district ?? "—"}
                </td>

                {/* Location */}
                <td className="px-4 py-3 text-slate-600 max-w-xs">
                  <div
                    className="truncate"
                    title={record.location_description}
                  >
                    {record.location_description || "—"}
                  </div>
                </td>

                {/* Arrest */}
                <td className="px-4 py-3">
                  {record.arrest ? (
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      No
                    </span>
                  )}
                </td>

                {/* Action */}
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    title="View crime record"
                    className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                  >
                    <EyeIcon size={18} />
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