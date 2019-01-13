import React from 'react'
import {Row, Button, DatePicker, Col, Form, Input, Modal} from 'antd'
import {message} from "antd/lib/index";

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
}

class NewClassCourseModal extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addClassCourse(values, () => {
          message.success('添加成功')
          this.props.closeModal()
        })
      }
    })
  }

  componentDidMount = () => {
    this.resetCode()
  }

  resetCode = () => {
    const {form} = this.props
    const code = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)

    form.setFieldsValue({code})
  }

  render() {
    const {isNewModalOpen, closeModal, form} = this.props
    const {getFieldDecorator} = form

    return <div>
      <Modal
        title='添加班课'
        visible={isNewModalOpen}
        footer={null}
        onCancel={() => closeModal()}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="班课名称"
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入班课名称',
              }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="口令"
          >
            {getFieldDecorator('code', {
              rules: [{
                required: true, message: '请输入班课口令',
              }],
            })(
              <Input disabled/>
            )}
            <a onClick={this.resetCode}>重置code</a>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="截止时间"
          >
            {getFieldDecorator('endTime', {
              rules: [{
                required: true, message: '请选择截止时间',
              }],
            })(
              <DatePicker/>
            )}
          </Form.Item>
          <Row type='flex' align='center'>
            <Col>
              <Button type="primary"
                      htmlType="submit">确定</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  }
}

const NewClassCourseModalForm = Form.create()(NewClassCourseModal)

export default NewClassCourseModalForm
