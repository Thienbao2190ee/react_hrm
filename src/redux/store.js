import { configureStore } from '@reduxjs/toolkit'
import authReduce from './slice/authSlice'


export default configureStore({
  reducer: {
    auth : authReduce
  },
})