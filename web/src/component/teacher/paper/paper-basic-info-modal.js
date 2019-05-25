import React from 'react'
import {Input, Form, DatePicker, TimePicker} from 'antd'
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
      label='试卷名称'>
      <DatePicker value={typeof paper.endTime === 'string'
          ? moment(paper.endTime, 'YYYY-MM-DD HH:mm:ss')
        : paper.endTime}
        showTime
        format='YYYY-MM-DD HH:mm:ss'
        onChange={time => updatePaper('endTime', time)}
      />
    </Form.Item>
    <Form.Item
      {...formItemLayout}
      label='答卷时间'>
      <Input style={{width: 200}} type='number' value={paper.timeBox}
        onChange={e => updatePaper('timeBox', e.target.value)} />
    </Form.Item>

  </div>
}

export default PaperBasicInfoModal
