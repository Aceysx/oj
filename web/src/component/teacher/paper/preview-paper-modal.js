import React from 'react'
import {Modal} from 'antd'
import Paper from '../../common/paper'

const PreviewPaperModal = ({paper, visible, onCancel}) => {
  return <Modal
    title='预览'
    visible={visible}
    footer={null}
    onCancel={onCancel} >
    <Paper paper={paper} />
  </Modal>
}

export default PreviewPaperModal
