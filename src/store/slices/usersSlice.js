import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: []
  },
  reducers: {
    handleCreateUser: (state, action) => {
      state.users = [action.payload, ...state.users]
    },
    handleDeleteUser: (state, action) => {
      state.users = [...state?.users?.slice(0, action.payload), ...state?.users?.slice(action.payload + 1)]
    },
    handleUsers: (state, action) => {
      state.users = action.payload
    },
    handleUpdateUser: (state, action) => {
      state.users = state?.users?.map(user => {
        return user.id.toString() === action.payload.id.toString() ? action.payload : user
      })
    }
  }
})

export const { handleCreateUser, handleDeleteUser, handleUsers, handleUpdateUser } = usersSlice.actions

export default usersSlice.reducer
