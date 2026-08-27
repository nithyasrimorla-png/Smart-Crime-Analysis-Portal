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
import {
  PieChartIcon,
  TrendUpIcon,
  BuildingIcon,
  CheckCircleIcon,
  LocationIcon,
} from '../components/Icons';

const initialFilters = { year: '', crimeType: '', district: '' };

const COLORS = [
  '#6B8F71', 
  '#3A7D7C', 
  '#D6B98C', 
  '#8FAF94', 
  '#5F8D68', 
];

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
    
  }
  function handleReset() {
    setFilters(initialFilters);
  }

  return (
    <div>
      <PageHeader
        title="Crime Analytics"
        description="Analytical insights derived from historical crime data."
      />

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#DCE3DA] shadow-sm p-5 mb-6">
        <h3 className="text-sm font-semibold text-[#29332D] mb-4">Filters</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-[#6B756F]">Year</span>
            <select
              name="year"
              value={filters.year}
              onChange={handleChange}
              className="rounded-lg border border-[#DCE3DA] px-3 py-2 text-sm text-[#29332D] focus:outline-none focus:ring-2 focus:ring-[#3A7D7C] focus:border-[#3A7D7C]"
            >
              <option value="">All</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-[#6B756F]">Crime Type</span>
            <select
              name="crimeType"
              value={filters.crimeType}
              onChange={handleChange}
              className="rounded-lg border border-[#DCE3DA] px-3 py-2 text-sm text-[#29332D] focus:outline-none focus:ring-2 focus:ring-[#3A7D7C] focus:border-[#3A7D7C]"
            >
              <option value="">All</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-[#6B756F]">District</span>
            <select
              name="district"
              value={filters.district}
              onChange={handleChange}
              className="rounded-lg border border-[#DCE3DA] px-3 py-2 text-sm text-[#29332D] focus:outline-none focus:ring-2 focus:ring-[#3A7D7C] focus:border-[#3A7D7C]"
            >
              <option value="">All</option>
            </select>
          </label>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-[#3A7D7C] text-white hover:bg-[#2F6867] transition-colors"
          >
            Apply
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-[#DCE3DA] text-[#6B756F] hover:bg-[#E8F0E9] transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Crime Type Distribution + Crime Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard
          title="Crime Type Distribution"
          description="Share of records by crime category."
        >
          {typeDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeDistribution}
                  dataKey="count"
                  nameKey="type"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {typeDistribution.map((entry, index) => (
                    <Cell
                      key={entry.type ?? index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState
              icon={PieChartIcon}
              title="Analytics will appear when crime data is available."
            />
          )}
        </ChartCard>

        <ChartCard
          title="Crime Trends Over Time"
          description="Recorded crimes across the selected period."
        >
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DCE3DA" />
                <XAxis
                  dataKey="period"
                  tick={{ fontSize: 12 }}
                  stroke="#6B756F"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#6B756F"
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3A7D7C"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState
              icon={TrendUpIcon}
              title="Analytics will appear when crime data is available."
            />
          )}
        </ChartCard>
      </div>

      {/* District Analysis + Arrest Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard
          title="District-wise Crime Analysis"
          description="Crime counts across districts."
        >
          {districtData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DCE3DA" />
                <XAxis
                  dataKey="district"
                  tick={{ fontSize: 12 }}
                  stroke="#6B756F"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#6B756F"
                />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#6B8F71"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState
              icon={BuildingIcon}
              title="Analytics will appear when crime data is available."
            />
          )}
        </ChartCard>

        <ChartCard
          title="Arrest Analysis"
          description="Comparison of arrest vs. no-arrest records."
        >
          {arrestData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={arrestData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#DCE3DA" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12 }}
                  stroke="#6B756F"
                />
                <YAxis
                  type="category"
                  dataKey="label"
                  tick={{ fontSize: 12 }}
                  stroke="#6B756F"
                  width={90}
                />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#5F8D68"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState
              icon={CheckCircleIcon}
              title="Analytics will appear when crime data is available."
            />
          )}
        </ChartCard>
      </div>

      {/* Crime Location Analysis */}
      <ChartCard
        title="Crime Location Analysis"
        description="Most frequently recorded locations."
        height="h-80"
      >
        {locationData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={locationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#DCE3DA" />
              <XAxis
                type="number"
                tick={{ fontSize: 12 }}
                stroke="#6B756F"
              />
              <YAxis
                type="category"
                dataKey="location"
                tick={{ fontSize: 12 }}
                stroke="#6B756F"
                width={140}
              />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#3A7D7C"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState
            icon={LocationIcon}
            title="Analytics will appear when crime data is available."
          />
        )}
      </ChartCard>
    </div>
  );
}

export default CrimeAnalytics;
