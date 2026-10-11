import { Button, Modal } from 'react-bootstrap'
import { categoryLabels, statusLabels } from '../constants'

export default function RequestDetailModal({ request, onClose }) {
  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{request.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="small text-secondary mb-3">
          {categoryLabels[request.category]} · {statusLabels[request.status]}
        </div>
        <p className="request-description">{request.description}</p>
        <hr />
        <h2 className="h6">Yönetici yanıtı</h2>
        <p className="mb-0 request-description">
          {request.adminResponse || 'Henüz yanıtlanmadı.'}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  )
}
