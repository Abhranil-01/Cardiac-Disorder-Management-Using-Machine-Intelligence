import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {userAuthApi} from '../Service/UserAuthApi'
import authReducer from '../Features/authSlice'
import userReducer from '../Features/userSlice'
import cartReducer from '../features/cartSlice'
export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    auth: authReducer,
    user_info: userReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
})

setupListeners(store.dispatch)