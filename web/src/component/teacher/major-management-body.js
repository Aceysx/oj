import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Button, Table} from 'antd'
import {getMajorsByPage, addMajor, putMajor} from '../../action/major-action'
import NewMajorModal from "./new-major-modal"
import EditMajorModal from './edit-major-modal'


class MajorManagementBody extends Component {
  state = {
    currentPage: 1,
    isNewModalOpen: false,
    isEditModalOpen: false,
    major: {}
  }

  componentDidMount () {
    this.props.getMajors(this.state.currentPage)
  }

  getMajors = (pagination) => {
    const {current} = pagination
    this.setState({currentPage: current}, () => {
      this.props.getMajors(current)
    })
  }

  putMajor = (pagination) => {
    const {current} = pagination
      this.setState({currentPage: current}, () => {
        this.props.putMajor(current)
      })
  }

  render () {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '添加时间',
        dataIndex: 'createTime',
        key: 'createTime'
      },
      {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => {
          return <div>
            <a onClick={() => this.setState({isEditModalOpen: true, major: record})}>编辑</a>
          </div>
        }

      }
    ]
    const {majorPageable} = this.props
    const {totalElements, content} = majorPageable
    const {currentPage, isNewModalOpen, isEditModalOpen, major} = this.state

    return <div>
      <p>
        <Button
          type="primary"
          onClick={() => this.setState({isNewModalOpen: true})}
        >
          添加专业
        </Button>
      </p>

      <NewMajorModal
        isNewModalOpen={isNewModalOpen}
        closeModal={() => this.setState({isNewModalOpen:false})}
        addMajor={this.props.addMajor}
      />

      <EditMajorModal
        isEditModalOpen = {isEditModalOpen}
        closeModal={() => this.setState({isEditModalOpen: false})}
        major = {major}
        putMajor = {this.props.putMajor}
      />

      <Table
        bordered
        columns={columns}
        dataSource={content}
        rowKey='id'
        onChange={(pagination) => this.getMajors(pagination)}
        pagination={{
          defaultCurrent: currentPage,
          total: totalElements
        }}
      />
    </div>
  }
}

const mapStateToProps = ({user, majorPageable}) => ({
  user,
  majorPageable
})

const mapDispatchToProps = dispatch => ({
  putMajor: (major, callback) => dispatch(putMajor(major, callback)),
  getMajors: (current) => dispatch(getMajorsByPage(current)),
  addMajor: (major, callback) => dispatch(addMajor(major, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(MajorManagementBody)