import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Divider, Table} from 'antd'
import {addClassCourse, editClassCourse, getClassCourses} from '../../../action/class-course-action'
import NewClassCourseModal from "./new-class-course-modal"
import EditClassCourseModal from './edit-class-course-modal'
import ClassCourseBindPaperBox from "./classCourse-bind-paper-Box";
import {getPapers} from "../../../action/paper-action";

class ClassCourseManagementBody extends Component {
  state = {
    currentPage: 1,
    isNewModalOpen: false,
    isEditModalOpen: false,
    isBindPaperModalOpen: false,
    classCourse: {papers: []}
  }

  componentDidMount = () => {
    this.props.getClassCourses(this.state.currentPage)
    this.props.getPapers()
  }

  getClassCourse = (pagination) => {
    const {current} = pagination
    this.setState({currentPage: current}, () => {
      this.props.getClassCourses(current)

    })
  }

  updatePapers = (papers) => {
    const {classCourse} = this.state
    classCourse.papers = papers
    this.setState({classCourse})
  }

  render() {
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
        title: '试卷数量',
        dataIndex: 'papers',
        key: 'papers',
        render: (papers) => {
          return <span>{papers.length}</span>
        }
      }, {
        title: '截止时间',
        dataIndex: 'endTime',
        key: 'endTime'
      }, {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, classCourse) => {
          return <div>
            <a onClick={() => this.setState({isEditModalOpen: true, classCourse})}>编辑</a>
            <Divider type='vertical'/>
            <a onClick={() => this.setState({isBindPaperModalOpen: true, classCourse})}>绑定试卷</a>
          </div>
        }
      }
    ]
    const {classCoursesPageable, papers} = this.props
    const {totalElements, content} = classCoursesPageable
    const {currentPage, isNewModalOpen, isEditModalOpen, classCourse, isBindPaperModalOpen} = this.state

    return <div>
      <p><Button
        type="primary"
        onClick={() => this.setState({isNewModalOpen: true})}>
        添加班课
      </Button></p>

      <NewClassCourseModal
        isNewModalOpen={isNewModalOpen}
        closeModal={() => this.setState({isNewModalOpen: false})}
        addClassCourse={this.props.addClassCourse}
      />
      <EditClassCourseModal
        isNewModalOpen={isEditModalOpen}
        closeModal={() => this.setState({isEditModalOpen: false})}
        editClassCourse={this.props.editClassCourse}
        classCourse={classCourse}
      />
      <ClassCourseBindPaperBox
        visible={isBindPaperModalOpen}
        classCourse={classCourse}
        papers={papers}
        updatePapers={this.updatePapers}
        editClassCourse={this.props.editClassCourse}
        closeModal={() => this.setState({isBindPaperModalOpen: false})}
      />
      <Table
        bordered
        columns={columns}
        dataSource={content}
        rowKey='id'
        onChange={(pagination) => this.getClassCourse(pagination)}
        pagination={{
          defaultCurrent: currentPage,
          total: totalElements
        }}/>
    </div>
  }
}

const mapStateToProps = ({user, classCoursesPageable, papers}) => ({
  user,
  classCoursesPageable,
  papers
})

const mapDispatchToProps = dispatch => ({
  getClassCourses: (current) => dispatch(getClassCourses(current)),
  addClassCourse: (classCourse, callback) => dispatch(addClassCourse(classCourse, callback)),
  editClassCourse: (classCourse, callback) => dispatch(editClassCourse(classCourse, callback)),
  getPapers: () => dispatch(getPapers())
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassCourseManagementBody)
