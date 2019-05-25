import React from 'react'
import {Button, Icon, message, Upload} from 'antd'

const ImportModal = ({type, refresh}) => {
  const checkFileFormat = file => {
    return file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
  }
  const action = type === 'user'
    ? `/api/users/excel`
    : `/api/quizzes/excel`

  const props = {
    name: 'file',
    action,
    headers: {
      token: window.localStorage.getItem('oToken')
    },
    beforeUpload (file) {
      if (checkFileFormat(file)) {
        return true
      }
      message.error('error format')
      return false
    },
    onChange (info) {
      if (info.file.status === 'done') {
        message.success(`上传成功`)
        refresh()
      } else if (info.file.status === 'error') {
        message.error(info.file.response.message)
      }
    }
  }
  return <div>
    <Upload {...props}>
      <Button>
        <Icon type='upload' />
        Excel 导入
      </Button>
    </Upload>
  </div>
}

export default ImportModal
