import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import CrimeTable from '../components/CrimeTable';
import { ChevronLeftIcon, ChevronRightIcon } from '../components/Icons';

const initialFilters = {
  search: '',
  crimeType: '',
  district: '',
  arrest: '',
  year: '',
  location: '',
};

function SelectField({ label, name, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-[#6B756F]">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="rounded-lg border border-[#DCE3DA] px-3 py-2 text-sm text-[#29332D] focus:outline-none focus:ring-2 focus:ring-[#3A7D7C] focus:border-[#3A7D7C]"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextField({ label, name, value, onChange, placeholder }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-[#6B756F]">{label}</span>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded-lg border border-[#DCE3DA] px-3 py-2 text-sm text-[#29332D] focus:outline-none focus:ring-2 focus:ring-[#3A7D7C] focus:border-[#3A7D7C]"
      />
    </label>
  );
}

function CrimeRecords() {
  const [filters, setFilters] = useState(initialFilters);
  const [records] = useState([]);
  const [loading] = useState(false);
  const [page, setPage] = useState(1);
  const totalPages = 1;

  function handleChange(e) {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleApply() {
    // Integration point: call getCrimes({ ...filters, page }) once backend is live.
    setPage(1);
  }

  function handleClear() {
    setFilters(initialFilters);
    setPage(1);
  }

  return (
    <div>
      <PageHeader
        title="Crime Records"
        description="Search, filter and explore historical crime records."
      />

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#DCE3DA] shadow-sm p-5 mb-6">
        <h3 className="text-sm font-semibold text-[#29332D] mb-4">
          Filters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <TextField
            label="Search Crime"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="e.g. Theft, Assault..."
          />

          <SelectField
            label="Crime Type"
            name="crimeType"
            value={filters.crimeType}
            onChange={handleChange}
            options={[]}
          />

          <SelectField
            label="District"
            name="district"
            value={filters.district}
            onChange={handleChange}
            options={[]}
          />

          <SelectField
            label="Arrest Status"
            name="arrest"
            value={filters.arrest}
            onChange={handleChange}
            options={['Yes', 'No']}
          />

          <SelectField
            label="Year"
            name="year"
            value={filters.year}
            onChange={handleChange}
            options={[]}
          />

          <TextField
            label="Location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="e.g. Ward, Community Area..."
          />
        </div>

        <div className="flex items-center gap-3 mt-5">
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-[#3A7D7C] text-white hover:bg-[#2F6867] transition-colors"
          >
            Apply Filters
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-[#DCE3DA] text-[#6B756F] hover:bg-[#E8F0E9] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <CrimeTable records={records} loading={loading} />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <p className="text-[#6B756F]">
          Page {page} of {totalPages}
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-[#DCE3DA] text-[#6B756F] disabled:opacity-40 hover:bg-[#E8F0E9]"
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm border ${
                page === n
                  ? 'bg-[#3A7D7C] text-white border-[#3A7D7C]'
                  : 'border-[#DCE3DA] text-[#6B756F] hover:bg-[#E8F0E9]'
              }`}
            >
              {n}
            </button>
          ))}

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-[#DCE3DA] text-[#6B756F] disabled:opacity-40 hover:bg-[#E8F0E9]"
            aria-label="Next page"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CrimeRecords;
