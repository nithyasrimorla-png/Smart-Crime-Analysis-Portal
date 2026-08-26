import { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import PageHeader from '../components/PageHeader';
import ChartCard from '../components/ChartCard';
import EmptyState from '../components/EmptyState';
import { PieChartIcon, TrendUpIcon, BuildingIcon, CheckCircleIcon, LocationIcon } from '../components/Icons';

const initialFilters = { year: '', crimeType: '', district: '' };
const COLORS = ['#2563eb', '#0ea5e9', '#6366f1', '#22c55e', '#f59e0b'];

function CrimeAnalytics() {
  const [filters, setFilters] = useState(initialFilters);

  const [typeDistribution] = useState([]);
  const [trendData] = useState([]);
  const [districtData] = useState([]);
  const [arrestData] = useState([]);
  const [locationData] = useState([]);

  function handleChange(e) {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleApply() {
    // Integration point: refetch analytics endpoints with the current `filters`.
  }

  function handleReset() {
    setFilters(initialFilters);
  }

  return (
    <div>
      <PageHeader title="Crime Analytics" description="Analytical insights derived from historical crime data." />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Filters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-600">Year</span>
            <select
              name="year"
              value={filters.year}
              onChange={handleChange}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-600">Crime Type</span>
            <select
              name="crimeType"
              value={filters.crimeType}
              onChange={handleChange}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-600">District</span>
            <select
              name="district"
              value={filters.district}
              onChange={handleChange}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All</option>
            </select>
          </label>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Crime Type Distribution" description="Share of records by crime category.">
          {typeDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={typeDistribution} dataKey="count" nameKey="type" innerRadius={60} outerRadius={90} paddingAngle={2}>
                  {typeDistribution.map((entry, index) => (
                    <Cell key={entry.type ?? index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState icon={PieChartIcon} title="Analytics will appear when crime data is available." />
          )}
        </ChartCard>

        <ChartCard title="Crime Trends Over Time" description="Recorded crimes across the selected period.">
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState icon={TrendUpIcon} title="Analytics will appear when crime data is available." />
          )}
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="District-wise Crime Analysis" description="Crime counts across districts.">
          {districtData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="district" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState icon={BuildingIcon} title="Analytics will appear when crime data is available." />
          )}
        </ChartCard>

        <ChartCard title="Arrest Analysis" description="Comparison of arrest vs. no-arrest records.">
          {arrestData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={arrestData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis type="category" dataKey="label" tick={{ fontSize: 12 }} stroke="#94a3b8" width={90} />
                <Tooltip />
                <Bar dataKey="count" fill="#22c55e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState icon={CheckCircleIcon} title="Analytics will appear when crime data is available." />
          )}
        </ChartCard>
      </div>

      <ChartCard title="Crime Location Analysis" description="Most frequently recorded locations." height="h-80">
        {locationData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={locationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis type="category" dataKey="location" tick={{ fontSize: 12 }} stroke="#94a3b8" width={140} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState icon={LocationIcon} title="Analytics will appear when crime data is available." />
        )}
      </ChartCard>
    </div>
  );
}

export default CrimeAnalytics;