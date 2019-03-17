import React from 'react'
import {Button, Card, Checkbox, Col, Divider, Icon, Radio, Row} from 'antd'
import {getPaper, getReviewQuiz} from '../../../action/paper-action'
import {connect} from 'react-redux'

const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group

class PaperReviewQuiz extends React.Component {
  state = {
    quizId: -1,
  }

  componentDidMount = () => {
    const {paperId, classCourseId} = this.props.match.params
    this.props.getPaper(paperId)
    this.props.getReviewQuiz(classCourseId, paperId)
    this.setState({paperId, classCourseId})
  }

  setDefaultQuizId = (paper) => {
    let {quizzes} = paper
    const singleQuizIds = quizzes.filter(quiz => quiz.type === '单选题').map(quiz => quiz.id)
    const mulQuizIds = quizzes.filter(quiz => quiz.type === '多选题').map(quiz => quiz.id)
    const picQuizIds = quizzes.filter(quiz => quiz.type === '识图题').map(quiz => quiz.id)
    const quizIds = singleQuizIds.concat(mulQuizIds).concat(picQuizIds)
    this.setState({quizId: quizIds[0]})
  }

  componentWillReceiveProps = (nextProps) => {
    const {paperReviewQuiz} = nextProps
    const {paper} = paperReviewQuiz

    if (nextProps.paperReviewQuiz === this.props.paperReviewQuiz) {
      return false
    }
    this.setDefaultQuizId(paper)
  }
  getQuizSider = (type, currentQuizId) => {
    const {paperReviewQuiz} = this.props
    const {paper, submission} = paperReviewQuiz

    const quizzes = paper.quizzes.filter(quiz => quiz.type === type)
    if (quizzes.length === 0) {
      return
    }
    return <Card
      bordered={false}
      title={type}
    >
      {
        quizzes.map((quiz, index) => {
          console.log(submission, quiz.id)
          const userAnswer = submission.find(item => item.quizId === quiz.id) || {}
          const className = quiz.id === currentQuizId ? 'current-quiz-style' : (userAnswer.isCorrect ? 'quiz-correct-style' : 'quiz-error-style')
          return <Col span={6}>
            <p
              onClick={() => this.setState({quizId: quiz.id})}
              className={className}
              style={{
                width: 30,
                height: 30,
                lineHeight: '25px',
                cursor: 'pointer',
                textAlign: 'center',
                borderRadius: '50%',
                border: '1px solid gray'
              }}>
              {++index}
            </p>
          </Col>
        })
      }
    </Card>;

  }

  getSingleQuiz = (quiz, answer) => {
    const getOptions = (quiz) => {
      let {options} = quiz
      options = JSON.parse(options)
      return options.map((option, index) => {
          return <p><Radio key={index} value={index}>{option}</Radio></p>
        }
      )
    }
    return <RadioGroup
      value={parseInt(answer)}
      disabled>
      {getOptions(quiz)}
    </RadioGroup>
  }
  getMulQuiz = (quiz, answer) => {
    const getMulOptions = () => {
      return JSON.parse(quiz.options).map((option, index) => {
        return {
          label:
            <span style={{display: 'inline-block', marginBottom: 5}}>
              {option}
            </span>,
          value: `${index}`
        }
      })
    }

    return <CheckboxGroup options={getMulOptions()}
                          value={answer}
                          disabled/>
  }
  getQuiz = (paper, submission) => {
    const {quizId} = this.state
    const quiz = paper.quizzes.find(quiz => quiz.id === quizId)
    if (!quiz) return
    const answer = quiz.answer === null ? submission[quiz.id.toString()] : quiz.answer

    return <div>
      <Row>
        <p style={{
          border: '10px solid #fbfbfb',
          display: 'block',
          width: '98%',
          borderRadius: 5
        }}>
          {quiz.description}
        </p>
      </Row>
      {
        quiz.type === '单选题' ?
          this.getSingleQuiz(quiz, answer)
          :
          this.getMulQuiz(quiz, answer)
      }

      <Divider/>
      <h2>正确答案：{
        quiz.type === '多选题' ?
          JSON.parse(quiz.answer).map(answer => ++answer).sort().join('、')
          :
          ++quiz.answer
      }</h2>
    </div>;
  }

  render() {
    const {paperReviewQuiz} = this.props
    const {paper, reviewQuiz, submission} = paperReviewQuiz

    return <div>
      <p>
        <a onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"/> 返回
        </a>
      </p>
      <Col span={5}>
        <div>
          {
            this.getQuizSider('单选题', this.state.quizId)
          }
          {
            this.getQuizSider('多选题', this.state.quizId)
          }
          {
            this.getQuizSider('识图题', this.state.quizId)
          }

        </div>
      </Col>
      <Col span={16} offset={1}>
        <h1 style={{textAlign: 'center'}}>{paper.title}</h1>
        <p style={{textAlign: 'center'}}>分数：{reviewQuiz.score}</p>
        {this.getQuiz(paper, submission)}
      </Col>
    </div>
  }
}

const mapStateToProps = ({paperReviewQuiz}) => ({
  paperReviewQuiz
})

const mapDispatchToProps = (dispatch) => ({
  getPaper: paperId => dispatch(getPaper(paperId)),
  getReviewQuiz: (classCourseId, paperId) => dispatch(getReviewQuiz(classCourseId, paperId))
})
export default connect(mapStateToProps, mapDispatchToProps)(PaperReviewQuiz)
