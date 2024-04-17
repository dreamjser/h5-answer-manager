import React, { useRef, useState, useEffect } from 'react'
import { Col, Row, Form, Input, Button, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  getQuestionGroupListOpts,
  deleteQuestionGroupOpts,
} from '@/common/api/question_group'
import AddGroupDialog from '../../components/add_group_dialog'

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
    await App.interface.confirm('确定删除该题库?')

    await App.request({
      ...deleteQuestionGroupOpts,
      data: {
        id: item.group_id,
      },
    })

    App.interface.toast('删除成功')

    getGroupList()
  }

  function getGroupList() {
    App.request({
      ...getQuestionGroupListOpts,
      data: {
        ...formData,
        ...pageData,
      },
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
    getGroupList()
  }, [pageData.current, pageData.pageSize])

  const columns = [
    {
      title: '题库id',
      dataIndex: 'group_id',
      key: 'group_id',
    },
    {
      title: '题库名',
      dataIndex: 'group_name',
      key: 'group_name',
    },
    {
      title: '题库描述',
      dataIndex: 'group_desc',
      key: 'group_desc',
    },
    {
      title: '题库类型',
      dataIndex: 'group_type',
      key: 'group_type',
      render(_: any, record: any) {
        return record.group_type == '01' ? '官方题库' : '自定义题库'
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
              <Form.Item label="题库名">
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
              <Button className="co-mr20" type="primary" onClick={getGroupList}>
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
      <AddGroupDialog ref={modal} onSubmit={getGroupList} />
    </>
  )
}

export default View
