import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth'
// import assetReducer from './asset'

const store = configureStore({
  reducer: { auth: authReducer },
})

export default store
