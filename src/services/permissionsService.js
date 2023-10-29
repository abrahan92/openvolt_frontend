import axios from 'axios'

export const createPermission = async ({ body }) => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/permissions`, body)

  return response
}

export const deletePermission = async ({ id }) => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/permissions/${id}`)

  return response
}

export const getPermissions = async () => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/permissions`)

  return response
}

export const getPermissionsSubjectList = async () => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/permissions_subject_list`)

  return response
}

export const updatePermission = async ({ body, id }) => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/permissions/${id}`, body)

  return response
}
