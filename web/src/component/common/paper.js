import React from 'react'
import {Divider, Radio, Row} from 'antd'

const RadioGroup = Radio.Group
const Paper = ({paper, preview, answers, onChange}) => {
  const getOptions = (quiz) => {
    let {options, answer} = quiz
    options = JSON.parse(options)

    return options.map((option, index) => {
      const isChecked = answer === index
      return <p><Radio key={index} checked={isChecked} value={index}>{option}</Radio></p>
    }
    )
  }

  const getQuizzesList = () => {
    const {quizzes} = paper
    return quizzes.map((quiz, index) => {
      const answer = quiz.answer === null ? answers[quiz.id.toString()] : quiz.answer
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
          onChange={e => onChange(quiz.id.toString(), e.target.value)}
          value={answer}
          disabled={!!preview}>
          {getOptions(quiz)}
        </RadioGroup>
        <Divider type='horizontal' />
      </div>
    })
  }

  return <div>
    <h1 style={{textAlign: 'center'}}>{paper.title}</h1>
    {getQuizzesList()}
  </div>
}

export default Paper
