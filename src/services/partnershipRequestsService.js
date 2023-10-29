import axios from 'axios'

export const createPartnershipRequest = async ({ body }) => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/partnership_requests`, body)

  return response
}

export const deletePartnershipRequest = async ({ id }) => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/partnership_requests/${id}`)

  return response
}

export const getPartnershipRequests = async () => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/partnership_requests`)

  return response
}

export const updatePartnershipRequest = async ({ body, id }) => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/partnership_requests/${id}`, body)

  return response
}
