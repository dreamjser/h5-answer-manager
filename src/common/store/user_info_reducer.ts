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
    removeUserInfo: (state: any) => {
      state.info = null
      localStorage.removeItem(CACHE_KEY)
      App.router.push('/login', {
        query: {
          redirectUrl: encodeURIComponent(location.pathname),
        },
        replace: true,
      })
    },
  },
})
export const { setUserInfo, getUserInfo, removeUserInfo } =
  userInfoSlice.actions

export default userInfoSlice.reducer
