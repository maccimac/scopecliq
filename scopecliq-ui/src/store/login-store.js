import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    userId: null,
    user: null,
    userOrg: null,
  },
  reducers: {
    toggleLogin(state){
        state.isLoggedIn = !state.isLoggedIn
    },
    setLogin(state, action){
      state.isLoggedIn = action.payload
    },
    setUser(state, action){
      state.user = action.payload
    },
    setUserOrg(state, action){
      state.userOrg = action.payload
    },
    setUserId(state, action){
      if(action.payload){
        localStorage.setItem("sq_user_id", action.payload)
      }else{
        localStorage.removeItem("sq_user_id")
      }
      state.userId = action.payload
    },
  }
})
export const isLoggedIn = (state) => state.login.isLoggedIn
export const currentUser = (state) => state.login.user
export const currentUserId = (state) => {
  const localStorageUserId = localStorage.getItem("sq_user_id")
  return localStorageUserId ? localStorageUserId : state.login.userId
}
export const currentUserOrg = (state) => state.login.userOrg

export const { toggleLogin, setLogin, setUser, setUserId, setUserOrg } = loginSlice.actions
export default loginSlice.reducer