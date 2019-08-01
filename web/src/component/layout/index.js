import React, {Component} from 'react'
import {Col, Dropdown, Icon, Layout, Menu, Row} from 'antd'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import routers from '../../constant/routers'
import MenusBody from "../menus-body";

const {Header, Content, Sider} = Layout

const initMenu = () => {
  const {pathname} = window.location
  if (pathname.includes('roles')) {
    return 'admin'
  }
  if (pathname.includes('teachers')) {
    return 'teachers'
  }
  return 'students'
}
class OjLayout extends Component {

  state = {
    menu: initMenu()
  }

  componentWillReceiveProps = (nextProps) => {

    const {user} = nextProps
    if (this.props.user === user) {
      return false
    }

    if (this.hasRole('学生',user)) {
      this.setState({menu:'students'})
      return
    }
    if (this.hasRole('教师',user)) {
      this.setState({menu:'teachers'})
      return
    }
    if (this.hasRole('管理员',user)) {
      this.props.history.push('/roles')
    }
  }

  isLogin = () => {
    return this.props.user.id > 0
  }

  logout = () => {
    window.localStorage.removeItem('oToken')
    this.props.history.push('/login')
  }

  to = (menu,url) => {
    this.setState({menu})
    this.props.history.push(url)
  }

  hasRole = (role,currentUser) => {
    const user = currentUser || this.props.user
    return user.roles.map(role => role.roleName).includes(role)
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
  isMenuPage = () => {
    return ['/','/students','/teachers'].some(item => item === window.location.pathname)
  }

  render() {
    const {user} = this.props
    const {menu} = this.state
    const menus = (
      <Menu>
        <Menu.Item>
          <a onClick={this.logout}>退出</a>
        </Menu.Item>
      </Menu>

    );

    return (
      <Layout style={{height: '100%'}}>
        {
          this.isLogin() ?
            <Header>
              <Row>
                <Col span={4}>
                  <a href=''>DRVS在线考试系统</a>
                </Col>
                {
                  this.isLogin() ?

                    <Col span={16}>
                      <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[menu]}
                        style={{lineHeight: '64px'}}
                      >
                        {
                          this.hasRole('学生') ?
                            <Menu.Item key="students" onClick={() => this.to('students','/students')}>
                              学生端
                            </Menu.Item>
                            : ''
                        }
                        {this.hasRole('教师') ?
                          <Menu.Item key="teachers" onClick={() => this.to('teachers','/teachers')}>
                            教师端
                          </Menu.Item>
                          : ''
                        }
                        {this.hasRole('管理员') ?
                          <Menu.Item key="admin" onClick={() => this.to('admin','/roles')}>
                            角色管理
                          </Menu.Item> : ''
                        }
                      </Menu>

                    </Col>
                    : ''
                }
                {
                  this.isLogin() ?
                    <Col span={4}>
                      <Dropdown overlay={menus}>
                        <a className="ant-dropdown-link" href="#">
                          欢迎，{user.name} <Icon type="down"/>
                        </a>
                      </Dropdown>
                    </Col>
                    : ''
                }

              </Row>
            </Header> : ''
        }
        {
          this.isMenuPage() ?
              <MenusBody
                menu={menu}/>
            : <Content style={{padding: '10px'}}>
            {
              this.isLogin() ?
                <Layout style={{padding: '24px 0', background: '#fff', height: '100%'}}>
                  <Content style={{padding: '0 15px', minHeight: 280}}>
                    {this.props.children}
                  </Content>
                </Layout> :
                <Layout style={{padding: '0px', background: '#fff', height: '100%'}}>
                  {
                    this.isLogin() ?
                      <Sider width={180} style={{background: '#fff'}}>
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
                  <Content style={{padding: '0px', minHeight: 280}}>
                    {this.props.children}
                  </Content>
                </Layout>
            }
          </Content>
        }

      </Layout>
    )
  }
}

const mapStateToProps = ({user}) => ({user})
const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OjLayout))
