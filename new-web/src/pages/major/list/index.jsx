import {PlusOutlined} from '@ant-design/icons'
import {Button, Divider, message, Modal} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import ProTable from '@ant-design/pro-table'
import CreateForm from './components/CreateForm'
import {addMajor, fetchMajors, updateMajor,deleteMajor} from './service'
import {connect} from 'umi'
import Model from '@/pages/role/list/model'
import UpdateForm from './components/UpdateForm'

const NONE_FUNCTION = () => {
}
const MajorList = (props) => {
  const [createModalVisible, handleModalVisible] = useState(false)
  const [updateModalVisible, handleUpdateModalVisible] = useState(false)
  const [current, setCurrent] = useState(undefined)

  const actionRef = useRef()
  useEffect(() => {
    props.dispatch({
      type: Model.type.FETCH_ROLES
    })
  }, [])

  const handleAdd = async (fields) => {
    try {
      await addMajor({...fields})
      message.success('添加成功')
      handleModalVisible(false)
      actionRef.current.reload()
      return true
    } catch (error) {
      message.error(error)
      return false
    }
  }

  const handleUpdate = async (fields) => {
    try {
      await updateMajor({...current, ...fields})
      message.success('添加成功')
      handleUpdateModalVisible(false)
      actionRef.current.reload()
      return true
    } catch (error) {
      message.error(error)
      return false
    }
  }
  const handleDelete = async (id) => {
    try {
      await deleteMajor(id)
      message.success('删除成功')
      actionRef.current.reload()
      return true
    } catch (error) {
      message.error(error)
      return false
    }
  }
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      renderFormItem: NONE_FUNCTION
    }, {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      renderFormItem: NONE_FUNCTION,
      render: (text, record) => {
        return <div>
          <a onClick={() => {
            handleUpdateModalVisible(true)
            setCurrent(record)
          }}>编辑</a>
          <Divider type={'vertical'}/>
          <a onClick={() => {
            Modal.confirm({
              title: '提示',
              content: '确定删除该？',
              okText: '确认',
              cancelText: '取消',
              onOk: () => handleDelete(record.id),
            });
          }}>删除</a>
        </div>
      }
    }
  ]

  return (
    <div>
      <ProTable
        headerTitle='课程名称列表'
        actionRef={actionRef}
        toolbar={{multipleLine: false}}
        rowKey='key'
        search={false}
        toolBarRender={() => [
          <Button type='primary' onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建
          </Button>
        ]}
        request={(params, sorter, filter) =>
          fetchMajors({...params, sorter, filter})}
        columns={columns}
      />

      <CreateForm onCancel={() => handleModalVisible(false)}
                  modalVisible={createModalVisible}
                  handleAdd={handleAdd}/>

      <UpdateForm onCancel={() => handleUpdateModalVisible(false)}
                  modalVisible={updateModalVisible}
                  handleUpdate={handleUpdate}
                  current={current}/>

    </div>
  )
}
export default connect(({majorCenter}) => ({
  majorCenter
}))(MajorList)
