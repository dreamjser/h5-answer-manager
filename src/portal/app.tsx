import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location

    console.log(pathname, 'll')
  }, [location])

  return <Outlet />
}
