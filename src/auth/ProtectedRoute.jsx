import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function ProtectedRoute({ children }) {
  const { session } = useAuth()
  return session ? children : <Navigate to="/login" replace />
}
