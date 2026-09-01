import { useEffect, useState } from "react";

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
} from "recharts";

import PageHeader from "../components/PageHeader";
import ChartCard from "../components/ChartCard";
import EmptyState from "../components/EmptyState";

import {
  PieChartIcon,
  TrendUpIcon,
  BuildingIcon,
  CheckCircleIcon,
  LocationIcon,
} from "../components/Icons";

import { getCrimeAnalytics } from "../services/api";


const initialFilters = {
  year: "",
  crimeType: "",
  district: "",
};


const COLORS = [
  "#6B8F71",
  "#3A7D7C",
  "#D6B98C",
  "#8FAF94",
  "#5F8D68",
];


function CrimeAnalytics() {
  // ====================================================
  // FILTER STATE
  // ====================================================

  const [filters, setFilters] =
    useState(initialFilters);

  const [appliedFilters, setAppliedFilters] =
    useState(initialFilters);


  // ====================================================
  // DATA STATE
  // ====================================================

  const [typeDistribution, setTypeDistribution] =
    useState([]);

  const [trendData, setTrendData] =
    useState([]);

  const [districtData, setDistrictData] =
    useState([]);

  const [arrestData, setArrestData] =
    useState([]);

  const [locationData, setLocationData] =
    useState([]);


  // ====================================================
  // UI STATE
  // ====================================================

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ====================================================
  // LOAD ANALYTICS
  // ====================================================

  async function loadAnalytics(
    currentFilters = appliedFilters
  ) {
    try {
      setLoading(true);
      setError("");

      const response =
        await getCrimeAnalytics(
          currentFilters
        );

      console.log(
        "Crime Analytics API:",
        response
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Unable to load crime analytics."
        );
      }

      setTypeDistribution(
        Array.isArray(
          response.typeDistribution
        )
          ? response.typeDistribution
          : []
      );

      setTrendData(
        Array.isArray(response.trendData)
          ? response.trendData
          : []
      );

      setDistrictData(
        Array.isArray(response.districtData)
          ? response.districtData
          : []
      );

      setArrestData(
        Array.isArray(response.arrestData)
          ? response.arrestData
          : []
      );

      setLocationData(
        Array.isArray(response.locationData)
          ? response.locationData
          : []
      );
    } catch (err) {
      console.error(
        "Crime Analytics Error:",
        err
      );

      setError(
        err.message ||
          "Unable to connect to the backend."
      );

      setTypeDistribution([]);
      setTrendData([]);
      setDistrictData([]);
      setArrestData([]);
      setLocationData([]);
    } finally {
      setLoading(false);
    }
  }


  // ====================================================
  // INITIAL LOAD
  // ====================================================

  useEffect(() => {
    loadAnalytics(initialFilters);
  }, []);


  // ====================================================
  // FILTER CHANGE
  // ====================================================

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  }


  // ====================================================
  // APPLY FILTERS
  // ====================================================

  function handleApply() {
    setAppliedFilters(filters);

    loadAnalytics(filters);
  }


  // ====================================================
  // RESET FILTERS
  // ====================================================

  function handleReset() {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);

    loadAnalytics(initialFilters);
  }


  // ====================================================
  // YEAR OPTIONS
  // ====================================================

  const years = [];

  for (let year = 2026; year >= 2001; year--) {
    years.push(year);
  }


  // ====================================================
  // CRIME TYPE OPTIONS
  // ====================================================

  const crimeTypes = [
    "THEFT",
    "BATTERY",
    "CRIMINAL DAMAGE",
    "ASSAULT",
    "MOTOR VEHICLE THEFT",
    "BURGLARY",
    "ROBBERY",
    "NARCOTICS",
    "HOMICIDE",
    "CRIMINAL TRESPASS",
    "DECEPTIVE PRACTICE",
    "OTHER OFFENSE",
    "WEAPONS VIOLATION",
    "PUBLIC PEACE VIOLATION",
    "CRIMINAL SEXUAL ASSAULT",
    "SEX OFFENSE",
  ];


  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div>

      <PageHeader
        title="Crime Analytics"
        description="Analytical insights derived from historical crime data."
      />


      {/* ==================================================
          FILTERS
      ================================================== */}

      <div className="bg-white rounded-xl border border-[#DCE3DA] shadow-sm p-5 mb-6">

        <h3 className="text-sm font-semibold text-[#29332D] mb-4">
          Filters
        </h3>


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* YEAR */}

          <label className="flex flex-col gap-1 text-sm">

            <span className="font-medium text-[#6B756F]">
              Year
            </span>

            <select
              name="year"
              value={filters.year}
              onChange={handleChange}
              className="rounded-lg border border-[#DCE3DA] px-3 py-2 text-sm text-[#29332D] focus:outline-none focus:ring-2 focus:ring-[#3A7D7C] focus:border-[#3A7D7C]"
            >

              <option value="">
                All
              </option>

              {years.map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}

            </select>

          </label>


          {/* CRIME TYPE */}

          <label className="flex flex-col gap-1 text-sm">

            <span className="font-medium text-[#6B756F]">
              Crime Type
            </span>

            <select
              name="crimeType"
              value={filters.crimeType}
              onChange={handleChange}
              className="rounded-lg border border-[#DCE3DA] px-3 py-2 text-sm text-[#29332D] focus:outline-none focus:ring-2 focus:ring-[#3A7D7C] focus:border-[#3A7D7C]"
            >

              <option value="">
                All
              </option>

              {crimeTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}

            </select>

          </label>


          {/* DISTRICT */}

          <label className="flex flex-col gap-1 text-sm">

            <span className="font-medium text-[#6B756F]">
              District
            </span>

            <select
              name="district"
              value={filters.district}
              onChange={handleChange}
              className="rounded-lg border border-[#DCE3DA] px-3 py-2 text-sm text-[#29332D] focus:outline-none focus:ring-2 focus:ring-[#3A7D7C] focus:border-[#3A7D7C]"
            >

              <option value="">
                All
              </option>

              {Array.from(
                { length: 25 },
                (_, index) => index + 1
              ).map((district) => (
                <option
                  key={district}
                  value={district}
                >
                  District {district}
                </option>
              ))}

            </select>

          </label>

        </div>


        {/* BUTTONS */}

        <div className="flex items-center gap-3 mt-5">

          <button
            type="button"
            onClick={handleApply}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-[#3A7D7C] text-white hover:bg-[#2F6867] transition-colors disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : "Apply"}
          </button>


          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-[#DCE3DA] text-[#6B756F] hover:bg-[#E8F0E9] transition-colors disabled:opacity-50"
          >
            Reset
          </button>

        </div>

      </div>


      {/* ==================================================
          ERROR
      ================================================== */}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}


      {/* ==================================================
          LOADING
      ================================================== */}

      {loading ? (

        <div className="bg-white rounded-xl border border-[#DCE3DA] p-10 text-center text-[#6B756F]">
          Loading crime analytics...
        </div>

      ) : (

        <>


          {/* ==================================================
              CRIME TYPE + TRENDS
          ================================================== */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">


            {/* CRIME TYPE DISTRIBUTION */}

            <ChartCard
              title="Crime Type Distribution"
              description="Share of records by crime category."
            >

              {typeDistribution.length > 0 ? (

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={typeDistribution}
                      dataKey="count"
                      nameKey="type"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                    >

                      {typeDistribution.map(
                        (entry, index) => (
                          <Cell
                            key={
                              entry.type ??
                              index
                            }
                            fill={
                              COLORS[
                                index %
                                  COLORS.length
                              ]
                            }
                          />
                        )
                      )}

                    </Pie>

                    <Tooltip />

                    <Legend />

                  </PieChart>

                </ResponsiveContainer>

              ) : (

                <EmptyState
                  icon={PieChartIcon}
                  title="No crime type data available."
                />

              )}

            </ChartCard>


            {/* CRIME TRENDS */}

            <ChartCard
              title="Crime Trends Over Time"
              description={
                filters.year
                  ? "Monthly crime records for the selected year."
                  : "Year-wise crime records across the historical dataset."
              }
            >

              {trendData.length > 0 ? (

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={trendData}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#DCE3DA"
                    />

                    <XAxis
                      dataKey="period"
                      tick={{
                        fontSize: 12,
                      }}
                      stroke="#6B756F"
                    />

                    <YAxis
                      tick={{
                        fontSize: 12,
                      }}
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
                  title="No trend data available."
                />

              )}

            </ChartCard>

          </div>


          {/* ==================================================
              DISTRICT + ARREST
          ================================================== */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">


            {/* DISTRICT ANALYSIS */}

            <ChartCard
              title="District-wise Crime Analysis"
              description="Crime counts across police districts."
            >

              {districtData.length > 0 ? (

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={districtData}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#DCE3DA"
                    />

                    <XAxis
                      dataKey="district"
                      tick={{
                        fontSize: 12,
                      }}
                      stroke="#6B756F"
                    />

                    <YAxis
                      tick={{
                        fontSize: 12,
                      }}
                      stroke="#6B756F"
                    />

                    <Tooltip />

                    <Bar
                      dataKey="count"
                      fill="#6B8F71"
                      radius={[
                        4,
                        4,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              ) : (

                <EmptyState
                  icon={BuildingIcon}
                  title="No district data available."
                />

              )}

            </ChartCard>


            {/* ARREST ANALYSIS */}

            <ChartCard
              title="Arrest Analysis"
              description="Comparison of arrest vs. no-arrest records."
            >

              {arrestData.length > 0 ? (

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={arrestData}
                    layout="vertical"
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#DCE3DA"
                    />

                    <XAxis
                      type="number"
                      tick={{
                        fontSize: 12,
                      }}
                      stroke="#6B756F"
                    />

                    <YAxis
                      type="category"
                      dataKey="label"
                      tick={{
                        fontSize: 12,
                      }}
                      stroke="#6B756F"
                      width={90}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="count"
                      fill="#5F8D68"
                      radius={[
                        0,
                        4,
                        4,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              ) : (

                <EmptyState
                  icon={CheckCircleIcon}
                  title="No arrest data available."
                />

              )}

            </ChartCard>

          </div>


          {/* ==================================================
              LOCATION ANALYSIS
          ================================================== */}

          <ChartCard
            title="Crime Location Analysis"
            description="Top 10 locations where crimes were recorded."
            height="h-80"
          >

            {locationData.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={locationData}
                  layout="vertical"
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#DCE3DA"
                  />

                  <XAxis
                    type="number"
                    tick={{
                      fontSize: 12,
                    }}
                    stroke="#6B756F"
                  />

                  <YAxis
                    type="category"
                    dataKey="location"
                    tick={{
                      fontSize: 11,
                    }}
                    stroke="#6B756F"
                    width={160}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="count"
                    fill="#3A7D7C"
                    radius={[
                      0,
                      4,
                      4,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            ) : (

              <EmptyState
                icon={LocationIcon}
                title="No location data available."
              />

            )}

          </ChartCard>

        </>

      )}

    </div>
  );
}


export default CrimeAnalytics;