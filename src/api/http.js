import axios from 'axios'
import { clearSession, getSession } from '../auth/session'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
})

http.interceptors.request.use((config) => {
  const session = getSession()

  if (session?.accessToken) {
    config.headers.Authorization = `${session.tokenType} ${session.accessToken}`
  }

  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/api/auth/login')

    if (error.response?.status === 401 && !isLoginRequest) {
      clearSession()
      window.location.assign('/login')
    }

    return Promise.reject(error)
  },
)

export function errorMessage(error) {
  if (error.response?.data?.detail) return error.response.data.detail
  if (error.response) return 'İstek tamamlanamadı. Lütfen tekrar deneyin.'
  return 'Sunucuya ulaşılamadı. Backend uygulamasının çalıştığını kontrol edin.'
}

export default http
