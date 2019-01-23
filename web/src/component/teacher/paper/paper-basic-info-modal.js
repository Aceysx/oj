import React from 'react'
import {Input, Form} from 'antd'
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14}
  }
}
const PaperBasicInfoModal = ({paper, onChangeHandle}) => {
  return <div>
    <Form.Item
      {...formItemLayout}
      label='试卷名称'
    >
      <Input value={paper.title} onChange={onChangeHandle} />
    </Form.Item>

  </div>
}

export default PaperBasicInfoModal
