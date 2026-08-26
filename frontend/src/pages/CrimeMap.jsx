import { useState, useMemo } from 'react';
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
const initialFilters = { crimeType: '', district: '', date: '' };

// Guards against missing/invalid latitude & longitude so a single bad
// record from the dataset can never break the map render.
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
  const [mapRecords] = useState([]); // will be populated from GET /api/crimes/map

  const validMarkers = useMemo(
    () => mapRecords.filter((r) => isValidCoordinate(r.latitude, r.longitude)),
    [mapRecords]
  );

  function handleChange(e) {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleReset() {
    setFilters(initialFilters);
  }

  return (
    <div>
      <PageHeader title="Crime Map" description="Geographic distribution of historical crime records." />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Map Filters</h3>
            <div className="flex flex-col gap-4">
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
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-medium text-slate-600">Date</span>
                <input
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>
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

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 h-[520px] relative overflow-hidden">
            <MapContainer center={CHICAGO_CENTER} zoom={11} scrollWheelZoom className="h-full w-full rounded-lg">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {validMarkers.map((record) => (
                <Marker key={record.id} position={[record.latitude, record.longitude]}>
                  <Popup>
                    <div className="text-sm space-y-1">
                      <p><strong>Crime Type:</strong> {record.crimeType ?? '—'}</p>
                      <p><strong>Date:</strong> {record.date ?? '—'}</p>
                      <p><strong>District:</strong> {record.district ?? '—'}</p>
                      <p><strong>Location:</strong> {record.location ?? '—'}</p>
                      <p><strong>Arrest:</strong> {record.arrest ? 'Yes' : 'No'}</p>
                      <p><strong>Description:</strong> {record.description ?? '—'}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {validMarkers.length === 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 border border-slate-200 rounded-lg shadow-sm px-4 py-2 flex items-center gap-2 z-[400]">
                <MapIcon className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-medium text-slate-500">No crime location data available.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrimeMap;