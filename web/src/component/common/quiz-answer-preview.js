import React from 'react'
import {Divider, Modal, Radio, Tag} from 'antd'
const RadioGroup = Radio.Group

const QuizAnswerReview = ({visible, quiz = {}, handleCancel}) => {
  let {description, userAnswer, answer} = quiz
  ++answer
  const getOptions = () => {
    let {options = '[]'} = quiz
    options = JSON.parse(options)

    return options.map((option, index) => {
      return <p><Radio key={index} value={index}>{option}</Radio></p>
    }
    )
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
    <RadioGroup
      value={userAnswer}
      disabled>
      {getOptions()}
    </RadioGroup>

    <Divider type='horizontal' />
    <Tag color='green'>正确答案是选项</Tag>{answer}
  </Modal>
}

export default QuizAnswerReview
