import {PlusOutlined} from '@ant-design/icons'
import {Button, Divider, message, Modal} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import ProTable from '@ant-design/pro-table'
import {addPicture, deletePicture, queryPictures, updatePicture} from './service'
import {connect, history} from 'umi'

import CreateForm from "@/pages/picture/list/components/CreateForm";
import UpdateForm from "@/pages/picture/list/components/UpdateForm";
import Model from "@/pages/picture/list/model";

const NONE_FUNCTION = () => {
}

const PictureList = (props) => {
  const [createModalVisible, handleModalVisible] = useState(false)
  const [updateModalVisible, handleUpdateModalVisible] = useState(false)
  const [current, setCurrent] = useState(undefined)

  const actionRef = useRef()
  useEffect(() => {
    props.dispatch({
      type: Model.type.FETCH_PICTURES
    })
  }, [])

  const handleAdd = async (fields) => {
    try {
      await addPicture({...fields})
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
      await updatePicture({...current, ...fields})
      message.success('更新成功')
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
      await deletePicture(id)
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
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '章节',
      dataIndex: 'chapter',
      key: 'chapter',
      renderFormItem: NONE_FUNCTION
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      renderFormItem: NONE_FUNCTION
    },
    {
      title: '标注个数',
      dataIndex: 'labels',
      key: 'labels',
      renderFormItem: NONE_FUNCTION,
      render: (labels, record) => {
        return <span>{labels.length}</span>
      }
    },
    {
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
          <Divider type='vertical'/>
          <a onClick={() => history.push(`/picture/${record.id}/mark`)}>标注</a>
          <Divider type='vertical'/>
          <a onClick={() => {
            Modal.confirm({
              title: '提示',
              content: '确定删除？',
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
        headerTitle='图片列表'
        actionRef={actionRef}
        toolbar={{multipleLine: false}}
        rowKey='key'
        toolBarRender={() => [
          <Button type='primary' onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 添加图片
          </Button>
        ]}
        request={(params, sorter, filter) =>
          queryPictures({...params, size: params.pageSize, sorter, filter})}
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
export default connect(({pictureCenter}) => ({
  pictureCenter
}))(PictureList)
