import {PlusOutlined} from '@ant-design/icons'
import {Button, message} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import ProTable from '@ant-design/pro-table'
import CreateForm from './components/CreateForm'
import {addRule, queryUsers, updateRule} from './service'
import {DownOutlined} from '@ant-design/icons/lib/icons'
import {connect} from 'umi'
import RoleModel from '@/pages/role/list/model'
import ProForm, {ProFormSelect, ProFormText} from '@ant-design/pro-form'

const NONE_FUNCTION = () => {
}
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加')

  try {
    await addRule({...fields})
    hide()
    message.success('添加成功')
    return true
  } catch (error) {
    hide()
    message.error('添加失败请重试！')
    return false
  }
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
  const [createModalVisible, handleModalVisible] = useState(false)
  const [updateModalVisible, handleUpdateModalVisible] = useState(false)
  const [stepFormValues, setStepFormValues] = useState({})
  const actionRef = useRef()

  useEffect(() => {
    props.dispatch({
      type: RoleModel.type.FETCH_ROLES
    })
  })
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      renderFormItem: NONE_FUNCTION
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
          <a onClick={() => this.setState({isEditModalOpen: true, user: record})}>编辑</a>
        </div>
      }
    }
  ]
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

      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProForm
          name='validate_user_create'
          onValuesChange={(_, values) => {
            console.log(values)
          }}
          onFinish={async (value) => console.log(value)}
        >
          <ProFormText width='m' name='name' rules={[{
            required: true,
            message: '请输入用户名!'
          }]} label='用户名' />
          <ProFormText width='m' name='password'
            rules={[{
              required: true,
              message: '请输入密码!'
            }]} label='密码' />
          <ProFormText width='m' name='realName'
            rules={[{
              required: true,
              message: '请输入密码!'
            }]}
            label='真实姓名' />
          <ProFormText
            name='phone'
            width='m'
            label='手机号'
            placeholder='请输入手机号'
            rules={[
              {
                required: true,
                message: '请输入手机号!'
              },
              {
                pattern: /^1\d{10}$/,
                message: '不合法的手机号格式!'
              }
            ]}
          />
          <ProFormSelect
            name='roles'
            label='角色'
            width='m'
            valueEnum={{
              red: 'Red',
              green: 'Green',
              blue: 'Blue'
            }}
            fieldProps={{
              mode: 'multiple'
            }}
          />
        </ProForm>
      </CreateForm>
    </div>
  )
}
export default connect(({roles}) => ({
  roles
}))(RoleList)
