import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import PageHeader from '../components/PageHeader';
import { MapIcon } from '../components/Icons';

// Fix Leaflet's default marker icon paths breaking under Vite's bundler.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const CHICAGO_CENTER = [41.8781, -87.6298];
const initialFilters = {
  crimeType: '',
  district: '',
  date: '',
};

// Guards against missing/invalid latitude & longitude
function isValidCoordinate(lat, lng) {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    !Number.isNaN(lat) &&
    !Number.isNaN(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

function CrimeMap() {
  const [filters, setFilters] = useState(initialFilters);
  const [mapRecords, setMapRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ======================================================
  // FETCH CRIME RECORDS FOR MAP
  // ======================================================
  useEffect(() => {
    const fetchMapRecords = async () => {
      try {
        setLoading(true);
        setError('');

        const params = new URLSearchParams();

        params.append('page', '1');
        params.append('limit', '500');

        if (filters.crimeType) {
          params.append('crimeType', filters.crimeType);
        }

        if (filters.district) {
          params.append('district', filters.district);
        }

        const response = await fetch(
          `http://localhost:5000/api/crimes?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch crime map data');
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.message || 'Failed to fetch crime map data'
          );
        }

        // Convert PostgreSQL coordinate values to numbers.
        const records = (data.records || []).map((record) => ({
          ...record,
          latitude:
            record.latitude !== null &&
            record.latitude !== undefined
              ? Number(record.latitude)
              : null,
          longitude:
            record.longitude !== null &&
            record.longitude !== undefined
              ? Number(record.longitude)
              : null,
        }));

        setMapRecords(records);
      } catch (err) {
        console.error('CRIME MAP ERROR:', err);
        setError('Failed to load crime location data.');
        setMapRecords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMapRecords();
  }, [filters.crimeType, filters.district]);

  // ======================================================
  // FILTER VALID MAP RECORDS
  // ======================================================
  const validMarkers = useMemo(() => {
    let records = mapRecords.filter((record) =>
      isValidCoordinate(record.latitude, record.longitude)
    );

    // Date filter is applied on the frontend because
    // the current backend /api/crimes endpoint does not
    // have an exact-date filter yet.
    if (filters.date) {
      records = records.filter((record) => {
        if (!record.date) {
          return false;
        }

        const recordDate = new Date(record.date);

        if (Number.isNaN(recordDate.getTime())) {
          return false;
        }

        const year = recordDate.getFullYear();
        const month = String(
          recordDate.getMonth() + 1
        ).padStart(2, '0');
        const day = String(
          recordDate.getDate()
        ).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate === filters.date;
      });
    }

    return records;
  }, [mapRecords, filters.date]);

  // ======================================================
  // DROPDOWN OPTIONS
  // ======================================================
  const crimeTypes = useMemo(() => {
    return [
      ...new Set(
        mapRecords
          .map((record) => record.primary_type)
          .filter(Boolean)
      ),
    ].sort();
  }, [mapRecords]);

  const districts = useMemo(() => {
    return [
      ...new Set(
        mapRecords
          .map((record) => record.district)
          .filter(
            (district) =>
              district !== null &&
              district !== undefined &&
              district !== ''
          )
      ),
    ].sort((a, b) => Number(a) - Number(b));
  }, [mapRecords]);

  // ======================================================
  // FILTER HANDLERS
  // ======================================================
  function handleChange(e) {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleReset() {
    setFilters(initialFilters);
  }

  return (
    <div>
      <PageHeader
        title="Crime Map"
        description="Geographic distribution of historical crime records."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ==================================================
            MAP FILTERS
        ================================================== */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              Map Filters
            </h3>

            <div className="flex flex-col gap-4">

              {/* Crime Type */}
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-medium text-slate-600">
                  Crime Type
                </span>

                <select
                  name="crimeType"
                  value={filters.crimeType}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All</option>

                  {crimeTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              {/* District */}
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-medium text-slate-600">
                  District
                </span>

                <select
                  name="district"
                  value={filters.district}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All</option>

                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </label>

              {/* Date */}
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-medium text-slate-600">
                  Date
                </span>

                <input
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              {/* Reset */}
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================
            MAP
        ================================================== */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 h-[520px] relative overflow-hidden">

            <MapContainer
              center={CHICAGO_CENTER}
              zoom={11}
              scrollWheelZoom
              className="h-full w-full rounded-lg"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {validMarkers.map((record) => (
                <Marker
                  key={record.id}
                  position={[
                    record.latitude,
                    record.longitude,
                  ]}
                >
                  <Popup>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Crime Type:</strong>{' '}
                        {record.primary_type ?? '—'}
                      </p>

                      <p>
                        <strong>Date:</strong>{' '}
                        {record.date
                          ? new Date(
                              record.date
                            ).toLocaleDateString()
                          : '—'}
                      </p>

                      <p>
                        <strong>District:</strong>{' '}
                        {record.district ?? '—'}
                      </p>

                      <p>
                        <strong>Location:</strong>{' '}
                        {record.location_description ?? '—'}
                      </p>

                      <p>
                        <strong>Arrest:</strong>{' '}
                        {record.arrest ? 'Yes' : 'No'}
                      </p>

                      <p>
                        <strong>Description:</strong>{' '}
                        {record.description ?? '—'}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Loading */}
            {loading && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 border border-slate-200 rounded-lg shadow-sm px-4 py-2 flex items-center gap-2 z-[400]">
                <MapIcon className="h-4 w-4 text-slate-400" />

                <span className="text-xs font-medium text-slate-500">
                  Loading crime locations...
                </span>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 border border-red-200 rounded-lg shadow-sm px-4 py-2 flex items-center gap-2 z-[400]">
                <MapIcon className="h-4 w-4 text-slate-400" />

                <span className="text-xs font-medium text-red-500">
                  {error}
                </span>
              </div>
            )}

            {/* No valid coordinates */}
            {!loading &&
              !error &&
              validMarkers.length === 0 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 border border-slate-200 rounded-lg shadow-sm px-4 py-2 flex items-center gap-2 z-[400]">
                  <MapIcon className="h-4 w-4 text-slate-400" />

                  <span className="text-xs font-medium text-slate-500">
                    No crime location data available.
                  </span>
                </div>
              )}

            {/* Marker count */}
            {!loading &&
              !error &&
              validMarkers.length > 0 && (
                <div className="absolute top-4 right-4 bg-white/95 border border-slate-200 rounded-lg shadow-sm px-3 py-2 z-[400]">
                  <span className="text-xs font-medium text-slate-600">
                    Showing {validMarkers.length} crime locations
                  </span>
                </div>
              )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default CrimeMap;