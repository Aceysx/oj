import React from 'react'
import {Button, Col, DatePicker, Form, Input, message, Modal, Row} from 'antd'

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

class AddClassCourseModal extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const {form} = this.props
    form.validateFieldsAndScroll((err, values) => {
      this.props.addClassCourse(values.code, () => {
        form.setFieldsValue({code: ''})

        message.success('添加成功')
        this.props.closeModal()
      })
    })
  }

  render() {
    const {isAddModalOpen, closeModal, form} = this.props
    const {getFieldDecorator} = form

    return <div>
      <Modal
        title='加入班课'
        visible={isAddModalOpen}
        footer={null}
        onCancel={closeModal}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="班课code"
          >
            {getFieldDecorator('code', {
              rules: [{
                required: true, message: '请输入班课名称',
              }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Row type='flex' align='middle'>
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

const AddClassCourseModalForm = Form.create()(AddClassCourseModal)

export default AddClassCourseModalForm
