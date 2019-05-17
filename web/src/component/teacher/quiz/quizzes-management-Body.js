import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Table, Row, Col, Select, Divider} from 'antd'
import NewQuizModal from "./new-quiz-modal"
import EditQuizModal from './edit-quiz-modal'
import {addQuiz, editQuiz, getChapters, getQuizzesByPage} from '../../../action/quiz-action'
import {getMajors} from "../../../action/major-action";
import ImportQuizModal from "../../common/import_quiz_modal";
import {getPictures} from "../../../action/picture-action";

const Option = Select.Option
class QuizManagementBody extends Component {
  state = {
    type:'',
    chapter:'',
    currentPage: 1,
    isNewModalOpen: false,
    isEditModalOpen: false,
    quiz: {},
    options: ['', '', '', ''],
    answer: -1
  }

  componentDidMount = () => {
    this.props.getQuizzes(this.state.currentPage,'','')
    this.props.getMajors()
    this.props.getChapters()
  }

  getQuizzes = (pagination) => {
    const {current} = pagination
    const {type,chapter} = this.state
    this.setState({currentPage: current}, () => {
      this.props.getQuizzes(current,type,chapter)

    })
  }
  getDescription = quiz => {
    const {description, picture,answer, type} = quiz
    if (type === '识图题' && picture!==null) {
      const {labels} = picture
      const label = labels.find(label =>label.id === parseInt(answer)) || {}
      return `${picture.title}-${label.title}`
    }

    return description
  }
  search = ()=>{
    const {type,chapter} = this.state
    this.setState({currentPage: 1}, () => {
      this.props.getQuizzes(1,type,chapter)

    })
  }
  render() {
    const columns = [
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: '30%',
        render: (text, record) => {
          return <span>{this.getDescription(record)
            ? this.getDescription(record).substr(0, 50)
            : ''}
            </span>
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
    const {quizPageable, addQuiz, majors, editQuiz, picturesPageable,chapters} = this.props
    const {totalElements, content} = quizPageable
    const {currentPage, isNewModalOpen, isEditModalOpen, quiz, options, answer,type,chapter} = this.state
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
          <Col>
            搜索：
            <Select
              placeholder="选择章节"
              style={{width:200}}
              value={chapter}
              onChange={chapter=>this.setState({chapter})}
            >
              <Option value="">全选</Option>
              {
                chapters.map(chapter =><Option value={chapter}>{chapter}</Option>)
              }

            </Select>
            <Divider type='vertical'/>
            <Select
              placeholder="选择类型"
              style={{width:200}}
              value={type}
              onChange={type=>this.setState({type})}
            >
              <Option value="">全选</Option>
              <Option value="单选题">单选题</Option>
              <Option value="多选题">多选题</Option>
              <Option value="识图题">识图题</Option>
            </Select>
            <Divider type='vertical'/>
            <Button onClick={this.search} type='primary'>搜索</Button>
          </Col>
        </Row>
      </p>
      <NewQuizModal
        updateOptions={(options) => this.setState({options})}
        updateAnswer={(answer) => this.setState({answer})}
        searchPictures={this.props.searchPictures}
        picturesPageable={picturesPageable}
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
        searchPictures={this.props.searchPictures}
        picturesPageable={picturesPageable}
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
        onChange={(pagination) => this.getQuizzes(pagination)}
        pagination={{
          defaultCurrent: currentPage,
          total: totalElements
        }}/>
    </div>
  }
}

const mapStateToProps = ({user, quizPageable, majors, picturesPageable,chapters}) => ({
  user,
  quizPageable,
  majors,
  picturesPageable,
  chapters
})

const mapDispatchToProps = dispatch => ({
  getChapters: () => dispatch(getChapters()),
  getQuizzes: (current,type,chapter) => dispatch(getQuizzesByPage(current,type,chapter)),
  getMajors: () => dispatch(getMajors()),
  searchPictures: (title) => dispatch(getPictures(1, title)),
  editQuiz: (quiz, callback) => dispatch(editQuiz(quiz, callback)),
  addQuiz: (quiz, callback) => dispatch(addQuiz(quiz, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizManagementBody)
