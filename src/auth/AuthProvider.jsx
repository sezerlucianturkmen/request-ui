import { useState } from 'react'
import { login as loginApi } from '../api/authApi'
import { AuthContext } from './AuthContext'
import { clearSession, getSession, readTokenClaims, saveSession } from './session'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(getSession)

  async function login(email, password) {
    const result = await loginApi(email, password)
    const claims = readTokenClaims(result.accessToken)
    const session = {
      accessToken: result.accessToken,
      tokenType: result.tokenType,
      expiresAt: Date.now() + result.expiresInSeconds * 1000,
      role: claims.role,
    }

    if (!['USER', 'ADMIN'].includes(session.role)) {
      throw new Error('Giriş yanıtındaki kullanıcı bilgileri geçersiz.')
    }

    saveSession(session)
    setSession(session)
  }

  function logout() {
    clearSession()
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
