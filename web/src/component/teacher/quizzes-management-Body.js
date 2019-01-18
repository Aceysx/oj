import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Divider, Table} from 'antd'
import NewQuizModal from "./new-quiz-modal"
import EditClassCourseModal from './edit-class-course-modal'
import {addQuiz, getQuizzes} from '../../action/quiz-action'
import {getMajors} from "../../action/major-action";
import majorPageable from "../../reducer/major";

class QuizManagementBody extends Component {
  state = {
    currentPage: 1,
    isNewModalOpen: false,
    isEditModalOpen: false,
    quiz: {},
    options: ['', '', '', ''],
    answer: -1
  }

  componentDidMount = () => {
    this.props.getQuizzes(this.state.currentPage)
    this.props.getMajors()
  }

  getClassCourse = (pagination) => {
    const {current} = pagination
    this.setState({currentPage: current}, () => {
      this.props.getClassCourses(current)

    })
  }

  render() {
    const columns = [
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description'
      }, {
        title: '章节',
        dataIndex: 'chapter',
        key: 'chapter'
      }, {
        title: '难度',
        dataIndex: 'level',
        key: 'level'
      }, {
        title: '专业',
        dataIndex: 'major',
        key: 'major',
        render: (text, record) => {
          return <span>{text.name}</span>
        }
      }, {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => {
          return <div>
            <a onClick={() => this.setState({isEditModalOpen: true, classCourse: record})}>编辑</a>
            <Divider type='vertical'/>
            <a>绑定试卷</a>
          </div>
        }
      }
    ]
    const {quizPageable, addQuiz, majorPageable} = this.props
    const {totalElements, content} = quizPageable
    const {currentPage, isNewModalOpen, isEditModalOpen, quiz, options, answer} = this.state

    return <div>
      <p><Button
        type="primary"
        onClick={() => this.setState({isNewModalOpen: true})}>
        添加题目
      </Button></p>

      <NewQuizModal
        updateOptions={(options) => this.setState({options})}
        updateAnswer={(answer) => this.setState({answer})}
        answer={answer}
        options={options}
        majorPageable={majorPageable}
        isNewModalOpen={isNewModalOpen}
        closeModal={() => this.setState({
          isNewModalOpen: false,
          options: ['', '', '', ''],
          answer: -1
        })}
        addQuiz={addQuiz}
      />
      <EditClassCourseModal
        isNewModalOpen={isEditModalOpen}
        closeModal={() => this.setState({isEditModalOpen: false})}
        editClassCourse={this.props.editClassCourse}
        classCourse={quiz}
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

const mapStateToProps = ({user, quizPageable, majorPageable}) => ({
  user,
  quizPageable,
  majorPageable
})

const mapDispatchToProps = dispatch => ({
  getQuizzes: (current) => dispatch(getQuizzes(current)),
  getMajors: () => dispatch(getMajors()),
  addQuiz: (quiz, callback) => dispatch(addQuiz(quiz,callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizManagementBody)
