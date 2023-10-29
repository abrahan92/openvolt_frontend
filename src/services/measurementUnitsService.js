import axios from 'axios'

export const createMeasurementUnit = async ({ body }) => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/unities`, body)

  return response
}

export const deleteMeasurementUnit = async ({ id }) => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/unities/${id}`)

  return response
}

export const getMeasurementUnits = async () => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/unities`)

  return response
}

export const updateMeasurementUnit = async ({ body, id }) => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/unities/${id}`, body)

  return response
}
