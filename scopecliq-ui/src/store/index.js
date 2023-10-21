import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user-store'
import projectReducer from './project-store'
import loginReducer from './login-store'

export const store = configureStore({
  reducer: {
    project: projectReducer,
    login: loginReducer,
    user: userReducer
  }
})