import React from 'react'
import {Form, Input} from 'antd'

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
    return <div>
        <Form.Item
            {...formItemLayout}
            label='试卷名称'>
            <Input value={paper.title} onChange={e => updatePaper('title', e.target.value)}/>
        </Form.Item>
    </div>
}

export default PaperBasicInfoModal
