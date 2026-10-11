import http from './http'

const data = (response) => response.data

export const createRequest = (request) =>
  http.post('/api/requests', request).then(data)

export const listMyRequests = () => http.get('/api/requests').then(data)

export const listAllRequests = (status) =>
  http.get('/api/admin/requests', {
    params: status ? { status } : {},
  }).then(data)

export const replyToRequest = (id, response) =>
  http.put(`/api/admin/requests/${id}/reply`, { response }).then(data)

export const closeRequest = (id) =>
  http.put(`/api/admin/requests/${id}/close`).then(data)
