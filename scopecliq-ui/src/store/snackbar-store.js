import { createSlice } from '@reduxjs/toolkit'

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
      snackbarActive: {
        show: false,
        status: null,
        message: ""
      }
      
  },
  reducers: {
    showSnackbarMessage(state, action){
      console.log({action, state})
      state.snackbarActive = {
        show: true,
        status: action.payload.status,
        message: action.payload.message 
      };  

      
    },
    resetSnackbarMessage(state){
      state.snackbarActive = {
        show: false,
        status: null,
        message: ""
      }  

    }
    
  }
})
export const storeSnackbar = (state) => state.snackbar.snackbarActive
export const { showSnackbarMessage, resetSnackbarMessage} = snackbarSlice.actions
export default snackbarSlice.reducer