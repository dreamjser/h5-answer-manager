import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { USERINFO_CACHE_KEY, getCache } from '@/common/utils/cache'
import { ROOT_REDIRECT } from '@/common/utils/constant'
import AppMenu from './components/menu'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    const userInfo = getCache(USERINFO_CACHE_KEY)

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
