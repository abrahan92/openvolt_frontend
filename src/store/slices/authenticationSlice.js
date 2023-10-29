import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    email: null,
    rememberMe: null,
    userData: {}
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = {
        ...action.payload,
        permissions: action.payload.permissions.map(item => {
          return { ...item, action: item.action_perform }
        })
      }

      localStorage.setItem(
        'userData',
        JSON.stringify({
          ...action.payload,
          permissions: action.payload.permissions.map(item => {
            return { ...item, action: item.action_perform }
          })
        })
      )
    },
    handleLoginCredentials: (state, action) => {
      state.email = action.payload.email
      state.rememberMe = action.payload.rememberMe
    },
    handleLogout: state => {
      state.userData = {}

      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData')
    },
    handleSignUp: (state, action) => {
      state.userData = action.payload
      localStorage.setItem('userData', JSON.stringify(action.payload))
    },
    handleUserData: (state, action) => {
      state.userData = {
        ...action.payload,
        permissions: action.payload.permissions.map(item => {
          return { ...item, action: item.action_perform }
        })
      }
      localStorage.setItem(
        'userData',
        JSON.stringify({
          ...action.payload,
          permissions: action.payload.permissions.map(item => {
            return { ...item, action: item.action_perform }
          })
        })
      )
    }
  }
})

export const { handleLogin, handleLoginCredentials, handleLogout, handleSignUp, handleUserData } = authSlice.actions

export default authSlice.reducer
