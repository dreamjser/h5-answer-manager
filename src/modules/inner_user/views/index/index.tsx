import React, { useRef, useState, useEffect } from 'react'
import { Col, Row, Form, Input, Button, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { getUserListOpts, deleteUserOpts } from '@/common/api/user'
import AddUserDialog from '../../components/add_user_dialog'

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
    await App.interface.confirm('确定删除该用户?')

    await App.request({
      ...deleteUserOpts,
      data: {
        id: item.user_id,
      },
    })

    App.interface.toast('删除成功')

    getUserList()
  }

  function getUserList() {
    App.request({
      ...getUserListOpts,
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
    getUserList()
  }, [pageData.current, pageData.pageSize])

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
        <Form className="inner_user-filter co-mt20">
          <Row>
            <Col span={5}>
              <Form.Item label="用户名">
                <Input
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
          rowKey="user_id"
          className="inner_user-tabel co-mt20"
          pagination={pageData}
          columns={columns}
          dataSource={tableData}
          onChange={onPageChange}
        />
      </div>
      <AddUserDialog ref={modal} onSubmit={getUserList} />
    </>
  )
}

export default View
