export function PricingSkeleton() {
  return (
    <section className="py-32 section-container">
      <div className="h-4 w-20 bg-white/5 rounded animate-pulse mb-4 mx-auto" />
      <div className="h-10 w-72 bg-white/5 rounded animate-pulse mb-16 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`glass-card animate-pulse ${i === 1 ? 'h-[480px]' : 'h-[440px]'}`} />
        ))}
      </div>
    </section>
  )
}
