import { createSlice } from '@reduxjs/toolkit'
const CACHE_KEY = '__userinfo__'

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    info: null as any,
  },
  reducers: {
    getUserInfo: (state: any) => {
      const info = localStorage.getItem(CACHE_KEY)
      if (info) {
        state.info = JSON.parse(info)
      }
    },
    setUserInfo: (state: any, actions: any) => {
      const info = actions.payload
      state.info = info
      localStorage.setItem(CACHE_KEY, JSON.stringify(info))
    },
  },
})
export const { setUserInfo, getUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer
