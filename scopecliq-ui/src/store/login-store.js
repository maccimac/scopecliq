import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    userId: 1,
    user: {
      // email: "julia@gmail.com",
      // firstname: "Julia",
      // lastname: "Shuvo",
      // mobile: "+1 234 56789",
      // password: "pass123",
      // profile_photo: "julia.jpg",
      // user_id: 123,
      // _id: "6430cbd6980499ce3cb2b7c0"
    }
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
    setUserId(state, action){
      state.userId = action.payload
    },
  }
})
export const isLoggedIn = (state) => state.login.isLoggedIn
export const currentUser = (state) => state.login.user
export const currentUserId = (state) => state.login.userId
export const { toggleLogin, setLogin, setUser, setUserId } = loginSlice.actions
export default loginSlice.reducer