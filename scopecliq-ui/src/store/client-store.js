import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isClient:  true
  },
  reducers: {
    setAsConsultant(state){
      state.isClient = false
    },
    setAsClient(state){
      state.isClient = true
    },
  }
})
export const isClient = (state) =>  state.user.isClient;
// export const isLoggedIn = (state) => state.login.isLoggedIn
export const currentUser = (state) => state.login.user
export const { setAsConsultant, setAsClient } = userSlice.actions
export default userSlice.reducer