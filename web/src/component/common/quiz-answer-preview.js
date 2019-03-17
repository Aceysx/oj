import React from 'react'
import {Divider, Modal, Radio, Tag, Checkbox} from 'antd'

const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const QuizAnswerReview = ({visible, quiz, handleCancel}) => {
  let {description, userAnswer, answer} = quiz

  const getSingleQuiz = (quiz, userAnswer) => {
    const getOptions = () => {
      let {options = '[]'} = quiz
      options = JSON.parse(options)

      return options.map((option, index) => {
        return <p><Radio key={index} value={index}>{option}</Radio></p>
      }
      )
    }
    return <RadioGroup
      value={parseInt(userAnswer)}
      disabled>
      {getOptions()}
    </RadioGroup>
  }
  const getMulQuiz = (quiz, userAnswer) => {
    const getMulOptions = () => {
      return JSON.parse(quiz.options || '[]').map((option, index) => {
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
      value={userAnswer}
      disabled />
  }
  return <Modal
    title='错题预览'
    visible={visible}
    footer={null}
    width='70%'
    onOk={null}
    onCancel={handleCancel}
  >
    <h2>{description}</h2>
    {
      quiz.type === '单选题'
        ? getSingleQuiz(quiz, userAnswer)
        : getMulQuiz(quiz, userAnswer)
    }

    <Divider type='horizontal' />
    <Tag color='green'>正确答案是选项</Tag>
    {
      quiz.type === '单选题'
      ? ++answer
        : JSON.parse(answer).map(item => ++item).sort().join('、')
    }
  </Modal>
}

export default QuizAnswerReview
