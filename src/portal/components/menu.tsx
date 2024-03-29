import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { IMenuItem, menuList } from './menu_list'

export default function AppMenu() {
  const [currentMenu, setCurrentMenu] = useState('')
  const [openKey, setOpenKey] = useState('')
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    menuList.forEach((menu: IMenuItem) => {
      if (menu.children) {
        menu.children.forEach((child: IMenuItem) => {
          if (pathname === child.url) {
            setOpenKey(menu.key)
            setCurrentMenu(child.key)
          }
        })
      } else {
        if (pathname === menu.url) {
          setCurrentMenu(menu.key)
        }
      }
    })
  }, [location])

  function onClick(e: any) {
    App.router.push(e.item.props.url)
  }

  return (
    <>
      {currentMenu && (
        <Menu
          theme="dark"
          mode="inline"
          onSelect={onClick}
          items={menuList}
          selectedKeys={[currentMenu]}
          defaultOpenKeys={[openKey]}
        ></Menu>
      )}
    </>
  )
}
