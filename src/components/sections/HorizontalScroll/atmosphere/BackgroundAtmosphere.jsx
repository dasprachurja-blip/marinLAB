export default function BackgroundAtmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Soft Ambient Depth (replaces the grid) */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(139, 163, 198, 0.1), transparent 70%)'
        }}
      />

      {/* Subtle Noise Texture */}
      <div className="hz-noise opacity-[0.03]" />
      
      {/* Soft Ambient Shadow at bottom to ground the section */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh]" 
        style={{
          background: 'linear-gradient(to top, rgba(7, 8, 10, 0.8), transparent)'
        }}
      />
    </div>
  )
}
