import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal, Form, Input, Button, Select, Radio, Checkbox } from 'antd'
import { addQuestionOpts, updateQuestionOpts } from '@/common/api/question'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'

let answerId = 100

export default forwardRef(function AddQuestionDialog(props: any, ref: any) {
  const [form] = Form.useForm()
  const [id, setId] = useState(0)
  const [type, setType] = useState('01')
  const [answers, setAnswers] = useState([getAnswerItem()])
  const [rightAnswers, setRightAnswers] = useState<any>([])
  const [isOpen, setIsOpen] = useState(false)

  function getAnswerItem() {
    return {
      answerId: answerId++,
      answerName: '',
      isRight: false,
    }
  }

  function pushAnswers(type: string, value: number) {
    if (type === '01') {
      setRightAnswers([value])
    }
  }

  function onCheckAnswers(list: any) {
    console.log(list, 'lll')
    setRightAnswers(list)
  }

  useImperativeHandle(ref, () => {
    return {
      open(item: any) {
        form.setFieldsValue({
          name: item?.question_name || '',
          type: item?.question_type || '01',
          tag: item?.question_tag || '',
        })

        setId(item?.question_id || 0)

        setIsOpen(true)
      },
      close() {
        setIsOpen(false)
      },
    }
  })

  function onSubmit(values: any) {
    App.request({
      ...(id ? updateQuestionOpts : addQuestionOpts),
      data: {
        id: id || '',
        name: values.name,
        type: values.type,
        tag: values.tag,
      },
    }).then(() => {
      const msg = id ? '修改成功' : '新增成功'
      setIsOpen(false)
      props.onSubmit && props.onSubmit(values)
      App.interface.toast(msg)
    })
  }

  function onChangeAnswer(answer: any, value: string) {
    answer.answerName = value
  }

  function GroupWrap(props: any) {
    const { type } = props
    const child = answers.map((answer: any, index: number) => (
      <div key={answer.answerId} style={{ marginBottom: '10px' }}>
        <Input
          style={{ width: '240px', marginRight: '10px' }}
          onChange={(e) => {
            onChangeAnswer(answer, e.target.value)
          }}
        />
        {type === '01' && (
          <Radio
            className="co-mr10"
            onChange={() => {
              pushAnswers(type, index)
            }}
            value={index}
            checked={rightAnswers.includes(index)}
          />
        )}
        {type === '02' && <Checkbox className="co-mr10" value={index} />}
        {answers.length > 1 && (
          <MinusCircleOutlined
            className="co-mr10"
            onClick={() => {
              const arr: any = [...answers]
              arr.splice(index, 1)
              setAnswers(arr)
            }}
          />
        )}
        {index === answers.length - 1 && (
          <PlusCircleOutlined
            onClick={() => {
              setAnswers([...answers, getAnswerItem()])
            }}
          />
        )}
      </div>
    ))
    return type === '01' ? (
      child
    ) : (
      <Checkbox.Group onChange={onCheckAnswers} value={rightAnswers}>
        {child}
      </Checkbox.Group>
    )
  }

  return (
    isOpen && (
      <Modal
        title={id ? '修改题目' : '添加题目'}
        open={isOpen}
        footer={null}
        width={600}
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
          <Form.Item name="name" label="题目名称" rules={[{ required: true }]}>
            <Input maxLength={30} showCount />
          </Form.Item>
          <Form.Item name="type" label="题目类型" rules={[{ required: true }]}>
            <Select
              value={type}
              onChange={(value) => {
                setRightAnswers([])
                setType(value)
              }}
              options={[
                { value: '01', label: '单选题' },
                { value: '02', label: '多选题' },
              ]}
            />
          </Form.Item>
          <Form.Item name="tag" label="题目标签">
            <Select
              placeholder="请选择"
              options={[
                { value: '01', label: '单选题' },
                { value: '02', label: '多选题' },
              ]}
            />
          </Form.Item>
          <Form.Item label="题目答案">
            <GroupWrap type={form.getFieldValue('type')}></GroupWrap>
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
