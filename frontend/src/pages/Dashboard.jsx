import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import {
  DatabaseIcon,
  BarChartIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "../components/Icons";
import { getCrimeStats } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        setError("");

        const response = await getCrimeStats();

        console.log("Crime Stats API:", response);

        if (response?.success) {
          setStats(response);
        } else {
          setError("Unable to load crime statistics.");
        }
      } catch (err) {
        console.error("Dashboard stats error:", err);
        setError("Unable to connect to the backend.");
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Dashboard"
          description="Overview of historical crime data and statistics."
        />

        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageHeader
          title="Dashboard"
          description="Overview of historical crime data and statistics."
        />

        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div>
        <PageHeader
          title="Dashboard"
          description="Overview of historical crime data and statistics."
        />

        <EmptyState
          icon={DatabaseIcon}
          title="No crime statistics available"
          description="Crime statistics could not be loaded."
        />
      </div>
    );
  }

  const crimeTypes = stats.crimeTypes || [];
  const districts = stats.districts || [];
  const arrests = stats.arrests || [];
  const domestic = stats.domestic || [];

  const arrestedCount =
    arrests.find((item) => item.arrest === true)?.count || 0;

  const topCrimeTypes = crimeTypes.slice(0, 10);
  const topDistricts = districts.slice(0, 10);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of historical crime data and statistics."
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Total Crimes */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Crimes
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {Number(stats.totalCrimes || 0).toLocaleString()}
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                Total historical crime records
              </p>
            </div>

            <div className="p-3 bg-slate-100 rounded-lg">
              <DatabaseIcon className="w-6 h-6 text-slate-700" />
            </div>
          </div>
        </div>

        {/* Crime Types */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Crime Types
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {crimeTypes.length.toLocaleString()}
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                Different crime categories
              </p>
            </div>

            <div className="p-3 bg-slate-100 rounded-lg">
              <BarChartIcon className="w-6 h-6 text-slate-700" />
            </div>
          </div>
        </div>

        {/* Districts */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Districts
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {districts.length.toLocaleString()}
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                Police districts with records
              </p>
            </div>

            <div className="p-3 bg-slate-100 rounded-lg">
              <MapPinIcon className="w-6 h-6 text-slate-700" />
            </div>
          </div>
        </div>

        {/* Arrests */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Arrests
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {Number(arrestedCount).toLocaleString()}
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                Records with an arrest
              </p>
            </div>

            <div className="p-3 bg-slate-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-slate-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Crime Types */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Top Crime Types
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Most frequently recorded crime categories
          </p>
        </div>

        {topCrimeTypes.length > 0 ? (
          <div className="space-y-4">
            {topCrimeTypes.map((crime, index) => (
              <div
                key={`${crime.primary_type}-${index}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-400 w-6">
                    {index + 1}
                  </span>

                  <span className="text-sm font-semibold text-slate-700">
                    {crime.primary_type}
                  </span>
                </div>

                <span className="text-sm font-bold text-slate-900">
                  {Number(crime.count || 0).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={DatabaseIcon}
            title="No crime type data"
            description="No crime type statistics are available."
          />
        )}
      </div>

      {/* Crime by District */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Crime by District
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Crime records across police districts
          </p>
        </div>

        {topDistricts.length > 0 ? (
          <div className="space-y-4">
            {topDistricts.map((district, index) => (
              <div
                key={`${district.district}-${index}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-400 w-6">
                    {index + 1}
                  </span>

                  <span className="text-sm font-semibold text-slate-700">
                    District {district.district}
                  </span>
                </div>

                <span className="text-sm font-bold text-slate-900">
                  {Number(district.count || 0).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={MapPinIcon}
            title="No district data"
            description="No district statistics are available."
          />
        )}
      </div>

      {/* Arrest Analysis */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Arrest Analysis
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Distribution of records by arrest status
          </p>
        </div>

        <div className="space-y-4">
          {arrests.map((item, index) => (
            <div
              key={`${item.arrest}-${index}`}
              className="flex items-center justify-between"
            >
              <span className="text-sm font-semibold text-slate-700">
                {item.arrest ? "Arrested" : "Not Arrested"}
              </span>

              <span className="text-sm font-bold text-slate-900">
                {Number(item.count || 0).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Domestic Crime Analysis */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Domestic Crime Analysis
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Distribution of domestic and non-domestic records
          </p>
        </div>

        <div className="space-y-4">
          {domestic.map((item, index) => (
            <div
              key={`${item.domestic}-${index}`}
              className="flex items-center justify-between"
            >
              <span className="text-sm font-semibold text-slate-700">
                {item.domestic ? "Domestic" : "Not Domestic"}
              </span>

              <span className="text-sm font-bold text-slate-900">
                {Number(item.count || 0).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;