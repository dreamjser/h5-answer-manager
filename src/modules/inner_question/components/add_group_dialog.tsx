import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import {
  addQuestionGroupOpts,
  updateQuestionGroupOpts,
} from '@/common/api/question_group'

export default forwardRef(function AddGroupDialog(props: any, ref: any) {
  const [form] = Form.useForm()
  const [id, setId] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      open(item: any) {
        form.setFieldsValue({
          name: item?.group_name || '',
          desc: item?.group_desc || '',
        })

        setId(item?.group_id || 0)

        setIsOpen(true)
      },
      close() {
        setIsOpen(false)
      },
    }
  })

  function onSubmit(values: any) {
    App.request({
      ...(id ? updateQuestionGroupOpts : addQuestionGroupOpts),
      data: {
        id: id || '',
        name: values.name,
        desc: values.desc,
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
        title={id ? '修改题库' : '添加题库'}
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
          <Form.Item name="name" label="题库名称" rules={[{ required: true }]}>
            <Input maxLength={10} showCount />
          </Form.Item>
          <Form.Item name="desc" label="题库描述" rules={[{ required: true }]}>
            <Input.TextArea maxLength={20} showCount />
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
