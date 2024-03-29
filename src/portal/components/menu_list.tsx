import React, { ReactNode } from 'react'
import {
  HomeOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  FolderOutlined,
  TableOutlined,
  TagsOutlined,
} from '@ant-design/icons'

export interface IMenuItem {
  key: string
  label: string
  url?: string
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
    label: '用户管理',
    icon: <UserOutlined />,
    url: '/inner_user/index/index',
  },

  {
    key: '1003',
    label: '题目管理',
    icon: <QuestionCircleOutlined />,
    children: [
      {
        key: '100301',
        label: '题库列表',
        icon: <FolderOutlined />,
        url: '/inner_question/group/index',
      },
      {
        key: '100302',
        label: '题目列表',
        icon: <TableOutlined />,
        url: '/inner_question/question/index',
      },
      {
        key: '100303',
        label: '标签列表',
        icon: <TagsOutlined />,
        url: '/inner_question/tags/index',
      },
    ],
  },
  {
    key: '1004',
    label: '客户管理',
    icon: <TeamOutlined />,
    url: '/inner_customer/index/index',
  },
]
