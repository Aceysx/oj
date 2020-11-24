import React from 'react'
import {Button, Col, Form, Input, Modal, Row, Select} from 'antd'
import {message} from "antd/lib/index"

const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};

const Name = (rule, value, callback) => {
  if (value) {
    if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
      callback(new Error('只可输中文!'))
    }
  }
  callback()
}

const Phone = (rule, value, callback) => {
  if (value) {
    if (!/^[0-9]+$/.test(value)) {
      callback(new Error('只可输入数字!'))
    }
  }
  callback()
}


class NewUserModal extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.roles = values.roles.join(",");
        this.props.addUser(values, () => {
          message.success('添加成功');
          this.props.closeModal()
        })
      }
    })
  };

  render() {
    const {isNewModalOpen, closeModal, form} = this.props;
    const {getFieldDecorator} = form;

    return <div>
      <Modal
        title='添加用户'
        visible={isNewModalOpen}
        footer={null}
        onCancel={() => closeModal()}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="用户名"
          >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: '请输入用户名',
              }, {
                min: 3,
                message: '用户名最少为3位'
              }
              ],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="密码"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码',
              }, {
                min: 6,
                message: '密码最少为6位'
              }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item{...formItemLayout} label="真实姓名">
            {getFieldDecorator('name', {
              rules: [
                {required: true, message: '姓名不能为空'},
                {validator: Name, trigger: 'blur'}
              ],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="手机号"
          >
            {getFieldDecorator('phone', {
              rules: [
                {required: true, message: '手机号不能为空'},
                {validator: Phone, trigger: 'blur'},
                {
                  min: 11, max: 11,
                  message: '手机号为11位'
                }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="邮箱"
          >
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: '邮箱格式不正确',
                pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
              }],
            })(
              <Input/>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="用户角色"
          >
            {getFieldDecorator('roles', {
              rules: [{
                required: true, message: '请选择用户角色',
              }],
            })(
              <Select
                mode="multiple"
                placeholder="请选择用户角色"
              >
                {
                  this.props.roles.map(item => <Option key={item.key}>{item.name}</Option>)
                }
              </Select>
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

const NewUserModalForm = Form.create()(NewUserModal);

export default NewUserModalForm
