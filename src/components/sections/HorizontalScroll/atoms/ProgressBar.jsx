export default function ProgressBar({ progress = 0 }) {
  return (
    <div
      className="hz-progress"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}
