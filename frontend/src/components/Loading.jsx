function Loading({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted">
      <div className="h-8 w-8 rounded-full border-2 border-line border-t-teal animate-spin" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export default Loading;