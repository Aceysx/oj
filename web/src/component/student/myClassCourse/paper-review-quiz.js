import React from 'react'
import {Divider, Icon, Radio, Row, Tag} from 'antd'
import {getPaper, getReviewQuiz} from '../../../action/paper-action'
import {connect} from 'react-redux'

const RadioGroup = Radio.Group

class PaperReviewQuiz extends React.Component {

  componentDidMount = () =>{
    const {paperId, classCourseId} = this.props.match.params
    this.props.getPaper(paperId)
    this.props.getReviewQuiz(classCourseId,paperId)
    this.setState({paperId,classCourseId})
  }

  getOptions = (quiz) => {
    let {options, answer} = quiz
    options = JSON.parse(options)

    return options.map((option, index) => {
        const isChecked = answer === index
        return <p><Radio key={index} checked={isChecked} value={index}>{option}</Radio></p>
      }
    )
  }

  getQuizzesList = (paper, submission) => {
    const {quizzes} = paper
    return quizzes.map((quiz, index) => {
      const correctAnswer = ++quiz.answer
      const userSubmission = submission.find(item=> item.quizId === quiz.id )
      const {answer, isCorrect} = userSubmission

      return <div>
        <Row>
          <span>{index + 1}. </span>
          <p style={{
            border: '10px solid #fbfbfb',
            display: 'inline-block',
            width: '98%',
            borderRadius: 5 }}>
            {quiz.description}
          </p>
        </Row>
        <RadioGroup
          value={answer}
          disabled>
          {this.getOptions(quiz)}
        </RadioGroup>
        {isCorrect ? <p><Tag  color="#87d068"> 正确</Tag></p>
          : <p><Tag color="#f50"> 错误</Tag>正确答案是第{correctAnswer}个选项</p>
        }
        <Divider type='horizontal'/>
      </div>
    })
  }

  render() {
    const {paperReviewQuiz} = this.props
    const {paper, reviewQuiz, submission} = paperReviewQuiz

    return <div>
      <a onClick={() => this.props.history.goBack()}>
        <Icon type="arrow-left"/> 返回
      </a>
      <h1 style={{textAlign: 'center'}}>{'title'}</h1>
      <p style={{textAlign: 'center'}}>分数：{reviewQuiz.score}</p>
      {this.getQuizzesList(paper, submission)}
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
