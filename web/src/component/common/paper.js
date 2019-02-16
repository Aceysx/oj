import React from 'react'
import {Divider, Radio} from 'antd'

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
      const answer = quiz.answer || answers[quiz.id.toString()]
      return <div>
        <p dangerouslySetInnerHTML={{__html: `${index + 1}. ${quiz.description}`}} />
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
