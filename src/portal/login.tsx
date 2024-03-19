import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userPwd: '',
  })

  function onChangeUser(e: any) {
    setUserInfo({
      ...userInfo,
      userName: e.target.value,
    })
  }

  function onChangePwd(e: any) {
    setUserInfo({
      ...userInfo,
      userPwd: e.target.value,
    })
  }

  function onLogin() {
    App.request({
      url: '/user/login',
      method: 'POST',
      data: {
        name: userInfo.userName,
        pwd: userInfo.userPwd,
      },
    }).then((r: any) => {
      console.log(r, '888')
    })
  }

  return (
    <div className="login-container">
      <div className="login-wrap">
        <h2>登录</h2>
        <Form>
          <Form.Item>
            <Input prefix={<UserOutlined />} onChange={onChangeUser} />
          </Form.Item>
          <Form.Item>
            <Input
              type="password"
              prefix={<LockOutlined />}
              onChange={onChangePwd}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              disabled={!userInfo.userName || !userInfo.userPwd}
              onClick={onLogin}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
