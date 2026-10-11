const SESSION_KEY = 'request-management-session'

export function getSession() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY))
    if (session?.expiresAt && session.expiresAt <= Date.now()) {
      clearSession()
      return null
    }
    return session
  } catch {
    return null
  }
}

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function readTokenClaims(token) {
  const payload = token.split('.')[1]
  if (!payload) throw new Error('Giriş yanıtındaki JWT okunamadı.')

  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
  const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  return JSON.parse(atob(paddedBase64))
}
