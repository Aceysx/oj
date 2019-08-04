import React from 'react'
import {Button, Card, Col, Checkbox, Divider, Radio, Row, Input} from 'antd'
import {LabelImg} from "./labelimg";

const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
let label;

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
    const gapQuizIds = quizzes.filter(quiz => quiz.type === '判断题').map(quiz => quiz.id)
    const quizIds = singleQuizIds.concat(mulQuizIds).concat(picQuizIds).concat(gapQuizIds)
    this.setState({quizId: quizIds[0], quizIds: quizIds})
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.paper === this.props.paper) {
      return false
    }
    this.setDefaultQuizId(nextProps.paper)
  }

  getOptions = (options) => {
    return options.map((option, index) => {
        return <p><Radio key={index} value={index}>{option}</Radio></p>
      }
    )
  }

  getQuizSider = (type, currentQuizId) => {
    const {paper, answers = [], preview} = this.props
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
          let className = quiz.id === currentQuizId ? 'current-quiz-style' : (answers[quiz.id] ? 'quiz-finish-style' : '')
          className = preview && className === 'quiz-finish-style' ? '' : className

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
  getSingleQuiz = (quiz, answer, preview, onChange) => {

    return <RadioGroup
      onChange={e => onChange(quiz.id.toString(), e.target.value)}
      value={parseInt(answer)}
      disabled={preview}>
      {this.getOptions(JSON.parse(quiz.options))}
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
                          onChange={value => radioOnChange(quiz.id.toString(), value)}/>
  }

  getGapFillingQuiz = (quiz, answer, preview, onChange) => {
    return <p style={{
      border: '10px solid rgb(251, 251, 251)',
      width: '98%',
      borderRadius: 5,
    }}>
      <Radio.Group value={answer}
                   onChange={e => onChange(quiz.id.toString(), e.target.value)}
                   disabled={preview}>
        <Radio value='正确'>正确</Radio>
        <Radio value='错误'>错误</Radio>
      </Radio.Group>
    </p>
  }


  getMarkQuiz = (quiz, answer, isPreview, onChange) => {
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
    });
    label.addImg(list[0].imgUrl)
    window.setTimeout(label.init, 500)


    return <Row>
      <Col span={2}>答案:</Col>
      <Col span={5}><Input value={answer}
                           disabled={isPreview}
                           onChange={(e) => onChange(quiz.id.toString(), e.target.value)}/></Col>
    </Row>
  }

  removeMarkQuizDescription = () => {
    if (label) {
      label.clean();
    }
  }

  getQuiz = () => {
    const {paper, answers, preview, onChange} = this.props
    const {quizId, quizIds} = this.state
    const quiz = paper.quizzes.find(quiz => quiz.id === quizId)
    if (!quiz) return
    const answer = quiz.answer === null ? answers[quiz.id.toString()] : quiz.answer
    let currentIdIndex = quizIds.indexOf(quizId)
    this.removeMarkQuizDescription()
    return <div>
      <Row>
        {
          quiz.type !== '识图题'
            ?<p style={{
            border: '10px solid #fbfbfb',
            display: 'block',
            width: '98%',
            borderRadius: 5
          }}>
            {quiz.description}
          </p>
          :''
        }

      </Row>
      {
        quiz.type === '单选题' ?
          this.getSingleQuiz(quiz, answer, preview, onChange)
          : ''
      }
      {
        quiz.type === '多选题' ?
          this.getMulQuiz(quiz, answer, preview, onChange)
          : ''
      }
      {
        quiz.type === '识图题' ?
          this.getMarkQuiz(quiz, answer, preview, onChange)
          : ''
      }
      {
        quiz.type === '判断题' ?
          this.getGapFillingQuiz(quiz, answer, preview, onChange)
          : ''
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
    return <Row>
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
        <div id='make-picture'/>
        {this.getQuiz()}
      </Col>
    </Row>
  }
}

export default Paper
