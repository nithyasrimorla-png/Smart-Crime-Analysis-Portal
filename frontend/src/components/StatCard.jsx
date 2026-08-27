function StatCard({ icon: Icon, title, value, description, loading = false }) {
  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-charcoal truncate">
            {loading ? '…' : value ?? '—'}
          </p>
        </div>
        <div className="h-10 w-10 shrink-0 rounded-lg bg-pale flex items-center justify-center text-teal">
          {Icon && <Icon className="h-5 w-5" />}
        </div>
      </div>
      {description && <p className="text-xs text-muted">{description}</p>}
    </div>
  );
}

export default StatCard;