import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Table, Row, Col} from 'antd'
import NewQuizModal from "./new-quiz-modal"
import EditQuizModal from './edit-quiz-modal'
import {addQuiz, editQuiz, getQuizzesByPage} from '../../../action/quiz-action'
import {getMajors} from "../../../action/major-action";
import ImportQuizModal from "../../common/import_quiz_modal";

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
      this.props.getQuizzes(current)

    })
  }

  render() {
    const columns = [
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: '30%',
        render: text => {
          return <span>{text.substr(0, 50)}</span>
        }
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
          return <span>{text ? text.name : ''}</span>
        }
      }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type'
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
              answer: record.type === '多选题' ? JSON.parse(record.answer) : record.answer
            })}>编辑</a>
          </div>
        }
      }
    ]
    const {quizPageable, addQuiz, majors, editQuiz} = this.props
    const {totalElements, content} = quizPageable
    const {currentPage, isNewModalOpen, isEditModalOpen, quiz, options, answer} = this.state
    return <div>
      <p>
        <Row>
          <Col span={2}>
            <Button
              type="primary"
              onClick={() => this.setState({isNewModalOpen: true})}>
              添加题目
            </Button>
          </Col>
          <Col span={4}>
            <ImportQuizModal
              refreshQuizzes={this.props.getQuizzes}
            />
          </Col>
        </Row>
      </p>
      <NewQuizModal
        updateOptions={(options) => this.setState({options})}
        updateAnswer={(answer) => this.setState({answer})}
        answer={answer}
        options={options}
        majors={majors}
        isNewModalOpen={isNewModalOpen}
        closeModal={() => this.setState({
          isNewModalOpen: false,
          options: ['', '', '', ''],
          answer: ''
        })}
        addQuiz={addQuiz}
      />
      <EditQuizModal
        answer={answer}
        options={options}
        majors={majors}
        isNewModalOpen={isEditModalOpen}
        updateOptions={(options) => this.setState({options})}
        updateAnswer={(answer) => this.setState({answer})}
        closeModal={() => this.setState({
          isEditModalOpen: false,
          options: ['', '', '', ''],
          answer: ''
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

const mapStateToProps = ({user, quizPageable, majors}) => ({
  user,
  quizPageable,
  majors
})

const mapDispatchToProps = dispatch => ({
  getQuizzes: (current) => dispatch(getQuizzesByPage(current)),
  getMajors: () => dispatch(getMajors()),
  editQuiz: (quiz, callback) => dispatch(editQuiz(quiz, callback)),
  addQuiz: (quiz, callback) => dispatch(addQuiz(quiz, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizManagementBody)
