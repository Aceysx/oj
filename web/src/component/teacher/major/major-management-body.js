import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Divider, Table } from 'antd'
import {getMajorsByPage,deleteMajor, addMajor, putMajor} from '../../../action/major-action'
import NewMajorModal from "./new-major-modal"
import EditMajorModal from './edit-major-modal'
import { deleteCource } from '../../../action/class-course-action'


class MajorManagementBody extends Component {
  state = {
    currentPage: 1,
    isNewModalOpen: false,
    isEditModalOpen: false,
    major: {}
  }

  componentDidMount = () => {
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
            <Divider type='vertical'/>
            <a onClick={() => this.props.deleteMajor(record.id)}>删除</a>
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
          添加课程名称
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
  addMajor: (major, callback) => dispatch(addMajor(major, callback)),
  deleteMajor: id => dispatch(deleteMajor(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MajorManagementBody)