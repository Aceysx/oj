import React from 'react'
import {Icon, Radio, Input, Tooltip} from 'antd'
const RadioGroup = Radio.Group

const SingleChoiceQuiz = ({options, answer, radioOnChange, optionOnChange, handleDeleteSelectItem}) => {
  return <div>
    <RadioGroup onChange={(e) => radioOnChange(e.target.value)} value={answer}>
      {options.map((option, index) => {
        return (
          <Radio value={`${index}`} key={index}>
            <Input value={option} style={{width: '300'}}
              onChange={(e) => optionOnChange(index,e)}
            />
            {index > 1
              ? <Tooltip title={'删除选项'}>
                <Icon style={{fontSize: 20, marginLeft: 30}} type='minus-circle-o'
                  onClick={() => handleDeleteSelectItem(index)} />
              </Tooltip>
              : ''}
          </Radio>
        )
      })}
    </RadioGroup>
  </div>
}

export default SingleChoiceQuiz
