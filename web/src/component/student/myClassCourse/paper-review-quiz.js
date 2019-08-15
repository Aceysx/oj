import React from 'react'
import {Card, Checkbox, Col, Divider, Icon, Radio, Row, Input,Button} from 'antd'
import {getPaper, getReviewQuiz} from '../../../action/paper-action'
import {connect} from 'react-redux'
import {LabelImg} from "../../common/labelimg";

const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
let label

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
    const gapQuizIds = quizzes.filter(quiz => quiz.type === '判断题').map(quiz => quiz.id)
    const quizIds = singleQuizIds.concat(mulQuizIds).concat(picQuizIds).concat(gapQuizIds)
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
              {index + 1}
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
          return <p><Radio key={index} value={index} style={{fontWeight: 'bolder',color:'#3241da'}}
          >{option}</Radio></p>
        }
      )
    }

    return <RadioGroup
      value={parseInt(answer)}
    >
      {getOptions(quiz)}
    </RadioGroup>
  }

  getMakerQuiz = (quiz) => {
    const picture = quiz.picture
    let {url} = picture
    const labels = [...quiz.picture.labels]
    const labelPositions = labels.map(label => {
      return {...label, position: JSON.parse(label.position)}
    })
    const list = [
      {
        imgUrl: url,
        labeled: false
      }
    ]
    label = new LabelImg({
      submit: labels => this.setState({labels}),
      initData: labelPositions,
      element: 'make-picture',
      isPreview: true
    })
    label.addImg(list[0].imgUrl)
    window.setTimeout(label.init, 500)
  }

  removeMarkQuizDescription = () => {
    if (label) {
      label.clean();
    }
  }

  getMulQuiz = (quiz, answer) => {
    const getMulOptions = () => {
      return JSON.parse(quiz.options).map((option, index) => {
        return {
          label:
            <span style={{display: 'inline-block', marginBottom: 5,fontWeight: 'bolder',color:'#3241da'}}>
              {option}
            </span>,
          value: `${index}`
        }
      })
    }

    return <CheckboxGroup options={getMulOptions()}
                          value={answer === '-1' ? [answer] : answer}
                          />
  }

  getGapFillingQuiz = (quiz, answer) => {
    return <Radio.Group  value={answer} >
      <Radio value='正确' style={{fontWeight: 'bolder',color:'#3241da'}}>正确</Radio>
      <Radio value='错误' style={{fontWeight: 'bolder',color:'#3241da'}}>错误</Radio>
    </Radio.Group>

  }

  getQuiz = (paper, submission) => {
    const {quizId} = this.state
    const quiz = paper.quizzes.find(quiz => quiz.id === quizId)
    if (!quiz) return
    submission = submission.find(item => item.quizId === quizId)
    const answer = submission ? submission.answer : '-1'
    return <div>
      <Row>
        {
          quiz.type !== '识图题'
            ? <p style={{
              border: '10px solid #fbfbfb',
              display: 'block',
              width: '98%',
              borderRadius: 5
            }}>
              {quiz.description}
            </p>
            : ''
        }

      </Row>
      {
        quiz.type === '单选题'
          ? this.getSingleQuiz(quiz, answer)
          : ''
      }
      {quiz.type === '多选题'
        ? this.getMulQuiz(quiz, answer)
        : ''
      }
      {quiz.type === '识图题'
        ? this.getMakerQuiz(quiz, answer)
        : ''
      }
      {
        quiz.type === '判断题' ?
          this.getGapFillingQuiz(quiz, answer)
          : ''
      }

      <Divider/>
      <h2>正确答案是：
        {
          quiz.type === '多选题' ?
            JSON.parse(quiz.answer).map(answer => ++answer).sort().join('、')
            : ''
        }
        {
          quiz.type === '单选题' ?
            parseInt(quiz.answer) + 1
            : ''
        }
        {
          quiz.type === '识图题' ?
            quiz.answer
            : ''
        }
        {
          quiz.type === '判断题' ?
            quiz.answer
            : ''
        }

      </h2>
    </div>;
  }


  render() {
    const {paperReviewQuiz} = this.props
    const {paper, reviewQuiz, submission} = paperReviewQuiz
    this.removeMarkQuizDescription()
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
          {
            this.getQuizSider('判断题', this.state.quizId)
          }

        </div>
      </Col>
      <Col span={16} offset={1}>
        <h1 style={{textAlign: 'center'}}>{paper.title}</h1>
        <p style={{textAlign: 'center'}}>分数：{reviewQuiz ? reviewQuiz.score : '答题时间已过'}</p>
        <div id='make-picture'/>
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
