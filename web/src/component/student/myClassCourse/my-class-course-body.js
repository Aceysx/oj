import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, message, Table, Tag} from 'antd'
import AddClassCourseModalForm from "./add-class-course-modal";
import {addMyClassCourse, getMyClassCourses} from "../../../action/class-course-action";
import {Link} from "react-router-dom";

class MyClassCourseBody extends Component {
  state = {
    currentPage: 1,
    isAddModalOpen: false,
  }

  componentDidMount = () => {
    this.props.getMyClassCourses(this.state.currentPage)
  }

  addClassCourse = (code) => {
    this.props.addClassCourse(code, () => {
      message.success('添加成功')
      this.setState({isAddModalOpen: false})
    })
  }

  expandedRowRender = (classCourse) => {
    const {papers} = classCourse
    const columns = [
        {title: '试卷名称', dataIndex: 'title', key: 'title'},
        {
          title: '题目个数',
          dataIndex: 'count',
          key: 'count',
          render: (text, record) => {
            return <span>{record.quizzes.length}</span>
          }
        }, {
          title: '状态', dataIndex: 'isFinish', key: 'isFinish',
          render: (status) => <div>
            {status ? <Tag color="#87d068">已完成</Tag>
              : <Tag>未完成</Tag>}
            </div>
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: (text, paper) => {
            return <span className="table-operation">
            <Link to={`/students/class-courses/${classCourse.id}/papers/${paper.id}/${paper.isFinish?'reviewQuiz':'answer'}`}>
              {paper.isFinish ? '查看' : '答题'}
            </Link>
          </span>
          }
          ,
        },
      ]
    ;

    return (
      <Table
        columns={columns}
        rowKey='id'
        dataSource={papers}
        pagination={false}
      />
    )
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
        key: 'endTime',
        render : (time) => {
          return <div>{time.split('T')[0]}</div>
        }
      }
    ]
    const {classCoursesPageable} = this.props
    const {totalElements, content} = classCoursesPageable
    const {currentPage, isAddModalOpen} = this.state
    return <div>
      <p><Button
        type='primary'
        onClick={() => this.setState({isAddModalOpen: true})}>
        加入班课
      </Button></p>

      <AddClassCourseModalForm
        isAddModalOpen={isAddModalOpen}
        closeModal={() => this.setState({isAddModalOpen: false})}
        addClassCourse={this.addClassCourse}
      />
      <Table
        bordered
        columns={columns}
        dataSource={content}
        rowKey='id'
        expandedRowRender={this.expandedRowRender}
        onChange={(pagination) => this.getClassCourse(pagination)}
        pagination={{
          defaultCurrent: currentPage,
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
  addClassCourse: (code, callback) => dispatch(addMyClassCourse(code, callback)),
  getMyClassCourses: (currentPage) => dispatch(getMyClassCourses(currentPage))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyClassCourseBody)
