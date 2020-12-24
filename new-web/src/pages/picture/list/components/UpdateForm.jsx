import React, {useEffect} from 'react'
import {Form, Modal} from 'antd'
import ProForm, {ProFormSelect, ProFormText} from '@ant-design/pro-form'

const UpdateForm = (props) => {
  const [form] = Form.useForm()

  const { modalVisible, current, onCancel, updateUser, rolesMenu } = props
  useEffect(() => {
    if (form && !modalVisible) {
      form.resetFields()
    }
  }, [props.visible])

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        roles: current.roles.map(role => role.key)
      })
    }
  }, [props.current])

  return (
    <Modal
      destroyOnClose
      title='编辑用户'
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        name='validate_user_create'
        onValuesChange={(_, values) => {
        }}
        form={form}
        onFinish={async (value) => updateUser(value)}
      >
        <ProFormText width='m' name='username' rules={[{
          required: true,
          message: '请输入用户名!'
        }]} label='用户名' />
        <ProFormText width='m' name='name' label='真实姓名' />
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
        /><ProFormText
          name='email'
          width='m'
          label='邮箱'
          placeholder='请输入邮箱'
          rules={[
            {
              required: true,
              message: '请输入邮箱!'
            }
          ]}
      />
        <ProFormSelect
          name='roles'
          label='角色'
          width='m'
          valueEnum={rolesMenu}
          fieldProps={{
            mode: 'multiple'
          }}
          rules={[{required: true, message: '请选择角色'}]}
        />
      </ProForm>
    </Modal>
  )
}

export default UpdateForm
