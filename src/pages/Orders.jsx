import { Link } from 'react-router-dom'
import { initialOrders } from '../data/initialOrders'

function formatCurrency(amount) {
  return `₹${amount.toFixed(2)}`
}

function Orders() {
  const orders = [...initialOrders].sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt))

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Orders</h1>
          <p className="subtitle">All food delivery orders with details</p>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Restaurant</th>
                <th>Items</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Total</th>
                <th>Placed At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <div>{order.customer.name}</div>
                    <div className="muted">{order.customer.phone}</div>
                  </td>
                  <td>
                    <div>{order.restaurant.name}</div>
                    <div className="muted">{order.restaurant.cuisine}</div>
                  </td>
                  <td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                  <td>
                    <div>{order.payment.method}</div>
                    <div className="muted">{order.payment.status}</div>
                  </td>
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

export default Orders
