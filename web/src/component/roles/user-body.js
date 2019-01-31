import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Table} from 'antd'
import {getUsersByPage} from '../../action/user'

class UserBody extends Component {
  state = {
    currentPage: 1,
    isNewModalOpen: false,
    isEditModalOpen: false,
    user: {}
  }

  componentDidMount = () => {
    this.props.getUsers(this.state.currentPage)
  }

  getUsers = (pagination) => {
    const {current} = pagination
    this.setState({currentPage: current}, () => {
      this.props.getUsers(current)
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

    const {userPageable} = this.props
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

const mapStateToProps = ({user, userPageable}) => ({
  user,
  userPageable
})

const mapDispatchToProps = dispatch => ({
  getUsers: (current) => dispatch(getUsersByPage(current))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserBody)
