import React from 'react'
import {Row, Button, Col, Form, Input, Modal, Select} from 'antd'
import {message} from "antd/lib/index";
import moment from 'moment'

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
}

const Name =  (rule, value, callback) => {
  if (value) {
    if (!/^[\u4e00-\u9fa5]+$/.test(value)){
      callback(new Error('只可输中文!'))
    }
  }
  callback()
}

const Phone = (rule,value,callback) => {
  if(value) {
    if (!/^[0-9]+$/.test(value)){
      callback(new Error('只可输入数字!'))
    }
  }
  callback()
}

class EditUserModal extends React.Component {

  state = {
    id: -1,
    roles: [],
    roleList: []
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values['id'] = this.state.id
        values.roles = values.roles.map(role => {
            return {id:role}
        });
        this.props.putUser(values, () => {
          message.success('更新成功')
          this.props.closeModal()
        })
      }
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const {user, form, roleList} = nextProps
    if (user === this.props.user ) {
      return false
    }
    const {id, username, createTime, available, name, phone, email, roles} = user
    const roleIds = roles.map(item => item.id.toString())
    form.setFieldsValue({username, createTime: moment(createTime), available, name, phone, email, roles: roleIds})
    this.setState({id: id, roles : roleIds, roleList: roleList})
  }

  render() {
    const {isEditModalOpen, closeModal, form} = this.props
    const {getFieldDecorator} = form

    return <div>
      <Modal
        title='更新用户信息'
        visible={isEditModalOpen}
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
            },{
              min:3,
              message:'用户名最少为3位'
            }
            ],
          })(
            <Input/>
          )}
          </Form.Item>
          <Form.Item{...formItemLayout} label="真实姓名">
            {getFieldDecorator('name', {
              rules: [
                {required: true,message:'姓名不能为空'},
                {validator:Name,trigger:'blur'}
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
                {validator: Phone,trigger: 'blur'},
                {min:11,max:11,
                  message:'手机号为11位'}],
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
                      defaultVale={this.state.roles}
                    >
                      {
                        this.state.roleList.map(item => <Option key={item.id.toString()}>{item.roleName}</Option>)
                      }
                    </Select>
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

const EditUserModalForm = Form.create()(EditUserModal)

export default EditUserModalForm
