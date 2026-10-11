import { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { createRequest } from '../api/requestApi'
import { errorMessage } from '../api/http'
import { requestCategories } from '../constants'

export default function CreateRequestModal({ onClose, onCreated }) {
  const [requestId] = useState(() => crypto.randomUUID())
  const [form, setForm] = useState({ title: '', description: '', category: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    if (submitting) return
    if (!form.title.trim() || !form.description.trim() || !form.category) {
      setError('Başlık, açıklama ve kategori zorunludur.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await createRequest({ ...form, requestId })
      onCreated()
    } catch (error) {
      setError(errorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal show onHide={onClose} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni talep</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Başlık</Form.Label>
            <Form.Control
              name="title"
              value={form.title}
              onChange={updateField}
              required
              maxLength={120}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Kategori</Form.Label>
            <Form.Select
              name="category"
              value={form.category}
              onChange={updateField}
              required
            >
              <option value="">Kategori seçin</option>
              {requestCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Açıklama</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="description"
              value={form.description}
              onChange={updateField}
              required
              maxLength={5000}
            />
          </Form.Group>
          {error && <Alert variant="danger" className="mt-3 mb-0">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="outline-secondary" onClick={onClose} disabled={submitting}>
            Vazgeç
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Gönderiliyor...' : 'Oluştur'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
