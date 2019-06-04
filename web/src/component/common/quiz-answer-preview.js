import React from 'react'
import {Divider, Modal, Radio, Tag, Checkbox} from 'antd'
import {LabelImg} from './labelimg'

const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
let label
export default class QuizAnswerReview extends React.Component {

  getSingleQuiz = (quiz, userAnswer) => {
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

  getChoiceQuiz = () => {
    let {quiz} = this.props
    let {description, userAnswer} = quiz
    return <div><h2>{description}</h2>
      { quiz.type === '填空题' ? '' :
      ( quiz.type === '单选题'
          ? this.getSingleQuiz(quiz, userAnswer)
          : this.getMulQuiz(quiz, userAnswer)
      )
      }
    </div>
  }

  getMakerQuiz = () => {
    const {quiz} = this.props
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
      initData: labelPositions,
      element: 'make-picture',
      isPreview: true
    })
    label.addImg(list[0].imgUrl)
    window.setTimeout(label.init, 800)

  }

  removeMarkQuizDescription = () => {
    if (label) {
      label.clean()
      label = null
    }
  }
  getMulQuiz = (quiz, userAnswer) => {
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
                          disabled/>
  }

  render() {
    let {visible, quiz, handleCancel} = this.props
    let {answer} = quiz
    this.removeMarkQuizDescription()
    return <Modal
      title='错题预览'
      visible={visible}
      footer={null}
      width='90%'
      onOk={null}
      onCancel={handleCancel}
    >
      <div>
        <Tag color='green'>正确答案是</Tag>
        {
          quiz.type === '单选题'
            ? ++answer
            : ''
        }
        {
          quiz.type === '多选题'
            ? JSON.parse(answer).map(item => ++item).sort().join('、')
            : ''
        }
        {
          quiz.type === '识图题'
            ? answer
            : ''
        }
        {
          quiz.type === '填空题'
            ? answer
            : ''
        }

        <Divider type='horizontal'/>

        {
          quiz.type === '识图题'
            ?
            <div id='make-picture'
                 style={{height: quiz.type === '识图题' ? '600px' : ''}}>
              {setTimeout(this.getMakerQuiz,500)}
            </div>
            : this.getChoiceQuiz()
        }
      </div>
    </Modal>
  }
}