import React, {useState} from 'react'
import {message, Modal, Upload} from 'antd'
import ProForm, {ProFormSelect, ProFormText, ProFormTextArea} from '@ant-design/pro-form'
import {LoadingOutlined, UploadOutlined} from '@ant-design/icons'
const ROOT_PATH = 'http://39.98.165.4:8004/ronhe-file-system/'
// const ROOT_PATH = 'http://localhost:3001/'

const CreateForm = (props) => {
  const [imageUrl, handleImageUrl] = useState('')
  const [loading, handleLoading] = useState(false)
  const {modalVisible, onCancel, handleAdd, rolesMenu} = props

  const beforeUpload = (file) => {
    const isJPG = file.type.includes('image')
    if (!isJPG) {
      message.error('You can only upload JPG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJPG && isLt2M
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      handleLoading(true)
      return
    }
    if (info.file.status === 'done') {
      handleImageUrl(ROOT_PATH + info.file.response.name)
      handleLoading(false)
    }
  }
  return (
    <Modal
      destroyOnClose
      title='新建图片'
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        name='validate_picture_create'
        onValuesChange={(_, values) => {
          console.log(values)
        }}
        onFinish={async (value) => handleAdd(value)}
      >
        <ProFormText width='m' name='username' rules={[{
          required: true,
          message: '请输入图片名称!'
        }]} label='图片名称' />
        <ProFormTextArea
          name='description'
          width='m'
          label='描述'
        />
        <ProFormSelect
          name='chapter'
          label='所属章节'
          width='m'
          valueEnum={rolesMenu}
          rules={[{required: true, message: '请选择章节'}]}
        />
        <Upload
          name='picture'
          listType='picture-card'
          className='avatar-uploader'
          showUploadList={false}
          action='http://116.62.230.75:8000/file-server/file/upload'
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img width={200} src={imageUrl} alt='avatar' /> : <div>

            {loading ? <LoadingOutlined /> : <UploadOutlined />}
            <div className='ant-upload-text'>上传图片</div>
          </div>}
        </Upload>
      </ProForm>
    </Modal>
  )
}

export default CreateForm
