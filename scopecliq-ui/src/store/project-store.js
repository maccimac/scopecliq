import { createSlice } from '@reduxjs/toolkit'

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    project: null,
    // isConsultant: false,
  },
  reducers: {
    setProject(state, payload){
      state.project = payload
    },

    // toggleLogin(state){
    //     state.isLoggedIn = !state.isLoggedIn
    // },
    // setLogin(state, action){
    //   state.isLoggedIn = action.payload
    // },
    // setUser(state, action){
    //   state.user = action.payload
    // },
  }
})
export const storeProject = (state) => state.project
export const storeIsConsultant = (state) => state.login.user
export const { toggleLogin, setLogin, setUser } = projectSlice.actions
export default projectSlice.reducer