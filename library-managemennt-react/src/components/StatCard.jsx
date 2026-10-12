// one box on the dashboard (icon, label and number)
function StatCard({ icon, label, value, color }) {
  return (
    <div className={"stat-card " + color}>
      <div className="stat-icon">{icon}</div>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  )
}

export default StatCard