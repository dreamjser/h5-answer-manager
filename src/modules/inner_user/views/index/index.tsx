import React, { useRef, useState, useEffect } from 'react'
import { Col, Row, Form, Input, Button, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AddUserDialog from '@/modules/inner_user/components/add_user_dialog'

const View = () => {
  const modal: any = useRef(null)
  const [tableData, setTableData] = useState<any>([])

  function onEdit(item: any) {
    console.log(item)
  }

  function onDel(item: any) {
    console.log(item)
  }

  function onSubmit() {
    console.log(11)
  }

  useEffect(() => {
    setTableData([
      {
        user_id: '1001',
        user_name: 'syg',
        user_last_time: '2024-03-03 11:33:22',
      },
    ])
  }, [])

  const columns = [
    {
      title: '用户id',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: '用户名',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: '更新时间',
      dataIndex: 'user_last_time',
      key: 'user_last_time',
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
        <div className="inner_user-filter">
          <Form>
            <Row>
              <Col span={5}>
                <Form.Item label="用户名">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6} offset={1}>
                <Button className="co-mr10" type="primary">
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
        </div>
        <div className="inner_user-tabel">
          <Table columns={columns} dataSource={tableData} />
        </div>
      </div>
      <AddUserDialog ref={modal} onSubmit={onSubmit} />
    </>
  )
}

export default View
