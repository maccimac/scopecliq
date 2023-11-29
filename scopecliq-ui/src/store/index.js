import { configureStore } from '@reduxjs/toolkit'
import userReducer from './client-store'
import projectReducer from './project-store'
import loginReducer from './login-store'
import snackbarReducer from './snackbar-store'
import notifReducer from './notif-store'

export const store = configureStore({
  reducer: {
    project: projectReducer,
    login: loginReducer,
    user: userReducer,
    snackbar: snackbarReducer,
    notif: notifReducer
  }
})