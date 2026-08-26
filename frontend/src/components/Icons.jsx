// Centralized icon set for Smart Crime Analysis Portal.
// Plain inline SVGs - no external icon library required.
// Every icon accepts a className prop.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function DashboardIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function RecordsIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 9h17M8 4v16" />
    </svg>
  );
}

export function AnalyticsIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20V10M11 20V4M18 20v-7" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function MapIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M9 20l-6-2V6l6-2 6 2 6-2v14l-6 2-6-2-6 2" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

export function InfoIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8v.01" />
    </svg>
  );
}

export function MenuIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CloseIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function XIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function SearchIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.35-4.35" />
    </svg>
  );
}

export function BellIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function UserIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export function ChevronLeftIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRightIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronDownIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronUpIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}

export function DatabaseIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
    </svg>
  );
}

export function AlertTriangleIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4.5 21 19.5H3L12 4.5Z" />
      <path d="M12 10v4M12 16.5v.01" />
    </svg>
  );
}

export function CheckCircleIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.5l2.4 2.4L15.7 9.5" />
    </svg>
  );
}

export function BuildingIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
      <path d="M9 7.5h.01M9 11h.01M9 14.5h.01M15 7.5h.01M15 11h.01M15 14.5h.01" />
      <path d="M10 20.5v-3.5h4v3.5" />
    </svg>
  );
}

export function TrendUpIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 16l5-5 4 4 7-8" />
      <path d="M14 7h6v6" />
    </svg>
  );
}

export function TrendDownIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 8l5 5 4-4 7 8" />
      <path d="M14 17h6v-6" />
    </svg>
  );
}

export function EyeIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export function FilterIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

export function CalendarIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M7 3.5v3M17 3.5v3M3.5 9h17" />
    </svg>
  );
}

export function LocationIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function MapPinIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function RefreshIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8 8 0 0 0 14.5 4.5L20 16" />
      <path d="M20 20v-4h-4" />
    </svg>
  );
}

export function DownloadIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function UploadIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function PlusIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function ArrowDownIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5v14" />
      <path d="m7 14 5 5 5-5" />
    </svg>
  );
}

export function ArrowUpIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 19V5" />
      <path d="m7 10 5-5 5 5" />
    </svg>
  );
}

export function ArrowRightIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  );
}

export function CodeIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="m8 9-3 3 3 3" />
      <path d="m16 9 3 3-3 3" />
      <path d="m14 6-4 12" />
    </svg>
  );
}

export function GlobeIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.2 2.4 3.5 5.4 3.5 9s-1.3 6.6-3.5 9c-2.2-2.4-3.5-5.4-3.5-9S9.8 5.4 12 3Z" />
    </svg>
  );
}

export function PieChartIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3a9 9 0 1 0 9 9h-9V3Z" />
      <path d="M15 3.5A9 9 0 0 1 20.5 9H15V3.5Z" />
    </svg>
  );
}

export function BarChartIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 20V10M12 20V4M19 20v-7" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function LineChartIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 18 9 12l4 3 7-9" />
      <path d="M16 6h4v4" />
    </svg>
  );
}

export function ActivityIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M3 12h4l2.5-7 5 14 2.5-7H21" />
    </svg>
  );
}

export function FileIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3.5h8l4 4V20H6V3.5Z" />
      <path d="M14 3.5V8h4" />
    </svg>
  );
}

export function FileTextIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3.5h8l4 4V20H6V3.5Z" />
      <path d="M14 3.5V8h4M9 12h6M9 15.5h6" />
    </svg>
  );
}

export function SettingsIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.2-1.6l2-1.5-2-3.4-2.3 1a8 8 0 0 0-2.7-1.6L13.5 2h-3l-.3 2.9A8 8 0 0 0 7.5 6.5l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .6.1 1.1.2 1.6l-2 1.5 2 3.4 2.3-1a8 8 0 0 0 2.7 1.6l.3 2.9h3l.3-2.9a8 8 0 0 0 2.7-1.6l2.3 1 2-3.4-2-1.5c.1-.5.2-1 .2-1.6Z" />
    </svg>
  );
}

export function LockIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function ShieldIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 19 6v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function HomeIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="m3 11 9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

export function ClockIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function CheckIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function InfoCircleIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8v.01" />
    </svg>
  );
}
export function LightbulbIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M8.5 14.5A6 6 0 1 1 15.5 14c-.8.7-1.3 1.4-1.5 2.5h-4c-.2-1.1-.7-1.8-1.5-2.5Z" />
    </svg>
  );
}
export function TargetIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}