import React, {useEffect} from 'react'
import {Form, Modal} from 'antd'
import ProForm, {ProFormText} from '@ant-design/pro-form'

const UpdateForm = (props) => {
  const [form] = Form.useForm()

  const {modalVisible, current, onCancel, handleUpdate} = props
  useEffect(() => {
    if (form && !modalVisible) {
      form.resetFields()
    }
  }, [props.visible])

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current
      })
    }
  }, [props.current])

  return (
    <Modal
      destroyOnClose
      title='编辑'
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        name='validate_update'
        form={form}
        onFinish={async (value) => handleUpdate(value)}
      >
        <ProFormText width='m' name='name' rules={[{
          required: true,
          message: '请输入课程名称!'
        }]} label='课程名称'/>
      </ProForm>
    </Modal>
  )
}

export default UpdateForm
