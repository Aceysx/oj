import React, {Component} from 'react'
import {Col, Layout, Menu, Row} from 'antd'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

const {Header, Content, Footer, Sider} = Layout

class OjLayout extends Component {

  render() {
    return (
      <Layout>
        <Header>
          <Row>
            <Col span={4}>
              <a href=''>
                Oj在线系统
              </a>
            </Col>
            <Col span={16}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{lineHeight: '64px'}}
              >
                <Menu.Item key="1">学生端</Menu.Item>
                <Menu.Item key="2">教师端</Menu.Item>
                <Menu.Item key="3">角色管理</Menu.Item>
              </Menu>
            </Col>
            <Col span={4}>
              <font style={{color: 'white'}}>个人头像</font>
            </Col>
          </Row>
        </Header>
        <Content style={{padding: '50px 50px 0 50px'}}>
          <Layout style={{padding: '24px 0', background: '#fff'}}>
            <Sider width={200} style={{background: '#fff'}}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{height: '100%'}}
              >
                <Menu.Item key="1">
                  <Link to='/'>
                    首页
                  </Link>
                </Menu.Item>

                <Menu.Item key="2">
                  <Link to='/students/class-courses'>
                    我的班课
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{padding: '0 24px', minHeight: 280}}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          Platform ©2017
        </Footer>
      </Layout>
    )
  }
}

const mapStateToProps = ({user}) => ({user})
const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OjLayout))
