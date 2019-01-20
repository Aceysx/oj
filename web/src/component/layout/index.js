import React, {Component} from 'react'
import {Col, Layout, Menu, Row, Dropdown, Icon} from 'antd'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import routers from '../../constant/routers'

const {Header, Content, Footer, Sider} = Layout


class OjLayout extends Component {
  state = {
    menu: this.props.user.role || 'students'
  }

  isLogin = () => {
    return this.props.user.id
  }

  to = (menu) => {
    this.setState({menu})
    this.props.history.push(routers[menu][0].url)
  }

  getSider = () => {
    const {menu} = this.state
    return routers[menu].map((item, index) =>
      <Menu.Item key={index + 1}>
        <Link to={item.url}>
          {item.title}
        </Link>
      </Menu.Item>
    )

  }

  render() {
    const {user} = this.props
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout style={{height: '100%'}}>
        <Header>
          <Row>
            <Col span={4}>
              <a href=''>Oj在线系统</a>
            </Col>
            {
              this.isLogin() ?

                <Col span={16}>
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{lineHeight: '64px'}}
                  >
                    <Menu.Item key="1" onClick={() => this.to('students')}>
                      学生端
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => this.to('teachers')}>
                      教师端
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => this.to('roles')}>
                      角色管理
                    </Menu.Item>
                  </Menu>
                </Col>
                : ''
            }
            {
              this.isLogin() ?
                <Col span={4}>
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                      欢迎，{user.name} <Icon type="down"/>
                    </a>
                  </Dropdown>
                </Col>
                :''
            }

          </Row>
        </Header>
        <Content style={{padding: '50px 50px 0 50px', height: '100%'}}>
          <Layout style={{padding: '24px 0', background: '#fff', height: '100%'}}>
            {
              this.isLogin()?
                <Sider width={200} style={{background: '#fff'}}>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{height: '100%'}}
                  >
                    {this.getSider()}
                  </Menu>
                </Sider>
                : ''
            }

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
