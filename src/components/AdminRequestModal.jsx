import { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { closeRequest, replyToRequest } from '../api/requestApi'
import { errorMessage } from '../api/http'
import { categoryLabels, statusLabels } from '../constants'

export default function AdminRequestModal({ request, onClose, onChanged }) {
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const canReply = request.status === 'OPEN'
  const canClose = request.status !== 'CLOSED'

  async function run(action) {
    if (busy) return
    setBusy(true)
    setError('')
    try {
      await action()
      onChanged()
    } catch (requestError) {
      setError(errorMessage(requestError))
      setBusy(false)
    }
  }

  function submitReply(event) {
    event.preventDefault()
    if (!response.trim()) {
      setError('Yanıt boş olamaz.')
      return
    }
    run(() => replyToRequest(request.id, response.trim()))
  }

  function submitClose() {
    if (window.confirm('Bu talep kapatılsın mı?')) {
      run(() => closeRequest(request.id))
    }
  }

  return (
    <Modal show onHide={onClose} centered>
      <Form onSubmit={submitReply}>
        <Modal.Header closeButton>
          <Modal.Title>{request.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="small text-secondary mb-3">
            Kullanıcı ID: {request.userId}<br />
            {categoryLabels[request.category]} · {statusLabels[request.status]}
          </div>
          <p className="request-description">{request.description}</p>
          <hr />
          {request.status === 'ANSWERED' && (
            <>
              <h2 className="h6">Mevcut yanıt</h2>
              <p className="request-description">{request.adminResponse}</p>
            </>
          )}
          {request.status === 'CLOSED' && (
            <>
              <h2 className="h6">Mevcut yanıt</h2>
              <p className="request-description">
                {request.adminResponse || 'Yanıt verilmedi.'}
              </p>
              <p className="small text-secondary mb-0">
                Kapatılmış talep değiştirilemez.
              </p>
            </>
          )}
          {canReply && (
            <Form.Group>
              <Form.Label>Yanıt</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                maxLength={5000}
                value={response}
                required
                onChange={(event) => setResponse(event.target.value)}
              />
            </Form.Group>
          )}
          {error && <Alert variant="danger" className="mt-3 mb-0">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="outline-secondary" onClick={onClose} disabled={busy}>
            Kapat
          </Button>
          {canClose && (
            <Button type="button" variant="outline-danger" onClick={submitClose} disabled={busy}>
              Talebi kapat
            </Button>
          )}
          {canReply && (
            <Button type="submit" variant="success" disabled={busy}>
              {busy ? 'İşleniyor...' : 'Yanıtla'}
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
