import React from 'react'
import {Row, Button, Col, Form, Input, Modal, Select} from 'antd'
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

function handleChange(value) {
  console.log(`selected ${value}`);
}

class NewUserModal extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.roles = values.roles.map(role => {
          return {id:role}
        });
        this.props.addUser(values, () => {
          message.success('添加成功');
          this.props.closeModal()
        })
      }
    })
  };

  componentDidMount = () => {
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
              }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="真实姓名"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入用户真实姓名',
              }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="手机号"
          >
            {getFieldDecorator('phone', {
              rules: [{
                required: true, message: '请输入手机号',
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
                required: true, message: '请输入邮箱',
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
                onChange={handleChange}
              >
              <Option key='1'>管理员</Option>
              <Option key='2'>老师</Option>
              <Option key='3'>学生</Option>
              <Option key='4'>超级管理员</Option>
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
