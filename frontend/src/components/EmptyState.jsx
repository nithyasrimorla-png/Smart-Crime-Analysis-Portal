function EmptyState({ icon: Icon, title = 'No data available', description = '', className = '' }) {
  return (
    <div className={`h-full w-full flex flex-col items-center justify-center text-center gap-2 py-8 px-4 ${className}`}>
      {Icon && <Icon className="h-9 w-9 text-line" />}
      <p className="text-sm font-medium text-muted">{title}</p>
      {description && <p className="text-xs text-muted/80 max-w-xs">{description}</p>}
    </div>
  );
}

export default EmptyState;