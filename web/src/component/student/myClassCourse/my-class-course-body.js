import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, message, Table} from 'antd'
import AddClassCourseModalForm from "./add-class-course-modal";
import {addMyClassCourse, getMyClassCourses} from "../../../action/class-course-action";
import {Link, withRouter} from "react-router-dom";
import moment from "moment";
import {startAnswer} from "../../../action/paper-action";

class MyClassCourseBody extends Component {
  state = {
    currentPage: 1,
    isAddModalOpen: false,
  }
  isTimeOut = paper => {
    console.log(new Date(moment(paper.endTime).format()))
    return new Date().getTime() > new Date(moment(paper.endTime).format()).getTime()
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

  startAnswer = (paper,classCourseId) => {
    this.props.startAnswer(classCourseId, paper.id , ()=>{
      this.props.history.push(`/students/class-courses/${classCourseId}/papers/${paper.id}/answer`)
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
          title: '状态', dataIndex: 'submissionStatus', key: 'submissionStatus',
        }, {
          title: '分数', dataIndex: 'score', key: 'score'
        }, {
          title: '答题时长(分钟)', dataIndex: 'timeBox', key: 'timeBox'
        }, {
          title: '截止时间', dataIndex: 'endTime', key: 'endTime',
        render: text => {
          return moment(text).format('YYYY-MM-DD HH:mm')}
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: (text, paper) => {
            console.log(paper.title)
            console.log(this.isTimeOut(paper))
            console.log(paper.submissionStatus)
            return <span className="table-operation">

              {!this.isTimeOut(paper) && paper.submissionStatus!=='已提交'
                ? <a onClick={()=>this.startAnswer(paper,classCourse.id)}>答题</a>
                :<Link to={`/students/class-courses/${classCourse.id}/papers/${paper.id}/reviewQuiz`}>查看</Link>
              }
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
        onChange={(pagination) => this.getPictures(pagination)}
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
  startAnswer: (classCourseId, paperId,callback) => dispatch(startAnswer(classCourseId, paperId,callback)),
  getMyClassCourses: (currentPage) => dispatch(getMyClassCourses(currentPage))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyClassCourseBody))
