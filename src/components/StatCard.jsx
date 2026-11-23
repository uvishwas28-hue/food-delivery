function StatCard({ title, value, hint }) {
  return (
    <div className="card stat-card">
      <p className="stat-title">{title}</p>
      <h3 className="stat-value">{value}</h3>
      {hint ? <p className="stat-hint">{hint}</p> : null}
    </div>
  )
}

export default StatCard
