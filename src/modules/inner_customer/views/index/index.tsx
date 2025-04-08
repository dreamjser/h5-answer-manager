import React, { useRef, useState, useEffect } from 'react'
import { Col, Row, Form, Input, Button, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AddCustomerDialog from '../../components/add_customer_dialog'
import { getCustomerListOpts, deleteCustomerOpts } from '@/common/api/customer'

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
    await App.interface.confirm('确定删除该客户?')

    await App.request({
      ...deleteCustomerOpts,
      data: {
        id: item.customer_id,
      },
    })

    App.interface.toast('删除成功')
    getCustomerList()
  }

  function getCustomerList() {
    App.request({
      ...getCustomerListOpts,
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

  function onSearch() {
    if (pageData.current === 1) {
      getCustomerList()
    } else {
      setPageData({
        ...pageData,
        current: 1,
      })
    }
  }

  function onPageChange(page: any) {
    setPageData({
      ...page,
    })
  }

  useEffect(() => {
    getCustomerList()
  }, [pageData.current, pageData.pageSize])

  const columns = [
    {
      title: '客户ID',
      dataIndex: 'customer_id',
      key: 'customer_id',
    },
    {
      title: '客户名称',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
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
      <div className="inner_customer">
        <Form className="inner_customer-filter co-mt20">
          <Row>
            <Col span={5}>
              <Form.Item label="客户名称">
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
              <Button className="co-mr20" type="primary" onClick={onSearch}>
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
          rowKey="customer_id"
          className="inner_customer-table co-mt20"
          pagination={pageData}
          columns={columns}
          dataSource={tableData}
          onChange={onPageChange}
        />
      </div>
      <AddCustomerDialog ref={modal} onSubmit={getCustomerList} />
    </>
  )
}

export default View
