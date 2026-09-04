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
  'Add authentication and role-based access for authorized users.',
  'Introduce a risk-analysis module based on historical patterns using Scikit-learn.',
  'Add exportable analytical reports (PDF/CSV).',
  'Enhance map visualization with advanced geographic analysis.',
];

function About() {
  return (
    <div>
      <PageHeader
        title="About This Project"
        description="Smart Crime Analysis Portal — an academic data analytics and visualization system."
      />

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-[#29332D] mb-2">
          Project Overview
        </h2>

        <p className="text-sm text-[#6B756F] leading-relaxed">
          The Smart Crime Analysis Portal is a historical crime data analysis
          and visualization system. It processes publicly available crime
          records, stores them in a relational database, and presents
          analytical insights through interactive dashboards, charts, and
          geographic maps. The system is designed for academic demonstration
          and does not claim to prevent crime or guarantee accurate prediction
          of future events.
        </p>
      </section>
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TargetIcon className="h-5 w-5 text-[#6B8F71]" />

          <h2 className="text-base font-semibold text-[#29332D]">
            Project Objectives
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {objectives.map((obj) => (
            <li
              key={obj}
              className="flex items-start gap-2 text-sm text-[#6B756F]"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#6B8F71] shrink-0" />
              {obj}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-[#29332D] mb-5">
          System Workflow
        </h2>

        <div className="flex flex-col items-center gap-2">
          {workflowSteps.map((step, idx) => (
            <div
              key={step}
              className="flex flex-col items-center gap-2 w-full sm:w-auto"
            >
              <div className="px-5 py-2.5 rounded-lg bg-[#E8F0E9] border border-[#8FAF94] text-sm font-medium text-[#3A7D7C] text-center w-full sm:w-72">
                {step}
              </div>

              {idx < workflowSteps.length - 1 && (
                <ArrowDownIcon className="h-4 w-4 text-[#8FAF94]" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <DatabaseIcon className="h-5 w-5 text-[#3A7D7C]" />

          <h2 className="text-base font-semibold text-[#29332D]">
            Dataset
          </h2>
        </div>

        <p className="text-sm text-[#6B756F] leading-relaxed mb-2">
          Primary dataset: <strong>City of Chicago Crime Data</strong>,
          published by the City of Chicago open data portal. The dataset
          contains information such as crime type, date, location, district,
          ward, community area, arrest status, latitude/longitude, and crime
          description.
        </p>

        <p className="text-xs text-[#6B756F]">
          The dataset has been processed using Python/Pandas and stored in
          PostgreSQL through Supabase. The processed data is currently used by
          the portal for dashboard statistics, crime records, analytics, and
          geographic map visualization.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <CodeIcon className="h-5 w-5 text-[#3A7D7C]" />

          <h2 className="text-base font-semibold text-[#29332D]">
            Technology Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((group) => (
            <div
              key={group.category}
              className="rounded-lg border border-[#DCE3DA] p-4"
            >
              <p className="text-xs font-semibold text-[#6B756F] uppercase tracking-wide mb-2">
                {group.category}
              </p>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-md bg-[#E8F0E9] text-[#3A7D7C] text-xs font-medium"
                  >
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
          <GlobeIcon className="h-5 w-5 text-[#6B8F71]" />

          <h2 className="text-base font-semibold text-[#29332D]">
            SDG Alignment
          </h2>
        </div>

        <p className="text-sm text-[#6B756F] leading-relaxed">
          This project aligns with{' '}
          <strong>SDG 16 — Peace, Justice and Strong Institutions</strong>, by
          supporting transparent, data-driven understanding of historical crime
          patterns to inform public awareness and institutional
          decision-making.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangleIcon className="h-5 w-5 text-[#C99A4A]" />

          <h2 className="text-base font-semibold text-[#29332D]">
            Limitations
          </h2>
        </div>

        <ul className="space-y-2">
          {limitations.map((lim) => (
            <li
              key={lim}
              className="flex items-start gap-2 text-sm text-[#6B756F]"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#C99A4A] shrink-0" />
              {lim}
            </li>
          ))}
        </ul>
      </section>

    
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <LightbulbIcon className="h-5 w-5 text-[#3A7D7C]" />

          <h2 className="text-base font-semibold text-[#29332D]">
            Future Enhancements
          </h2>
        </div>

        <ul className="space-y-2">
          {futureEnhancements.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-[#6B756F]"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#6B8F71] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default About;