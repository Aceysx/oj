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

class NewUserModal extends React.Component {

  state = {
    roleList: []
  }

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

  componentWillReceiveProps = (nextProps) => {
    const {roleList} = nextProps
    this.setState({roleList: roleList})
  }

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
            label="密码"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码',
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
                required: true, message: '只能输入数字',
                pattern: /^[0-9]+$/
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
                  this.state.roleList.map(item => <Option key={item.id.toString()}>{item.roleName}</Option>)
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
