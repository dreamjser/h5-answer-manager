import React, { ReactNode } from 'react'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'

export interface IMenuItem {
  key: string
  label: string
  url: string
  icon: ReactNode
  children?: Array<IMenuItem>
}

type MenuList = Array<IMenuItem>

export const menuList: MenuList = [
  {
    key: '1001',
    label: '主页',
    icon: <HomeOutlined />,
    url: '/inner_platform/index/index',
  },
  {
    key: '1002',
    label: '用户',
    icon: <UserOutlined />,
    url: '/inner_user/index/index',
  },
]
