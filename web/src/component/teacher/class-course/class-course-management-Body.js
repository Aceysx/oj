import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Divider, Table} from 'antd'
import {addClassCourse, editClassCourse, getClassCourses} from '../../../action/class-course-action'
import NewClassCourseModal from "./new-class-course-modal"
import EditClassCourseModal from './edit-class-course-modal'

class ClassCourseManagementBody extends Component {
  state = {
    currentPage: 1,
    isNewModalOpen: false,
    isEditModalOpen: false,
    classCourse: {}
  }

  componentDidMount = () =>{
    this.props.getClassCourses(this.state.currentPage)
  }

  getClassCourse = (pagination) => {
    const {current} = pagination
    this.setState({currentPage: current}, () => {
      this.props.getClassCourses(current)

    })
  }
  render () {
    const columns = [
      {
        title: '名称',
        dataIndex: 'title',
        key: 'title'
      }, {
        title: '口令',
        dataIndex: 'code',
        key: 'code'
      }, {
        title: '截止时间',
        dataIndex: 'endTime',
        key: 'endTime'
      }, {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => {
          return <div>
            <a onClick={() => this.setState({isEditModalOpen: true, classCourse: record})}>编辑</a>
            <Divider type='vertical' />
            <a>绑定试卷</a>
          </div>
        }
      }
    ]
    const {classCoursesPageable} = this.props
    const {totalElements, content} = classCoursesPageable
    const {currentPage, isNewModalOpen, isEditModalOpen, classCourse} = this.state

    return <div >
      <p><Button
        type="primary"
        onClick={()=>this.setState({isNewModalOpen:true})}>
        添加班课
      </Button></p>

      <NewClassCourseModal
        isNewModalOpen={isNewModalOpen}
        closeModal={() => this.setState({isNewModalOpen:false})}
        addClassCourse={this.props.addClassCourse}
      />
      <EditClassCourseModal
        isNewModalOpen={isEditModalOpen}
        closeModal={() => this.setState({isEditModalOpen:false})}
        editClassCourse={this.props.editClassCourse}
        classCourse={classCourse}
      />

      <Table
        bordered
        columns={columns}
        dataSource={content}
        rowKey='id'
        onChange={(pagination) => this.getClassCourse(pagination)}
        pagination={{
          defaultCurrent : currentPage,
          total: totalElements
        }}/>
    </div>
  }
}

const mapStateToProps = ({user, classCoursesPageable}) => ({
  user,
  classCoursesPageable
})

const mapDispatchToProps = dispatch => ({
  getClassCourses: (current) => dispatch(getClassCourses(current)),
  addClassCourse: (classCourse, callback) => dispatch(addClassCourse(classCourse, callback)),
  editClassCourse: (classCourse, callback) => dispatch(editClassCourse(classCourse, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassCourseManagementBody)
