import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { IMenuItem, menuList } from './menu_list'

export default function AppMenu() {
  const [currentMenu, setCurrentMenu] = useState('')
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    menuList.forEach((menu: IMenuItem) => {
      if (pathname === menu.url) {
        setCurrentMenu(menu.key)
      }
    })
  }, [location])

  function onClick(e: any) {
    setCurrentMenu(e.key)
    App.router.push(e.item.props.url)
  }

  return (
    <Menu
      theme="dark"
      onClick={onClick}
      items={menuList}
      selectedKeys={[currentMenu]}
    ></Menu>
  )
}
