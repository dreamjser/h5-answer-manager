import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react'
import { Modal, Form, Input, Button, Select, Radio, Checkbox } from 'antd'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { addQuestionOpts, updateQuestionOpts } from '@/common/api/question'
import { getTagListOpts } from '@/common/api/tag'

export default forwardRef(function AddQuestionDialog(props: any, ref: any) {
  const [form] = Form.useForm()
  const [id, setId] = useState(0)
  const [type, setType] = useState('01')
  const [answers, setAnswers] = useState([getAnswerItem()])
  const [rightAnswers, setRightAnswers] = useState<any>([])
  const [tagList, setTagList] = useState<any>([])
  const [answerError, setAnswerError] = useState<any>({
    help: '',
    status: '',
  })
  const [isOpen, setIsOpen] = useState(false)

  function getAnswerItem() {
    return {
      answerName: '',
      isRight: false,
    }
  }

  function pushAnswers(type: string, value: number) {
    if (type === '01') {
      setRightAnswers([value])
    } else {
      const arr = [...rightAnswers]
      const index = arr.indexOf(value)
      if (index >= 0) {
        arr.splice(index, 1)
      } else {
        arr.push(value)
      }
      setRightAnswers(arr)
    }
  }

  function getAnswers() {
    return answers.map((answer: any, index: number) => {
      answer.isRight = rightAnswers.includes(index)
      return { ...answer }
    })
  }

  useEffect(() => {
    App.request({
      ...getTagListOpts,
    }).then((r: any) => {
      setTagList(r)
    })
  }, [])

  useImperativeHandle(ref, () => {
    return {
      open(item: any) {
        form.setFieldsValue({
          name: item?.question_name || '',
          type: item?.question_type || '01',
          tag: item?.question_tag || [],
        })

        setId(item?.id || 0)

        setIsOpen(true)
      },
      close() {
        setIsOpen(false)
      },
    }
  })

  function onSubmit(values: any) {
    if (answers.some((answer: any) => !answer.answerName)) {
      setAnswerError({
        status: 'error',
        help: '有未填写答案选项，请填写',
      })
      return
    }
    if (rightAnswers.length === 0) {
      setAnswerError({
        status: 'error',
        help: '未设置正确答案',
      })
      return
    }

    setAnswerError({
      status: '',
      help: '',
    })

    App.request({
      ...(id ? updateQuestionOpts : addQuestionOpts),
      data: {
        id: id || '',
        name: values.name,
        type: values.type,
        tag: values.tag,
        answers: getAnswers(),
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
              mode="multiple"
              allowClear
              options={tagList.map((tag: any) => ({
                label: tag.tag_name,
                value: tag.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="题目答案"
            required
            validateStatus={answerError.status}
            help={answerError.help}
          >
            {answers.map((answer: any, index: number) => {
              const type = form.getFieldValue('type')
              return (
                <div
                  key={index}
                  style={{
                    marginBottom: index === answers.length - 1 ? '0' : '10px',
                  }}
                >
                  <Input
                    style={{
                      width: '240px',
                      marginRight: '10px',
                    }}
                    value={answer.answerName}
                    onChange={(e) => {
                      const arr = [...answers]
                      arr[index].answerName = e.target.value
                      setAnswers(arr)
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
                  {type === '02' && (
                    <Checkbox
                      className="co-mr10"
                      onChange={() => {
                        pushAnswers(type, index)
                      }}
                      value={index}
                      checked={rightAnswers.includes(index)}
                    />
                  )}
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
              )
            })}
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
