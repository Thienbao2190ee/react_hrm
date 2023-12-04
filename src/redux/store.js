import { configureStore } from '@reduxjs/toolkit'
import authReduce from './slice/authSlice'
import cityReduce from './slice/citySlice'
import hrmReduce from './slice/hrmSlice'
import districtsReduce from './slice/districtsSlice'
import wardsReduce from './slice/wardsSlice'


export default configureStore({
  reducer: {
    auth : authReduce,
    hrm : hrmReduce,
    city : cityReduce,
    districts : districtsReduce,
    wards : wardsReduce,
  },
})