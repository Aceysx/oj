import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Table} from 'antd'
import {getUsersByPage, addUser, putUser, getRolePageable} from '../../action/user'
import NewUserModal from './new-user-modal'
import EditUserModal from './edit-user-modal'

class UserBody extends Component {
  state = {
    currentPage: 1,
    isNewModalOpen: false,
    isEditModalOpen: false,
    user: {},
    roles: []
  }

  componentDidMount = () => {
    this.props.getUsers(this.state.currentPage)
    this.props.getRoles()
  }

  getUsers = (pagination) => {
    const {current} = pagination
    this.setState({currentPage: current}, () => {
      this.props.getUsers(current)
    })
  }

  getRoles = () => {
    this.setState(() => {
      this.props.getRoles()
    })
  }

  render () {
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: '添加时间',
        dataIndex: 'createTime',
        key: 'createTime'
      },
      {
        title: '真实姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => {
          return <div>
            <a onClick={() => this.setState({isEditModalOpen: true, user: record})}>编辑</a>
          </div>
        }

      }
    ]

    const {userPageable, rolePageable} = this.props
    console.log(this.props)
    const {totalElements, content} = userPageable
    const {currentPage, isNewModalOpen, isEditModalOpen, user} = this.state

    return <div >
           <p>
            <Button
              type="primary"
              onClick={() => this.setState({isNewModalOpen: true})}
            >
              添加用户
            </Button>
          </p>
          <NewUserModal
            isNewModalOpen={isNewModalOpen}
            closeModal={() => this.setState({isNewModalOpen:false})}
            roleList = {rolePageable.content}
            addUser={this.props.addUser}
          />
          <EditUserModal
            isEditModalOpen = {isEditModalOpen}
            closeModal={() => this.setState({isEditModalOpen: false})}
            user = {user}
            roleList = {rolePageable.content}
            putUser = {this.props.putUser}
          />
          <Table
            bordered
            columns={columns}
            dataSource={content}
            rowKey='id'
            onChange={(pagination) => this.getUsers(pagination)}
            pagination={{
              defaultCurrent: currentPage,
              total: totalElements
            }}
          />
        </div>
  }
}

const mapStateToProps = ({user, userPageable, rolePageable}) => ({
  user,
  userPageable,
  rolePageable
})

const mapDispatchToProps = dispatch => ({
  getUsers: (current) => dispatch(getUsersByPage(current)),
  addUser: (user, callback) => dispatch(addUser(user, callback)),
  putUser: (user, callback) => dispatch(putUser(user, callback)),
  getRoles: () => dispatch(getRolePageable())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserBody)
