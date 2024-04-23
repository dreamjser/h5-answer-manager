import React, { useRef, useState, useEffect } from 'react'
import { Col, Row, Form, Input, Button, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { getTagListOpts, deleteTagOpts } from '@/common/api/tag'
import AddTagDialog from '../../components/add_tag_dialog'

const View = () => {
  const modal: any = useRef(null)
  const [tableData, setTableData] = useState<any>([])
  const [formData, setFormData] = useState({
    name: '',
  })

  function onEdit(item: any) {
    modal.current?.open(item)
  }

  async function onDel(item: any) {
    await App.interface.confirm('确定删除该题标签?')

    await App.request({
      ...deleteTagOpts,
      data: {
        id: item.id,
      },
    })

    App.interface.toast('删除成功')

    getTagList()
  }

  function getTagList() {
    App.request({
      ...getTagListOpts,
      data: formData,
    }).then((r: any) => {
      setTableData(r)
    })
  }

  useEffect(() => {
    getTagList()
  }, [])

  const columns = [
    {
      title: '标签id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标签名',
      dataIndex: 'tag_name',
      key: 'tag_name',
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
              <Form.Item label="标签名">
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
              <Button className="co-mr20" type="primary" onClick={getTagList}>
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
          rowKey="id"
          className="inner_user-tabel co-mt20"
          columns={columns}
          pagination={false}
          dataSource={tableData}
        />
      </div>
      <AddTagDialog ref={modal} onSubmit={getTagList} />
    </>
  )
}

export default View
