import React from 'react'
import {Button, Col, Form, Icon, Input, Row} from 'antd'
import {login} from '../action/user'
import {connect} from 'react-redux'

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values, () => {
          this.props.history.push('/')
        })
      }
    });
  }

  componentDidMount = () => {
    const {form} = this.props
    form.setFieldsValue({username: 'admin', password: 'admin'})
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <Row type='flex' justify='center' style={{marginTop:'8%'}}>
        <Col>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{required: true, message: '请输入用户名'}],
              })(
                <Input style={{width: '300px'}} prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       placeholder="请输入用户名"/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码'}],
              })(
                <Input style={{width: '300px'}}
                       prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       type="password" placeholder="请输入密码"/>
              )}
            </Form.Item>
            <Button type="primary" style={{width: '300px'}} htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({user}) => ({
  user
})
const mapDispatchToProps = (dispatch) => ({
  login : (user, callback) => dispatch(login(user ,callback))
})


const LoginForm =  Form.create()(Login);
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)