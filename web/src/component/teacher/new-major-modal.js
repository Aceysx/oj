import React from 'react'
import {Row, Button, Col, Form, Input, Modal} from 'antd'
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

class NewMajorModal extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addMajor(values, () => {
          message.success('添加成功')
          this.props.closeModal()
        })
      }
    })
  }

  componentDidMount = () => {
  }

  render() {
    const {isNewModalOpen, closeModal, form} = this.props
    const {getFieldDecorator} = form

    return <div>
      <Modal
        title='添加专业'
        visible={isNewModalOpen}
        footer={null}
        onCancel={() => closeModal()}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="专业名称"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入专业名称',
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

const NewMajorModalForm = Form.create()(NewMajorModal)

export default NewMajorModalForm
