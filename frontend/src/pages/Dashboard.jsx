import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import EmptyState from "../components/EmptyState";
import CrimeTable from "../components/CrimeTable";

import {
  DatabaseIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  BuildingIcon,
  TrendUpIcon,
  PieChartIcon,
} from "../components/Icons";

import {
  getCrimes,
  getCrimeStats,
  getCrimeTrends,
  getCrimeTypes,
  getDistricts,
} from "../services/api";

const CHART_COLORS = [
  "#2563eb",
  "#0ea5e9",
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [trends, setTrends] = useState([]);
  const [typeDistribution, setTypeDistribution] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [arrestData, setArrestData] = useState([]);
  const [recentRecords, setRecentRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      setLoading(true);

      try {
        const [
          statsRes,
          trendsRes,
          typesRes,
          districtsRes,
          recordsRes,
        ] = await Promise.allSettled([
          getCrimeStats(),
          getCrimeTrends(),
          getCrimeTypes(),
          getDistricts(),
          getCrimes({ limit: 5 }),
        ]);

        if (!isMounted) return;

        
        if (statsRes.status === "fulfilled") {
          setStats(statsRes.value);
        }

        if (trendsRes.status === "fulfilled") {
          const data = trendsRes.value;

          setTrends(
            Array.isArray(data)
              ? data
              : data?.trends ?? []
          );
        }

       
        if (typesRes.status === "fulfilled") {
          const data = typesRes.value;

          const types = Array.isArray(data)
            ? data
            : data?.crimeTypes ?? [];

          setTypeDistribution(
            types.map((item) => ({
              type: item.primary_type,
              count: Number(item.count),
            }))
          );
        }

        
        if (districtsRes.status === "fulfilled") {
          const data = districtsRes.value;

          const districts = Array.isArray(data)
            ? data
            : data?.districts ?? [];

          setDistrictData(
            districts.map((item) => ({
              district: String(item.district),
              count: Number(item.count),
            }))
          );
        }

        
        if (statsRes.status === "fulfilled") {
          const arrests = statsRes.value?.arrests ?? [];

          setArrestData(
            arrests.map((item) => ({
              label: item.arrest ? "Arrested" : "Not Arrested",
              count: Number(item.count),
            }))
          );
        }

        
        if (recordsRes.status === "fulfilled") {
          const data = recordsRes.value;

          setRecentRecords(
            data?.records ??
              (Array.isArray(data) ? data : [])
          );
        }
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of historical crime records and analytical insights."
      />

      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <StatCard
          icon={DatabaseIcon}
          title="Total Crime Records"
          value={
            stats?.totalRecords != null
              ? Number(stats.totalRecords).toLocaleString()
              : "—"
          }
          description="All recorded crime entries in the database."
          loading={loading}
        />

        <StatCard
          icon={AlertTriangleIcon}
          title="Most Common Crime"
          value={stats?.mostCommonCrime ?? "—"}
          description="Highest-frequency crime category."
          loading={loading}
        />

        <StatCard
          icon={CheckCircleIcon}
          title="Total Arrests"
          value={
            stats?.totalArrests != null
              ? Number(stats.totalArrests).toLocaleString()
              : "—"
          }
          description="Cases marked with an arrest."
          loading={loading}
        />

        <StatCard
          icon={BuildingIcon}
          title="Number of Districts"
          value={stats?.totalDistricts ?? "—"}
          description="Distinct districts covered in the data."
          loading={loading}
        />

      </div>

      

      <div className="mb-6">

        <ChartCard
          title="Crime Trend"
          description="Recorded crimes over time."
          height="h-80"
        >

          {trends.length > 0 ? (

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={trends}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="period"
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />

              </LineChart>

            </ResponsiveContainer>

          ) : (

            <EmptyState
              icon={TrendUpIcon}
              title="No crime trend data available"
              description="Trend analysis will appear once historical data is connected."
            />

          )}

        </ChartCard>

      </div>

     
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
                      fill={
                        CHART_COLORS[
                          index % CHART_COLORS.length
                        ]
                      }
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
              title="No crime type data available"
              description="Distribution will appear once crime categories are loaded."
            />

          )}

        </ChartCard>

       

        <ChartCard
          title="District Analysis"
          description="Crime counts by district."
        >

          {districtData.length > 0 ? (

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={districtData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="district"
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          ) : (

            <EmptyState
              icon={BuildingIcon}
              title="No district data available"
              description="District-wise analysis will appear once data is connected."
            />

          )}

        </ChartCard>

      </div>

      

      <div className="mb-6">

        <ChartCard
          title="Arrest Analysis"
          description="Comparison of arrest vs. no-arrest records."
          height="h-72"
        >

          {arrestData.length > 0 ? (

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={arrestData}
                layout="vertical"
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />

                <XAxis
                  type="number"
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                />

                <YAxis
                  type="category"
                  dataKey="label"
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                  width={100}
                />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#22c55e"
                  radius={[0, 4, 4, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          ) : (

            <EmptyState
              icon={CheckCircleIcon}
              title="No arrest data available"
              description="Arrest analysis will appear once data is connected."
            />

          )}

        </ChartCard>

      </div>

      

      <div>

        <h2 className="text-sm font-semibold text-slate-800 mb-3">
          Recent Crime Records
        </h2>

        <CrimeTable
          records={recentRecords}
          loading={loading}
        />

      </div>

    </div>
  );
}

export default Dashboard;