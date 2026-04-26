export default function PageWrapper({ children }) {
  return (
    <div className="relative min-h-screen bg-navy overflow-x-hidden">
      {/* Grid mesh background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {children}
    </div>
  )
}
