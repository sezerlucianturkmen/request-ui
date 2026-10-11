import { Table } from 'react-bootstrap'
import { categoryLabels, statusLabels } from '../constants'

function formatDate(value) {
  if (!value) return '-'
  return new Date(value).toLocaleString('tr-TR')
}

export default function RequestTable({ items, isAdmin, onSelect }) {
  return (
    <div className="table-responsive rounded-3 border bg-white">
      <Table hover className="mb-0 align-middle">
        <thead className="table-light">
          <tr>
            <th>Talep</th>
            {isAdmin && <th>Kullanıcı ID</th>}
            <th>Kategori</th>
            <th>Durum</th>
            <th>Oluşturulma</th>
          </tr>
        </thead>
        <tbody>
          {items.map((request) => (
            <tr
              key={request.id}
              className="request-row"
              onClick={() => onSelect(request)}
            >
              <td>
                <div className="fw-medium">{request.title}</div>
                <div className="small text-secondary text-truncate request-preview">
                  {request.description}
                </div>
              </td>
              {isAdmin && (
                <td className="small text-secondary">{request.userId}</td>
              )}
              <td>{categoryLabels[request.category] || request.category}</td>
              <td>
                <span className={`status-pill status-${request.status.toLowerCase()}`}>
                  {statusLabels[request.status] || request.status}
                </span>
              </td>
              <td className="small text-secondary">{formatDate(request.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
