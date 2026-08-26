function EmptyState({ icon: Icon, title = 'No data available', description = '', className = '' }) {
  return (
    <div className={`h-full w-full flex flex-col items-center justify-center text-center gap-2 py-8 px-4 ${className}`}>
      {Icon && <Icon className="h-9 w-9 text-slate-300" />}
      <p className="text-sm font-medium text-slate-500">{title}</p>
      {description && <p className="text-xs text-slate-400 max-w-xs">{description}</p>}
    </div>
  );
}

export default EmptyState;