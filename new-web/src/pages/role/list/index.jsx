import {PlusOutlined} from '@ant-design/icons'
import {Button, message} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import ProTable from '@ant-design/pro-table'
import CreateForm from './components/CreateForm'
import {addUser, queryUsers, updateRule, updateUser} from './service'
import {DownOutlined} from '@ant-design/icons/lib/icons'
import {connect} from 'umi'
import Model from '@/pages/role/list/model'
import ProForm, {ProFormSelect, ProFormText} from '@ant-design/pro-form'
import UpdateForm from '@/pages/role/list/components/UpdateForm'

const NONE_FUNCTION = () => {
}

/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置')

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key
    })
    hide()
    message.success('配置成功')
    return true
  } catch (error) {
    hide()
    message.error('配置失败请重试！')
    return false
  }
}

const RoleList = (props) => {
  const {roles = []} = props.roleCenter

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
    const hide = message.loading('正在添加')

    try {
      await addUser({...fields, roles: fields.roles ? fields.roles.join(',') : ''})
      hide()
      message.success('添加成功')
      handleModalVisible(false)
      actionRef.current.reload()
      return true
    } catch (error) {
      hide()
      message.error(error)
      return false
    }
  }

  const handleUpdate = async (fields) => {
    try {
      await updateUser({...current, ...fields, roles: fields.roles ? fields.roles.join(',') : ''})
      message.success('添加成功')
      handleUpdateModalVisible(false)
      actionRef.current.reload()
      return true
    } catch (error) {
      message.error(error)
      return false
    }
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '真实姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
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
        </div>
      }
    }
  ]
  let rolesMenu = {}
  roles.forEach(role => {
    rolesMenu[role.key] = role.name
  })

  return (
    <div>
      <ProTable
        headerTitle='用户列表'
        actionRef={actionRef}
        toolbar={{multipleLine: false}}
        rowKey='key'
        search={false}
        toolBarRender={() => [
          <Button key='out'>
            导入数据
            <DownOutlined />
          </Button>,
          <Button type='primary' onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>
        ]}
        request={(params, sorter, filter) =>
          queryUsers({...params, sorter, filter})}
        columns={columns}
      />

      <CreateForm onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        handleAdd={handleAdd}
        rolesMenu={rolesMenu} />

      <UpdateForm onCancel={() => handleUpdateModalVisible(false)}
        modalVisible={updateModalVisible}
        updateUser={handleUpdate}
        current={current}
        rolesMenu={rolesMenu} />

    </div>
  )
}
export default connect(({roleCenter}) => ({
  roleCenter
}))(RoleList)