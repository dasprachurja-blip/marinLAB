export function PortfolioSkeleton() {
  return (
    <section className="py-32 section-container">
      <div className="h-4 w-24 bg-white/5 rounded animate-pulse mb-4" />
      <div className="h-10 w-80 bg-white/5 rounded animate-pulse mb-16" />
      <div className="flex gap-8 overflow-hidden">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="glass-card min-w-[300px] md:min-w-[600px] aspect-video animate-pulse shrink-0" />
        ))}
      </div>
    </section>
  )
}

export function GenericSkeleton() {
  return (
    <section className="py-32 section-container">
      <div className="space-y-4 max-w-xl mx-auto text-center">
        <div className="h-4 w-24 bg-white/5 rounded animate-pulse mx-auto" />
        <div className="h-10 w-80 max-w-full bg-white/5 rounded animate-pulse mx-auto" />
        <div className="h-4 w-64 bg-white/5 rounded animate-pulse mx-auto" />
      </div>
    </section>
  )
}
