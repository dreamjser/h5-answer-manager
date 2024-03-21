import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { USERINFO_CACHE_KEY, getCache } from '@/common/utils/cache'
export default function Home() {
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    const userInfo = getCache(USERINFO_CACHE_KEY)

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
          <Menu mode="inline" theme="dark">
            <Menu.Item>主页</Menu.Item>
            <Menu.Item>用户</Menu.Item>
          </Menu>
        </div>
        <div className="manager-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
