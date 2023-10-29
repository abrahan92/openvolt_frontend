import axios from 'axios'

export const createCategory = async ({ body }) => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`, body)

  return response
}

export const deleteCategory = async ({ id }) => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/${id}`)

  return response
}

export const getCategories = async () => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`)

  return response
}

export const updateCategory = async ({ body, id }) => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/${id}`, body)

  return response
}
