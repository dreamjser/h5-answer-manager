import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { addCustomerOpts, updateCustomerOpts } from '@/common/api/customer'

export default forwardRef(function AddCustomerDialog(props: any, ref: any) {
  const [form] = Form.useForm()
  const [id, setId] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      open(item: any) {
        form.setFieldsValue({
          name: item?.customer_name || '',
          phone: item?.phone || '',
          email: item?.email || '',
        })

        setId(item?.customer_id || 0)

        setIsOpen(true)
      },
      close() {
        setIsOpen(false)
      },
    }
  })

  function onSubmit(values: any) {
    App.request({
      ...(id ? updateCustomerOpts : addCustomerOpts),
      data: {
        id: id || '',
        name: values.name,
        phone: values.phone,
        email: values.email,
      },
    }).then(() => {
      const msg = id ? '修改成功' : '新增成功'
      setIsOpen(false)
      props.onSubmit && props.onSubmit(values)
      App.interface.toast(msg)
    })
  }

  return (
    isOpen && (
      <Modal
        title={id ? '修改客户' : '添加客户'}
        open={isOpen}
        footer={null}
        onCancel={() => {
          setIsOpen(false)
        }}
      >
        <Form
          form={form}
          name="customerForm"
          onFinish={onSubmit}
          labelCol={{ span: 4, offset: 2 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item
            name="name"
            label="客户名称"
            rules={[{ required: true, message: '请输入客户名称' }]}
          >
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item
            name="phone"
            label="联系电话"
            rules={[
              { required: true, message: '请输入联系电话' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' },
            ]}
          >
            <Input maxLength={11} />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' },
            ]}
          >
            <Input maxLength={50} />
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
