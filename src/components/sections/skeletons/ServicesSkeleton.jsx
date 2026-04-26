export function ServicesSkeleton() {
  return (
    <section className="py-32 section-container">
      <div className="h-4 w-28 bg-white/5 rounded animate-pulse mb-4" />
      <div className="h-10 w-96 max-w-full bg-white/5 rounded animate-pulse mb-16" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card h-48 animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="glass-card h-48 animate-pulse" />
        ))}
      </div>
    </section>
  )
}
