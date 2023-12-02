import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notif',
  initialState: {
    control: 0
  },
  reducers: {
    updateNotif(state){
      state.control += 1
    },
  }
})
export const notifControl = (state) => state.notif.control
export const { updateNotif } = notifSlice.actions
export default notifSlice.reducer