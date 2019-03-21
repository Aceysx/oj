import React from 'react'
import {Button, Icon, message, Upload} from 'antd'

const ImportQuizModal = ({type, refreshQuizzes}) => {
  const checkFileFormat = file => {
    return file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
  }
  const action = `/api/quizzes/excel`

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
        message.success(`Quiz imported successfully.`)
        refreshQuizzes()
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

export default ImportQuizModal
