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

class EditMajorModal extends React.Component {

  state = {
    id: -1,
    name: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values['id'] = this.state.id
        this.props.putMajor(values, () => {
          message.success('更新成功')
          this.props.closeModal()
        })
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const {major, form} = nextProps
    if (major === this.props.major ) {
      return false
    }
    const {id, name} = major
    form.setFieldsValue({name})
    this.setState({id, name})

  }

  render() {
    const {isEditModalOpen, closeModal, form} = this.props
    const {getFieldDecorator} = form

    return <div>
      <Modal
        title='更新课程名称'
        visible={isEditModalOpen}
        footer={null}
        onCancel={() => closeModal()}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="课程名称名称"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入课程名称名称',
              }],
            })(
              <Input/>
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

const EditMajorModalForm = Form.create()(EditMajorModal)

export default EditMajorModalForm
