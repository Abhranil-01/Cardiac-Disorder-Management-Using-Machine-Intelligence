import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",
  name: "",
  logout:false
}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.email = action.payload.email
      state.name = action.payload.name
    },
    unsetUserInfo: (state, action) => {
      state.email = action.payload.email
      state.name = action.payload.name
    },
    setLogOut: (state, action) => {
      state.logout = action.payload
    }
  }
})

export const { setUserInfo, unsetUserInfo,setLogOut } = userSlice.actions

export default userSlice.reducer