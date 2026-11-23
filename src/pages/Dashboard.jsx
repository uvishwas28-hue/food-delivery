import { Link } from 'react-router-dom'
import { initialOrders } from '../data/initialOrders'
import StatCard from '../components/StatCard'

function formatCurrency(amount) {
  return `₹${amount.toFixed(2)}`
}

function Dashboard() {
  const totalOrders = initialOrders.length
  const delivered = initialOrders.filter((o) => o.status === 'Delivered').length
  const inProgress = initialOrders.filter((o) =>
    ['Placed', 'Preparing', 'Out for Delivery'].includes(o.status),
  ).length
  const revenue = initialOrders
    .filter((o) => o.payment.status === 'Paid')
    .reduce((sum, o) => sum + o.total, 0)

  const recentOrders = [...initialOrders]
    .sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt))
    .slice(0, 5)

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">Overview of food delivery orders</p>
        </div>
        <Link to="/orders" className="btn">
          View All Orders
        </Link>
      </div>

      <div className="grid stats-grid">
        <StatCard title="Total Orders" value={totalOrders} hint="All recorded orders" />
        <StatCard title="Delivered" value={delivered} hint="Completed deliveries" />
        <StatCard title="In Progress" value={inProgress} hint="Placed, preparing, or out for delivery" />
        <StatCard title="Revenue (Paid)" value={formatCurrency(revenue)} hint="Sum of paid order totals" />
      </div>

      <div className="card">
        <div className="page-header" style={{ marginBottom: 10 }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Recent Orders</h2>
          <Link to="/orders" className="btn secondary small">
            View All
          </Link>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Restaurant</th>
                <th>Status</th>
                <th>Total</th>
                <th>Placed At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer.name}</td>
                  <td>{order.restaurant.name}</td>
                  <td>
                    <span className={`badge status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{formatCurrency(order.total)}</td>
                  <td>{new Date(order.placedAt).toLocaleString()}</td>
                  <td>
                    <Link to={`/orders/${order.id}`} className="btn secondary small">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
