import React from 'react'
import {DatePicker, Form, Input} from 'antd'
import moment from 'moment'

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
const PaperBasicInfoModal = ({paper, updatePaper}) => {
  console.log(paper)
  return <div>
    <Form.Item
      {...formItemLayout}
      label='试卷名称'>
      <Input value={paper.title} onChange={e => updatePaper('title', e.target.value)} />
    </Form.Item>
    <Form.Item
      {...formItemLayout}
      label='截止时间'>
      {
        paper.id
        ? <Input value={paper.endTime} disabled />
        : <DatePicker value={paper.endTime}
          showTime
          format='YYYY-MM-DD HH:mm:ss'
          onChange={time => updatePaper('endTime', time)}
        />
      }
    </Form.Item>
    <Form.Item
      {...formItemLayout}
      label='答卷时间'>
      <Input style={{width: 200}}
        type='number' value={paper.timeBox}
        disabled={!!paper.id}
        onChange={e => updatePaper('timeBox', e.target.value)} />
    </Form.Item>

  </div>
}

export default PaperBasicInfoModal
