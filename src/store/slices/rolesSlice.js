import { createSlice } from '@reduxjs/toolkit'

export const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    rolesByUser: []
  },
  reducers: {
    handleCreateRole: (state, action) => {
      state.roles = [action.payload, ...state.roles]
    },
    handleDeleteRole: (state, action) => {
      state.roles = [
        ...state?.roles?.slice(0, action.payload),
        ...state?.roles?.slice(action.payload + 1)
      ]
    },
    handleRoles: (state, action) => {
      state.roles = action.payload
    },
    handleRolesByUser: (state, action) => {
      state.rolesByUser = action.payload
    },
    handleUpdateRole: (state, action) => {
      state.roles = state?.roles?.map((role) => {
        return role.id.toString() === action.payload.id.toString() ? action.payload : role
      })
    }
  }
})

export const {
  handleCreateRole,
  handleDeleteRole,
  handleRoles,
  handleRolesByUser,
  handleUpdateRole
} = rolesSlice.actions

export default rolesSlice.reducer
