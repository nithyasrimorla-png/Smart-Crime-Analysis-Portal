import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import CrimeTable from "../components/CrimeTable";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { DatabaseIcon } from "../components/Icons";
import { getCrimes } from "../services/api";

function CrimeRecords() {
  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [district, setDistrict] = useState("");
  const [arrest, setArrest] = useState("");
  const [year, setYear] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(50);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  async function loadRecords(currentPage = page) {
    try {
      setLoading(true);
      setError("");

      const response = await getCrimes({
        page: currentPage,
        limit,
        search,
        crimeType,
        district,
        arrest,
        year,
      });

      console.log("Crime Records API:", response);

      if (response?.success) {
        setRecords(response.records || []);
        setTotal(response.total || 0);
        setTotalPages(response.totalPages || 0);
      } else {
        setRecords([]);
        setTotal(0);
        setTotalPages(0);
        setError("Unable to load crime records.");
      }
    } catch (err) {
      console.error("Crime records error:", err);

      setError("Unable to connect to the backend.");
      setRecords([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecords(1);
  }, []);

  function handleSearch(event) {
    event.preventDefault();

    setPage(1);

    // Load using the selected filters
    loadRecords(1);
  }

  function clearFilters() {
    setSearch("");
    setCrimeType("");
    setDistrict("");
    setArrest("");
    setYear("");

    setPage(1);

    // Load all records again
    setTimeout(() => {
      loadRecords(1);
    }, 0);
  }

  function handlePrevious() {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      loadRecords(newPage);
    }
  }

  function handleNext() {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      loadRecords(newPage);
    }
  }

  return (
    <div>
      <PageHeader
        title="Crime Records"
        description="Browse, search and filter historical crime records."
      />

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Case number, description..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Crime Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Crime Type
            </label>

            <select
              value={crimeType}
              onChange={(e) => setCrimeType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            >
              <option value="">All Crime Types</option>
              <option value="THEFT">THEFT</option>
              <option value="BATTERY">BATTERY</option>
              <option value="CRIMINAL DAMAGE">CRIMINAL DAMAGE</option>
              <option value="ASSAULT">ASSAULT</option>
              <option value="MOTOR VEHICLE THEFT">
                MOTOR VEHICLE THEFT
              </option>
              <option value="BURGLARY">BURGLARY</option>
              <option value="ROBBERY">ROBBERY</option>
              <option value="NARCOTICS">NARCOTICS</option>
              <option value="HOMICIDE">HOMICIDE</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              District
            </label>

            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            >
              <option value="">All Districts</option>

              {Array.from({ length: 25 }, (_, i) => i + 1).map(
                (number) => (
                  <option key={number} value={number}>
                    District {number}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Arrest */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Arrest
            </label>

            <select
              value={arrest}
              onChange={(e) => setArrest(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            >
              <option value="">All</option>
              <option value="true">Arrested</option>
              <option value="false">Not Arrested</option>
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Year
            </label>

            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2020"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Search
            </button>

            <button
              type="button"
              onClick={clearFilters}
              className="px-5 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Result Count */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-800">
          Crime Records
        </h2>

        <span className="text-sm text-slate-500">
          {total.toLocaleString()} total records
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <Loading />
      ) : records.length > 0 ? (
        <>
          <CrimeTable records={records} />

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Previous
            </button>

            <span className="text-sm text-slate-600">
              Page <strong>{page}</strong> of{" "}
              <strong>{totalPages.toLocaleString()}</strong>
            </span>

            <button
              onClick={handleNext}
              disabled={page >= totalPages}
              className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <EmptyState
          icon={DatabaseIcon}
          title="No crime records found"
          description="No records matched your search or filters."
        />
      )}
    </div>
  );
}

export default CrimeRecords;