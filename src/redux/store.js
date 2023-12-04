import { configureStore } from '@reduxjs/toolkit'
import authReduce from './slice/authSlice'
import hrmReduce from './slice/hrmSlice'


export default configureStore({
  reducer: {
    auth : authReduce,
    hrm : hrmReduce
  },
})