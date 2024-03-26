import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { addUserOpts } from '@/common/api/user'

export default forwardRef(function AddUserDialog(props: any, ref: any) {
  const [form] = Form.useForm()
  const [isOpen, setIsOpen] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      open() {
        setIsOpen(true)
      },
      close() {
        setIsOpen(false)
      },
    }
  })

  function onSubmit(values: any) {
    App.request({
      ...addUserOpts,
      data: {
        name: values.name,
        pwd: values.pwd,
      },
    }).then(() => {
      setIsOpen(false)
      props.onSubmit && props.onSubmit(values)
    })
  }

  return (
    isOpen && (
      <Modal
        title="添加用户"
        open={isOpen}
        footer={null}
        onCancel={() => {
          setIsOpen(false)
        }}
      >
        <Form
          form={form}
          name="userForm"
          onFinish={onSubmit}
          labelCol={{ span: 4, offset: 2 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item name="name" label="用户名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="pwd" label="密码" rules={[{ required: true }]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="repeat"
            label="确认密码"
            rules={[{ required: true }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button
              onClick={() => {
                setIsOpen(false)
              }}
            >
              取消
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  )
})
