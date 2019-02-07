import React from 'react'
import {Col, Radio, Row} from 'antd'

const RadioGroup = Radio.Group
const Paper = ({paper, preview}) => {
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
    return quizzes.map(quiz => {
      return <div>
        <p dangerouslySetInnerHTML={{__html: `${quiz.description}`}} />
        <RadioGroup value={quiz.answer} disabled={!!preview}>
          {getOptions(quiz)}
        </RadioGroup>
      </div>
    })
  }
  return <div>
    <h1 style={{textAlign: 'center'}}>{paper.title}</h1>
    <Row>
      <Col />
    </Row>
    {getQuizzesList()}
  </div>
}

export default Paper
