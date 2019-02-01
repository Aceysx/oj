import React, {Component} from 'react'
import Paper from '../../common/paper'
import {Modal} from 'antd'

export default class AnswerPaperModal extends Component {
  render () {
    const {paper, visible, onCancel, onSubmit} = this.props
    return <Modal
      visible={visible}
      okText='提交'
      cancelText='取消'
      title='答题'
      onCancel={onCancel}
      onOk={onSubmit}>
      <Paper
        paper={paper}
      />
    </Modal>
  }
}
