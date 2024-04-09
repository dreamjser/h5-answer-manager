import React, { useRef, useState, useEffect } from 'react'
import { Col, Row, Form, Input, Button, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { getQuestionListOpts, deleteQuestionOpts } from '@/common/api/question'
import AddQuestionDialog from '../../components/add_question_dialog'

const View = () => {
  const modal: any = useRef(null)
  const [tableData, setTableData] = useState<any>([])
  const [formData, setFormData] = useState({
    name: '',
  })
  const [pageData, setPageData] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  function onEdit(item: any) {
    modal.current?.open(item)
  }

  async function onDel(item: any) {
    await App.interface.confirm('确定删除该题目?')

    await App.request({
      ...deleteQuestionOpts,
      data: {
        id: item.question_id,
      },
    })

    App.interface.toast('删除成功')

    getUserList()
  }

  function getUserList() {
    App.request({
      ...getQuestionListOpts,
      data: formData,
    }).then((r: any) => {
      const { list, total } = r
      setTableData(list)
      setPageData({
        ...pageData,
        total,
      })
    })
  }

  function onPageChange(page: any) {
    setPageData({
      ...page,
    })
  }

  useEffect(() => {
    getUserList()
  }, [pageData.current, pageData.pageSize])

  const columns = [
    {
      title: '题目id',
      dataIndex: 'question_id',
      key: 'question_id',
    },
    {
      title: '题目名',
      dataIndex: 'question_name',
      key: 'question_name',
    },
    {
      title: '题目类型',
      dataIndex: 'question_type',
      key: 'question_type',
      render(_: any, record: any) {
        return record.question_type == '01' ? '单选题' : '多选题'
      },
    },
    {
      title: '题目标签',
      dataIndex: 'tag_name',
      key: 'tag_name',
    },
    {
      title: '题目答案',
      dataIndex: 'answers',
      key: 'answers',
      render(_: any, record: any) {
        const answerRights = record.answer_rights.split('|')
        return record.answer_options
          .split('|')
          .map((option: any, index: number) => (
            <div key={index}>
              {option}
              &nbsp;
              {answerRights[index] == 1 ? '✅' : ''}
            </div>
          ))
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <>
          <EditOutlined
            className="co-mr5"
            onClick={() => {
              onEdit(record)
            }}
          />
          <DeleteOutlined
            onClick={() => {
              onDel(record)
            }}
          />
        </>
      ),
    },
  ]
  return (
    <>
      <div className="inner_user">
        <Form className="inner_user-filter co-mt20">
          <Row>
            <Col span={5}>
              <Form.Item label="题目名">
                <Input
                  placeholder="支持模糊查询"
                  onChange={(e) => {
                    setFormData({
                      name: e.target.value,
                    })
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Button className="co-mr20" type="primary" onClick={getUserList}>
                查询
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  modal.current?.open()
                }}
              >
                新增
              </Button>
            </Col>
          </Row>
        </Form>
        <Table
          rowKey="group_id"
          className="inner_user-tabel co-mt20"
          pagination={pageData}
          columns={columns}
          dataSource={tableData}
          onChange={onPageChange}
        />
      </div>
      <AddQuestionDialog ref={modal} onSubmit={getUserList} />
    </>
  )
}

export default View
