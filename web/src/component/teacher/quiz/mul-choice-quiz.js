import React from 'react'
import {Checkbox, Icon, Input, Tooltip} from 'antd'

const CheckboxGroup = Checkbox.Group

const MulChoiceQuiz = ({options, answer, radioOnChange, optionOnChange, handleDeleteSelectItem}) => {
  answer = answer? answer.map(item => item.toString()) :answer
  const getOptions = () => {
    return options.map((option, index) => {
      return {
        label:
  <span style={{display: 'inline-block', marginBottom: 5}}>
    <Input value={option} style={{width: '500'}}
      onChange={(e) => optionOnChange(index, e)}
    />
    {index > 1
              ? <Tooltip title={'删除选项'}>
                <Icon style={{fontSize: 20, marginLeft: 30}} type='minus-circle-o'
                  onClick={() => handleDeleteSelectItem(index)} />
              </Tooltip>
              : ''}
  </span>,
        value: `${index}`
      }
    })
  }
  return <div>
    <CheckboxGroup options={getOptions()}
      value={answer}
      onChange={radioOnChange} />
  </div>
}

export default MulChoiceQuiz
