function ChartCard({ title, description, children, action, height = 'h-72' }) {
  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-charcoal">{title}</h3>
          {description && <p className="text-xs text-muted mt-0.5">{description}</p>}
        </div>
        {action}
      </div>
      <div className={`${height} w-full`}>{children}</div>
    </div>
  );
}

export default ChartCard;