import { createSlice } from '@reduxjs/toolkit'

const projectSlice = createSlice({
  name: 'project',
  initialState: null,
  reducers: {
    setProject(state, action){
      return action.payload
    },
  }
})
export const storeProject = (state) => state.project
export const storeIsConsultant = (state) => state.login.user
export const { setProject } = projectSlice.actions
export default projectSlice.reducer