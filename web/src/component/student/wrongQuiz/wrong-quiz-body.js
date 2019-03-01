import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table} from 'antd'
import {getMyWrongQuizzesByPage, getQuizzesByPage} from '../../../action/quiz-action'
import {getMajors} from "../../../action/major-action";

class WrongQuizzesBody extends Component {
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
        key: 'description',
        render: text => {
          return <span>{text.substr(0, 100)}</span>
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
            })}>预览</a>
          </div>
        }
      }
    ]
    const {quizPageable} = this.props
    const {totalElements, content} = quizPageable
    const {currentPage} = this.state
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
    </div>
  }
}

const mapStateToProps = ({user, quizPageable, majors}) => ({
  user,
  quizPageable,
  majors
})

const mapDispatchToProps = dispatch => ({
  getQuizzes: (current) => dispatch(getMyWrongQuizzesByPage(current)),
  getMajors: () => dispatch(getMajors())
})

export default connect(mapStateToProps, mapDispatchToProps)(WrongQuizzesBody)
