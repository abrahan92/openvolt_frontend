import axios from 'axios'

export const confirmEmail = async confirmation_token => {
  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/confirmation?confirmation_token=${confirmation_token}`
  )

  return response
}

export const forgotPassword = async (email) => {
  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/password`, { email })

  return response
}

export const login = async ({ email, password }) => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  const body = {
    email,
    password,
    type: 'login',
    grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
  }

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/oauth/token`, body)

  return response
}

export const logout = async () => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  const body = {
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    request_from: 'backoffice'
  }

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/oauth/revoke`, body)

  return response
}

export const loginWithGoogle = async token => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/oauth/token`,
    {
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      grant_type: 'assertion',
      provider: 'google',
      assertion: token,
      type: 'login',
      request_from: 'backoffice'
    },
    {
      headers: {
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID
      }
    }
  )

  return response
}

export const signUp = async ({ email, lastname, name, password }) => {
  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const body = {
    email,
    lastname,
    name,
    password,
    type: 'register'
  }

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, body)

  return response
}

export const signUpGoogle = async token => {
  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const body = {
    provider: 'google',
    type: 'register',
    assertion: token
  }

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, body)

  return response
}

export const resetPassword = async args => {
  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const body = {
    password: args.password,
    password_confirmation: args.password_confirmation,
    reset_password_token: args.reset_password_token,
    request_from: 'backoffice'
  }
  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/password`, body)

  return response
}

export const verify_token = async () => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/oauth/verify_token`, {
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID
  })

  return response
}

export const getUser = async user_id => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user_id}`)

  return response
}

export const getMe = async () => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true

  // axios.defaults.headers.common['Client-Id'] = process.env.NEXT_PUBLIC_CLIENT_ID

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`)

  return response
}
