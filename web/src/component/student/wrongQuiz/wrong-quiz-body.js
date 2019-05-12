import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table} from 'antd'
import {getMyWrongQuizzesByPage} from '../../../action/quiz-action'
import QuizAnswerPreview from '../../common/quiz-answer-preview'

class WrongQuizzesBody extends Component {
  state = {
    currentPage: 1,
    quiz: {},
    isPreviewModalOpen: false
  }

  componentDidMount = () => {
    this.props.getQuizzes(this.state.currentPage)
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
        render: text => {
          return <span>{text ? text.substr(0, 100) : ''}</span>
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
        title: '课程名称',
        dataIndex: 'major',
        key: 'major',
        render: (text) => {
          return <span>{text? text.name:''}</span>
        }
      },{
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      }, {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => {
          return <div>
            <a onClick={() => this.setState({
              isPreviewModalOpen: true,
              quiz: record
            })}>预览</a>
          </div>
        }
      }
    ]
    const {quizPageable} = this.props
    const {totalElements, content} = quizPageable
    const {currentPage, quiz, isPreviewModalOpen} = this.state
    return <div>
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
      {
        quiz.id ?
        <QuizAnswerPreview
          visible={isPreviewModalOpen}
          quiz={quiz}
          handleCancel={() => this.setState({isPreviewModalOpen: false})}
        />
          :''
      }
    </div>
  }
}

const mapStateToProps = ({user, quizPageable}) => ({
  user,
  quizPageable,
})

const mapDispatchToProps = dispatch => ({
  getQuizzes: (current) => dispatch(getMyWrongQuizzesByPage(current)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WrongQuizzesBody)
