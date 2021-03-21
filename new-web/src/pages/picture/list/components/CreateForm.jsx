import React, {useState} from 'react'
import {message, Modal, Upload} from 'antd'
import ProForm, {ProFormText} from '@ant-design/pro-form'
import {LoadingOutlined, UploadOutlined} from '@ant-design/icons'

const ROOT_PATH = 'http://localhost:8080/'

const CreateForm = (props) => {
  const [imageUrl, handleImageUrl] = useState('')
  const [loading, handleLoading] = useState(false)
  const {modalVisible, onCancel, handleAdd} = props

  const beforeUpload = (file) => {
    const isJPG = file.type.includes('image')
    if (!isJPG) {
      message.error('请上传图片')
    }
    const isLt10M = file.size / 1024 / 1024 < 10
    if (!isLt10M) {
      message.error('图片必须小于10MB')
    }
    return isJPG && isLt10M
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      handleLoading(true)
      return
    }
    if (info.file.status === 'done') {
      handleImageUrl(ROOT_PATH + info.file.response)
      handleLoading(false)
    }
  }
  return (
    <Modal
      destroyOnClose
      title='新建'
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        name='validate_picture_create'
        onValuesChange={(_, values) => {
          console.log(values)
        }}
        onFinish={async (values) => {
          if (!imageUrl) {
            message.warning('请上传图片')
            return
          }
          handleAdd({...values, url: imageUrl});
        }}
      >
        <ProFormText width='m' name='title' rules={[{
          required: true,
          message: '请输入图片名称!'
        }]} label='图片名称'/>
        <ProFormText width='m' name='chapter' rules={[{
          required: true,
          message: '请输入章节'
        }]} label='章节'/>
        <Upload
          name='file'
          listType='picture-card'
          className='avatar-uploader'
          showUploadList={false}
          action={'/api/uploader'}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img width={'100%'} src={imageUrl} alt='avatar'/> : <div>

            {loading ? <LoadingOutlined/> : <UploadOutlined/>}
            <div className='ant-upload-text'>上传图片</div>
          </div>}
        </Upload>
      </ProForm>
    </Modal>
  )
}

export default CreateForm
