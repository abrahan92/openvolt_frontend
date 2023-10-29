/* eslint-disable multiline-ternary */

import { createSlice } from '@reduxjs/toolkit'

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    permissions: [],
    permissionsSubjectList: {
      subjects: [],
      actions: []
    }
  },
  reducers: {
    handleCreatePermission: (state, action) => {
      state.permissions = [...state.permissions, action.payload]
    },
    handleCreatePermissionSubjectList: (state, action) => {
      state.permissionsSubjectList = {
        subjects: [...state.permissionsSubjectList.subjects, action.payload.subject],
        actions: [...state.permissionsSubjectList.actions, action.payload.action_perform]
      }

      state.permissionsSubjectList = {
        subjects: state.permissionsSubjectList.subjects.filter((element, index) => {
          return state.permissionsSubjectList.subjects.indexOf(element) === index
        }),
        actions: state.permissionsSubjectList.actions.filter((element, index) => {
          return state.permissionsSubjectList.actions.indexOf(element) === index
        })
      }
    },
    handleDeletePermission: (state, action) => {
      state.permissions = [
        ...state?.permissions?.slice(0, action.payload),
        ...state?.permissions?.slice(action.payload + 1)
      ]
    },
    handlePermissions: (state, action) => {
      state.permissions = action.payload
    },
    handlePermissionsSubjectList: (state, action) => {
      state.permissionsSubjectList = action.payload
    },
    handleUpdatePermission: (state, action) => {
      state.permissions = state?.permissions?.map((permission) => {
        return permission.id.toString() === action.payload.id.toString()
          ? action.payload
          : permission
      })
    }
  }
})

export const {
  handleCreatePermission,
  handleCreatePermissionSubjectList,
  handleDeletePermission,
  handlePermissions,
  handlePermissionsSubjectList,
  handleUpdatePermission,
  handleUpdatePermissionSubjectList
} = permissionsSlice.actions

export default permissionsSlice.reducer
