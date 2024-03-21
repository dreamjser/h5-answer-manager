import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { loginOpts } from '@/common/api/user'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/common/store/user_info_reducer'

export default function Login() {
  const dispatch = useDispatch()
  const { redirectUrl } = useParams()
  const [userForm, setUserForm] = useState<any>({
    userName: '',
    userPwd: '',
  })

  function onChangeUser(e: any) {
    setUserForm({
      ...userForm,
      userName: e.target.value,
    })
  }

  function onChangePwd(e: any) {
    setUserForm({
      ...userForm,
      userPwd: e.target.value,
    })
  }

  function onLogin() {
    App.request({
      ...loginOpts,
      data: {
        name: userForm.userName,
        pwd: userForm.userPwd,
      },
    }).then((r: any) => {
      const url = redirectUrl ? decodeURIComponent(redirectUrl) : '/'
      dispatch(setUserInfo(r))
      App.router.push(url)
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
              disabled={!userForm.userName || !userForm.userPwd}
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
