import { createSlice } from '@reduxjs/toolkit'

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
      snackbarActive: {
        show: false,
        message: ""
      }
      
  },
  reducers: {
    showSnackbarMessage(state, action){
      console.log({action, state})
      state.snackbarActive = {
        show: true,
        message: action.payload 
      };  

      
    },
    resetSnackbarMessage(state){
      state.snackbarActive = {
        show: false,
        message: ""
      }  

    }
    
  }
})
export const storeSnackbar = (state) => state.snackbar.snackbarActive
export const { showSnackbarMessage, resetSnackbarMessage} = snackbarSlice.actions
export default snackbarSlice.reducer