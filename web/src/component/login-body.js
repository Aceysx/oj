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
    const bgGround={
      display:'flex',
      height: '100%',
      width:'100%',
      padding: '0px',
      background: `url(${require("./picture_login/背景.png")})`,
      alignItems : 'center',
      justifyContent : 'center',
      backgroundSize :'cover',
    }
    const smallGround = {
      background:'#FFFFFF',
      backgroundColor:'rgba(255,255,255,0.8)',
      width:'500px',
      height:'330px',
      borderRadius:'15px',
    }
    const username = {
      width : '300px',
      borderRadius:'7px',
    }
    return (
      <span style={bgGround}>
        <div style={smallGround}>
         <img src={require('./picture_login/DRVS在线考试系统.png')}
              style={{paddingBottom:'20px',paddingLeft:'90px',marginTop:'30px'}}/>
          <img src={require('./picture_login/下划线.png')} style={{backgroundColor :'#DDDDDD'}}
             />
        <div style={{paddingLeft:'95px',paddingTop:'30px'}}>
          <Form onSubmit={this.handleSubmit} className="login-form" >
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{required: true, message: '请输入用户名'}],
              })
              (
                <Input style={username} prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)',borderRadius:'7px'}}/>}
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
             <Button type="primary" style={{borderRadius:'15',width:'300px'}} htmlType="submit" className="login-form-button">
              登录
            </Button>
            </Form>
      </div>
        </div>
      </span>
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