import React from 'react'
import {Modal} from 'antd'
import ProForm, {ProFormText} from '@ant-design/pro-form'

const CreateForm = (props) => {
  const {modalVisible, onCancel, handleAdd} = props
  return (
    <Modal
      destroyOnClose
      title='新建'
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        name='validate_create'
        onFinish={async (value) => handleAdd(value)}
      >
        <ProFormText width='m' name='name' rules={[{
          required: true,
          message: '请输入课程名称!'
        }]} label='课程名称'/>
      </ProForm>
    </Modal>
  )
}

export default CreateForm
