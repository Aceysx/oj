import React from 'react'
import {Button, Card, Col, Checkbox, Divider, Radio, Row} from 'antd'

const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group

class Paper extends React.Component {
  state = {
    quizId: -1,
    quizIds: []
  }

  setDefaultQuizId = (paper) => {
    let {quizzes} = paper
    const singleQuizIds = quizzes.filter(quiz => quiz.type === '单选题').map(quiz => quiz.id)
    const mulQuizIds = quizzes.filter(quiz => quiz.type === '多选题').map(quiz => quiz.id)
    const picQuizIds = quizzes.filter(quiz => quiz.type === '识图题').map(quiz => quiz.id)
    const quizIds = singleQuizIds.concat(mulQuizIds).concat(picQuizIds)
    this.setState({quizId: quizIds[0], quizIds: quizIds})
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.paper === this.props.paper) {
      return false
    }
    this.setDefaultQuizId(nextProps.paper)
  }

  getOptions = (quiz) => {
    let {options} = quiz
    options = JSON.parse(options)
    return options.map((option, index) => {
        return <p><Radio key={index} value={index}>{option}</Radio></p>
      }
    )
  }

  getQuizSider = (type, currentQuizId) => {
    const {paper, answers = []} = this.props
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
          const className = quiz.id === currentQuizId ? 'current-quiz-style' : (answers[quiz.id] ? 'quiz-finish-style' : '')
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
  getSingleQuiz = (quiz, answer, preview, onChange) => {
    return <RadioGroup
      onChange={e => onChange(quiz.id.toString(), e.target.value)}
      value={parseInt(answer)}
      disabled={preview}>
      {this.getOptions(quiz)}
    </RadioGroup>
  }
  getMulQuiz = (quiz, answer, preview, radioOnChange) => {
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
                          disabled={preview}
                          onChange={value => radioOnChange(quiz.id.toString(), value)} />
  }

  getQuiz = () => {
    const {paper, answers, preview, onChange} = this.props
    const {quizId, quizIds} = this.state
    const quiz = paper.quizzes.find(quiz => quiz.id === quizId)
    if (!quiz) return
    const answer = quiz.answer === null ? answers[quiz.id.toString()] : quiz.answer
    let currentIdIndex = quizIds.indexOf(quizId)

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
          this.getSingleQuiz(quiz, answer, preview, onChange)
          :
          this.getMulQuiz(quiz, answer, preview, onChange)

      }

      <Divider/>
      <Button disabled={currentIdIndex <= 0}
              onClick={() => this.setState({quizId: quizIds[currentIdIndex - 1]})}>上一题</Button>
      <Divider type='vertical'/>
      <Button disabled={currentIdIndex >= quizIds.length - 1}
              onClick={() => this.setState({quizId: quizIds[currentIdIndex + 1]})} type='primary'>
        下一题</Button>
    </div>;
  }

  render() {
    const {paper} = this.props
    return <div>
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
        {this.getQuiz()}
      </Col>
    </div>;
  }
}

export default Paper
