import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { errorMessage } from '../api/http'
import { useAuth } from '../auth/AuthContext'

export default function LoginPage() {
  const { session, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (session) return <Navigate to="/" replace />

  async function submit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email.trim(), password)
    } catch (error) {
      setError(errorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="login-screen">
      <Form className="login-form" onSubmit={submit}>
        <h1 className="h4 mb-4">Giriş yap</h1>
        <Form.Group className="mb-3">
          <Form.Label>E-posta</Form.Label>
          <Form.Control
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Parola</Form.Label>
          <Form.Control
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button type="submit" className="w-100" disabled={submitting}>
          {submitting ? 'Giriş yapılıyor...' : 'Giriş yap'}
        </Button>
      </Form>
    </main>
  )
}
