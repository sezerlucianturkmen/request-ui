import { Button, Container, Navbar } from 'react-bootstrap'
import { useAuth } from '../auth/AuthContext'

export default function AppNavbar() {
  const { session, logout } = useAuth()

  return (
    <Navbar className="border-bottom bg-white">
      <Container>
        <Navbar.Brand className="fw-semibold">Destek Talep Sistemi</Navbar.Brand>
        <div className="d-flex align-items-center gap-3">
          <span className="small text-secondary">
            {session.role === 'ADMIN' ? 'ADMIN' : 'USER'}
          </span>
          <Button variant="outline-secondary" size="sm" onClick={logout}>
            Çıkış yap
          </Button>
        </div>
      </Container>
    </Navbar>
  )
}
