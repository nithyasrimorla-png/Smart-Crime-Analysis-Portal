import PageHeader from '../components/PageHeader';
import {
  TargetIcon,
  CodeIcon,
  ArrowDownIcon,
  GlobeIcon,
  AlertTriangleIcon,
  LightbulbIcon,
  DatabaseIcon,
} from '../components/Icons';

const objectives = [
  'Analyze historical crime records.',
  'Identify crime trends and patterns.',
  'Analyze crime distribution across districts.',
  'Visualize crime information geographically.',
  'Provide filtering and search capabilities.',
  'Present analytical insights through interactive visualizations.',
  'Support data-driven understanding of historical crime patterns.',
];

const workflowSteps = [
  'Chicago Crime Dataset',
  'Python / Pandas',
  'PostgreSQL (Supabase)',
  'Node.js / Express',
  'React Frontend',
  'Charts + Map',
  'Crime Insights',
];

const techStack = [
  { category: 'Frontend', items: ['React', 'JavaScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'REST API'] },
  { category: 'Database', items: ['PostgreSQL', 'Supabase'] },
  { category: 'Data Processing', items: ['Python', 'Pandas'] },
  { category: 'Visualization', items: ['Recharts', 'Leaflet', 'OpenStreetMap'] },
  { category: 'Future ML', items: ['Scikit-learn'] },
];

const limitations = [
  'The system analyzes historical crime data only.',
  'Data quality depends entirely on the source dataset.',
  'Missing values and incomplete location information may exist.',
  'The system does not guarantee future crime prediction.',
  'ML risk analysis, if implemented later, will be based on historical patterns — not a guarantee of future events.',
];

const futureEnhancements = [
  'Connect the Chicago Crime dataset through a Python/Pandas processing pipeline.',
  'Populate PostgreSQL (via Supabase) and expose data through the REST API.',
  'Add authentication and role-based access for authorized users.',
  'Introduce a risk-analysis module based on historical patterns using Scikit-learn.',
  'Add exportable analytical reports (PDF/CSV).',
];

function About() {
  return (
    <div>
      <PageHeader
        title="About This Project"
        description="Smart Crime Analysis Portal — an academic data analytics and visualization system."
      />

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-2">Project Overview</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The Smart Crime Analysis Portal is a historical crime data analysis and visualization system.
          It processes publicly available crime records, stores them in a relational database, and
          presents analytical insights through interactive dashboards, charts, and geographic maps.
          The system is designed for academic demonstration and does not claim to prevent crime or
          guarantee accurate prediction of future events.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TargetIcon className="h-5 w-5 text-blue-600" />
          <h2 className="text-base font-semibold text-slate-800">Project Objectives</h2>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {objectives.map((obj) => (
            <li key={obj} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
              {obj}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-slate-800 mb-5">System Workflow</h2>
        <div className="flex flex-col items-center gap-2">
          {workflowSteps.map((step, idx) => (
            <div key={step} className="flex flex-col items-center gap-2 w-full sm:w-auto">
              <div className="px-5 py-2.5 rounded-lg bg-blue-50 border border-blue-100 text-sm font-medium text-blue-700 text-center w-full sm:w-72">
                {step}
              </div>
              {idx < workflowSteps.length - 1 && <ArrowDownIcon className="h-4 w-4 text-slate-300" />}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <DatabaseIcon className="h-5 w-5 text-blue-600" />
          <h2 className="text-base font-semibold text-slate-800">Dataset</h2>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-2">
          Primary dataset: <strong>City of Chicago Crime Data</strong>, published by the City of Chicago
          open data portal. Planned fields include crime type, date, location, district, ward, community
          area, arrest status, latitude/longitude, and crime description.
        </p>
        <p className="text-xs text-slate-400">
          Note: dataset ingestion has not started yet. This portal is built so that real data can be
          connected later without redesigning the frontend.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <CodeIcon className="h-5 w-5 text-blue-600" />
          <h2 className="text-base font-semibold text-slate-800">Technology Stack</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((group) => (
            <div key={group.category} className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{group.category}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <GlobeIcon className="h-5 w-5 text-blue-600" />
          <h2 className="text-base font-semibold text-slate-800">SDG Alignment</h2>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          This project aligns with <strong>SDG 16 — Peace, Justice and Strong Institutions</strong>, by
          supporting transparent, data-driven understanding of historical crime patterns to inform
          public awareness and institutional decision-making.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangleIcon className="h-5 w-5 text-amber-500" />
          <h2 className="text-base font-semibold text-slate-800">Limitations</h2>
        </div>
        <ul className="space-y-2">
          {limitations.map((lim) => (
            <li key={lim} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
              {lim}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <LightbulbIcon className="h-5 w-5 text-blue-600" />
          <h2 className="text-base font-semibold text-slate-800">Future Enhancements</h2>
        </div>
        <ul className="space-y-2">
          {futureEnhancements.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default About;