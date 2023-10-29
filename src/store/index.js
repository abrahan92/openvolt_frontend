import { configureStore } from '@reduxjs/toolkit'

import authentication from 'src/store/slices/authenticationSlice'
import permissions from 'src/store/slices/permissionsSlice'
import roles from 'src/store/slices/rolesSlice'
import users from 'src/store/slices/usersSlice'

export const store = configureStore({
  reducer: {
    authentication,
    permissions,
    roles,
    users
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
