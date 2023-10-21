import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    // isLoggedIn: false,
    // userClient: {},
    // userConsultant: {},
    clientBool: false
  },
  reducers: {
      setAsConsultant(state){
        alert('set')
        state.clientBool = false
      },
      setAsClient(state){
        alert('shd be client now')
        state.clientBool = true
      },
    // toggleLogin(state){
    //     state.isLoggedIn = !state.isLoggedIn
    // },
    // setLogin(state, action){
    //   state.isLoggedIn = action.payload
    // },
    // setuser(state, action){
    //   state.user = action.payload
    // },
  }
})

export const clientMode = (state) =>  state.user.clientBool;
export const { setAsConsultant, setAsClient } = userSlice.actions;
export default userSlice.reducer