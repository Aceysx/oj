import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Table} from 'antd'
import NewQuizModal from "./new-quiz-modal"
import EditQuizModal from './edit-quiz-modal'
import {editQuiz, getQuizzes} from '../../action/quiz-action'
import {getMajors} from "../../action/major-action";

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
            <a onClick={() => this.setState({
              isEditModalOpen: true,
              quiz: record,
              options: JSON.parse(record.options),
              answer: record.answer
            })}>编辑</a>
          </div>
        }
      }
    ]
    const {quizPageable, addQuiz, majorPageable, editQuiz} = this.props
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
      <EditQuizModal
        answer={answer}
        options={options}
        majorPageable={majorPageable}
        isNewModalOpen={isEditModalOpen}
        updateOptions={(options) => this.setState({options})}
        updateAnswer={(answer) => this.setState({answer})}
        closeModal={() => this.setState({
          isEditModalOpen: false,
          options: ['', '', '', ''],
          answer: -1
        })}
        editQuiz={editQuiz}
        quiz={quiz}
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
  editQuiz: (quiz, callback) => dispatch(editQuiz(quiz, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizManagementBody)
