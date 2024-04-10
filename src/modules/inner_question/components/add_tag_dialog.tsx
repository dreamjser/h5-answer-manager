import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { addTagOpts, updateTagOpts } from '@/common/api/tag'

export default forwardRef(function AddTagDialog(props: any, ref: any) {
  const [form] = Form.useForm()
  const [id, setId] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      open(item: any) {
        form.setFieldsValue({
          name: item?.tag_name || '',
        })

        setId(item?.tag_id || 0)

        setIsOpen(true)
      },
      close() {
        setIsOpen(false)
      },
    }
  })

  function onSubmit(values: any) {
    App.request({
      ...(id ? updateTagOpts : addTagOpts),
      data: {
        id: id || '',
        name: values.name,
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
        title={id ? '修改标签' : '添加标签'}
        open={isOpen}
        footer={null}
        onCancel={() => {
          setIsOpen(false)
        }}
      >
        <Form
          form={form}
          onFinish={onSubmit}
          labelCol={{ span: 4, offset: 2 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item name="name" label="标签名称" rules={[{ required: true }]}>
            <Input maxLength={10} showCount />
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
