import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import store from '@/common/store'
import { ROOT_REDIRECT } from '@/common/utils/constant'
import AppMenu from './components/menu'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    const state = store.getState()
    const userInfo = state.userInfo.info

    if (pathname === '/') {
      App.router.push(ROOT_REDIRECT)
    }
    if (!userInfo) {
      App.router.push('/login', {
        query: { redirectUrl: encodeURIComponent(pathname) },
        replace: true,
      })
    }
  }, [])

  return (
    <div className="manager-container">
      <div className="manager-body">
        <div className="manager-menu">
          <AppMenu />
        </div>
        <div className="manager-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
