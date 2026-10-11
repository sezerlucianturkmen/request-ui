import { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { errorMessage } from '../api/http'
import { listAllRequests, listMyRequests } from '../api/requestApi'
import AdminRequestModal from '../components/AdminRequestModal'
import AppNavbar from '../components/AppNavbar'
import CreateRequestModal from '../components/CreateRequestModal'
import RequestDetailModal from '../components/RequestDetailModal'
import RequestTable from '../components/RequestTable'
import { useAuth } from '../auth/AuthContext'
import { requestStatuses } from '../constants'

export default function RequestsPage() {
  const { session } = useAuth()
  const isAdmin = session.role === 'ADMIN'
  const [status, setStatus] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [showCreate, setShowCreate] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  useEffect(() => {
    const request = isAdmin ? listAllRequests(status) : listMyRequests()
    request
      .then(setItems)
      .catch((requestError) => {
        setItems([])
        setError(errorMessage(requestError))
      })
      .finally(() => setLoading(false))
  }, [isAdmin, status, reloadKey])

  function reload() {
    setLoading(true)
    setError('')
    setReloadKey((key) => key + 1)
  }

  return (
    <>
      <AppNavbar />
      <main className="container app-container py-4 py-lg-5">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-3 mb-4">
          <div>
            <h1 className="h2 mb-1">
              {isAdmin ? 'Tüm talepler' : 'Taleplerim'}
            </h1>
          </div>
          {isAdmin ? (
            <Form.Group className="status-filter">
              <Form.Label className="small text-secondary mb-1">Duruma göre filtrele</Form.Label>
              <Form.Select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value)
                  reload()
                }}
              >
                <option value="">Tüm durumlar</option>
                {requestStatuses.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          ) : (
            <Button onClick={() => setShowCreate(true)}>+ Yeni talep</Button>
          )}
        </div>

        {loading && (
          <p className="text-secondary">Talepler yükleniyor...</p>
        )}

        {!loading && error && (
          <Alert variant="danger" className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
            <span>{error}</span>
            <Button variant="outline-danger" size="sm" onClick={reload}>
              Tekrar dene
            </Button>
          </Alert>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="state-panel empty-state">
            <div className="empty-icon">✓</div>
            <h2 className="h5">{isAdmin ? 'Bu filtrede talep yok' : 'Henüz talebiniz yok'}</h2>
            <p className="text-secondary mb-0">
              {isAdmin
                ? 'Başka bir durum seçebilir veya daha sonra tekrar kontrol edebilirsiniz.'
                : 'Yeni bir destek talebi oluşturarak başlayabilirsiniz.'}
            </p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <RequestTable items={items} isAdmin={isAdmin} onSelect={setSelectedRequest} />
        )}
      </main>

      {showCreate && (
        <CreateRequestModal
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false)
            reload()
          }}
        />
      )}
      {selectedRequest && !isAdmin && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
      {selectedRequest && isAdmin && (
        <AdminRequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onChanged={() => {
            setSelectedRequest(null)
            reload()
          }}
        />
      )}
    </>
  )
}
