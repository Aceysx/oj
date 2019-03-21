import React from 'react'
import {Button, Col, Form, Icon, Input, message, Modal, Radio, Row, Select, Tooltip} from 'antd'
import SingleChoiceQuiz from "./single-choice-quiz";
import MulChoiceQuiz from "./mul-choice-quiz";

const RadioGroup = Radio.Group
const {Option} = Select;
const {TextArea} = Input
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14},
  },
}

class EditQuizModal extends React.Component {
  componentWillReceiveProps(nextProps) {
    let {quiz, form, answer=[]} = nextProps
    if (quiz === this.props.quiz) {
      return false
    }
    let {chapter, description, major, level, type} = quiz

    form.setFieldsValue({chapter, description, type, major:major? major.id: '', level, answer})
  }

  radioOnChange = answer => {
    this.props.updateAnswer(answer)
  }

  optionOnChange = (index, e) => {
    const {options} = this.props
    options[index] = e.target.value
    this.props.updateOptions(options)
  }

  handleDeleteSelectItem = index => {
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
    const {options} = this.props
    const validated = options.every(option => option.trim() !== '')
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
    const {isNewModalOpen, closeModal, form, options, majors, quiz, answer} = this.props
    const {getFieldDecorator} = form

    return <div>
      <Modal
        title='修改题目'
        width='80%'
        visible={isNewModalOpen}
        footer={null}
        onCancel={() => closeModal()}
      >
        <Form.Item
          {...formItemLayout}
          label="类型"
        >
          {getFieldDecorator('type', {
            rules: [{
              required: true, message: '请输入题目类型',
            }],
            initialValue: '单选题'
          })(
            <RadioGroup disabled>
              <Radio value='单选题'>单选题</Radio>
              <Radio value='多选题'>多选题</Radio>
            </RadioGroup>
          )}
        </Form.Item>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="题目描述"
          >
            {getFieldDecorator('description', {
              rules: [{
                required: true, message: '请输入题目描述',
              }],
            })(
              <TextArea rows={4}/>
            )}
          </Form.Item>
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
              quiz.type === '单选题' ?
                <SingleChoiceQuiz
                  options={options}
                  answer={answer}
                  radioOnChange={this.radioOnChange}
                  optionOnChange={this.optionOnChange}
                  handleDeleteSelectItem={this.handleDeleteSelectItem}
                />
                : <MulChoiceQuiz
                  options={options}
                  answer={answer}
                  radioOnChange={this.radioOnChange}
                  optionOnChange={this.optionOnChange}
                  handleDeleteSelectItem={this.handleDeleteSelectItem}
                />
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
