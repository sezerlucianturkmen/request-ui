import http from './http'

export async function login(email, password) {
  const response = await http.post('/api/auth/login', { email, password })
  return response.data
}
