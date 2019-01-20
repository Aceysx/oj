import React from 'react'
import {Button, Col, Form, Icon, Input, message, Modal, Radio, Row, Select, Tooltip} from 'antd'

const RadioGroup = Radio.Group
const {Option} = Select;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
}

class EditQuizModal extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {quiz, form, answer} = nextProps
    if (quiz === this.props.quiz) {
      return false
    }
    const {chapter, description, major = {}, level} = quiz
    form.setFieldsValue({chapter, description, major: major.id, level, answer: answer + ''})
  }

  radioOnChange(e) {
    const answer = e.target.value
    this.props.updateAnswer(answer)
  }

  optionOnChange(index, e) {
    const {options} = this.props
    options[index] = e.target.value
    this.props.updateOptions(options)
  }

  handleDeleteSelectItem(index) {
    let {options} = this.props

    options = options.filter((options, idx) => index !== idx)
    this.props.updateOptions(options)
  }

  handleAddSelectItem = () => {
    let {options} = this.props
    options.push('')
    this.props.updateOptions(options)
  }

  validateOptions = () => {
    const {options, answer} = this.props
    const validated = options.every(option => option.trim() !== '') && answer < options.length
    if (validated) {
      return true
    }
    message.error('请填写选项，勾选答案')
    return false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && this.validateOptions()) {
        let {answer, options, quiz} = this.props
        quiz = Object.assign({}, values, {id: quiz.id, answer, options: JSON.stringify(options)})
        this.props.editQuiz(quiz, () => {
          message.success('编辑成功')
          this.props.closeModal()
        })
      }
    })
  }


  render() {
    const {isNewModalOpen, closeModal, form, options, majorPageable} = this.props
    const majors = majorPageable[0] ? majorPageable : []
    const {getFieldDecorator} = form

    return <div>
      <Modal
        title='添加题目'
        visible={isNewModalOpen}
        footer={null}
        onCancel={() => closeModal()}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="专业"
          >
            {getFieldDecorator('major', {
              rules: [{
                required: true, message: '请输入章节',
              }],
            })(
              <Select>
                {
                  majors.map(major =>
                    <Option key={major.id} value={major.id}>{major.name}</Option>
                  )
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="章节"
          >
            {getFieldDecorator('chapter', {
              rules: [{
                required: true, message: '请输入章节',
              }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="题目描述"
          >
            {getFieldDecorator('description', {
              rules: [{
                required: true, message: '请输入题目描述',
              }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="难度"
          >
            {getFieldDecorator('level', {
              rules: [{
                required: true, message: '请选择难度',
              }],
            })(
              <Select defaultValue='简单'>
                <Option value='简单'>简单</Option>
                <Option value='一般'>一般</Option>
                <Option value='困难'>困难</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="选项"
          >
            {getFieldDecorator('answer', {
              rules: [{
                required: true, message: '请勾选答案',
              }],
            })(
              <RadioGroup onChange={this.radioOnChange.bind(this)}>
                {options.map((option, index) => {
                  return (
                    <Radio value={`${index}`} key={index}>
                      <Input value={option} style={{width: '300'}}
                             onChange={this.optionOnChange.bind(this, index)}
                      />
                      {index > 1
                        ? <Tooltip title={'删除选项'}>
                          <Icon style={{fontSize: 20, marginLeft: 30}} type='minus-circle-o'
                                onClick={this.handleDeleteSelectItem.bind(this, index)}/>
                        </Tooltip>
                        : ''}
                    </Radio>
                  )
                })}
              </RadioGroup>
            )}
            <Tooltip title={'添加一个选项'}>
              <Icon style={{fontSize: 20}} type='plus-circle-o' onClick={this.handleAddSelectItem}/>
            </Tooltip>
          </Form.Item>
          <Row type='flex' align='middle'>
            <Col>
              <Button type="primary"
                      htmlType="submit">确定</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  }
}

const EditQuizModalForm = Form.create()(EditQuizModal)

export default EditQuizModalForm
