import React from 'react'
import {Radio} from 'antd'

const RadioGroup = Radio.Group

const MakeQuiz = ({picture, answer, radioOnChange}) => {
  const {labels = []} = picture
  answer = answer + ''
  return <div>
    <RadioGroup onChange={(e) => radioOnChange(e.target.value)} value={answer}>
      {labels.map((label, index) => {
        return (
          <Radio value={label.id+''} key={index}>
            <span>{label.title}</span>
          </Radio>
        )
      })}
    </RadioGroup>
  </div>
}

export default MakeQuiz
