// ** Axios
import axios from 'axios'
import env from 'react-dotenv'

export const me_info = async () => {
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
  axios.defaults.withCredentials = true
  axios.defaults.headers.common['Client-Id'] = env.NEXT_PUBLIC_CLIENT_ID

  const body = {
    client_id: env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: env.NEXT_PUBLIC_CLIENT_SECRET
  }

  const response = await axios.post(`${env.NEXT_PUBLIC_API_URL}/me`, body)

  return response
}
