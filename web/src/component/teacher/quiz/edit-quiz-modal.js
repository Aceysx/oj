import React from 'react'
import {Button, Col, Form, Icon, Input, message, Modal, Radio, Row, Select, Tooltip} from 'antd'
import SingleChoiceQuiz from "./single-choice-quiz";
import MulChoiceQuiz from "./mul-choice-quiz";
import MakeQuiz from "./make-quiz";


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
    form.setFieldsValue({chapter, description, type, major:major? major.id: '',
      level, answer})
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

  getPictures = pictures => {
    return pictures.map(item => <Option key={item.id}>{item.title}</Option>)
  }

  validateOptions = () => {
    const {options, quiz} = this.props
    const validated = options.every(option => option.trim() !== '')
    if ((validated ||quiz.type === '识图题') || (validated || quiz.type === '填空题')){
      return true
    }
    message.error('请填写选项，勾选答案')
    return false
  }

  handleSubmit = (e) => {
    let {answer, options, quiz} = this.props
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && this.validateOptions()) {
        if (quiz.type === '填空题'){
            quiz = Object.assign({}, values, {
                id: quiz.id,
                options: JSON.stringify(options)
            })}
        else {
        quiz = Object.assign({}, values, {id: quiz.id, answer, options: JSON.stringify(options)})}
        this.props.editQuiz(quiz, () => {
          message.success('编辑成功')
          this.props.closeModal()
        })
      }
    })
  }


  render() {
    const {isNewModalOpen,closeModal, form, options, majors, quiz, answer} = this.props
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
              <Radio value='识图题'>识图题</Radio>
              <Radio value='填空题'>填空题</Radio>
            </RadioGroup>
          )}
        </Form.Item>

        <Form onSubmit={this.handleSubmit}>
          {quiz.type !== '识图题' ?
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
            : ''
          }
          <Form.Item
            {...formItemLayout}
            label="课程名称"
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
              <Select defaultValue='一级'>
                <Option value='一级'>一级</Option>
                <Option value='二级'>二级</Option>
                <Option value='三级'>三级</Option>
                <Option value='四级'>四级</Option>
              </Select>
            )}
          </Form.Item>
          {quiz.type === '识图题' ?
            <Form.Item
              {...formItemLayout}
              label="图片"
            >
                <Input value={quiz.picture.title} disabled/>
            </Form.Item>:''
          }
          <Form.Item
            {...formItemLayout}
            label={quiz.type === '识图题' ?'标注选项': (quiz.type === '填空题' ? '填空答案' : "选项")}
          >
            {getFieldDecorator('answer', {
              rules: [{
                required: true, message: '请填写/勾选答案',
              }],
            })
            (
              quiz.type === '单选题' ?
                <SingleChoiceQuiz
                  options={options}
                  answer={answer}
                  radioOnChange={this.radioOnChange}
                  optionOnChange={this.optionOnChange}
                  handleDeleteSelectItem={this.handleDeleteSelectItem}
                />:


                (quiz.type === '多选题'? <MulChoiceQuiz
                    options={options}
                    answer={answer}
                    radioOnChange={this.radioOnChange}
                    optionOnChange={this.optionOnChange}
                    handleDeleteSelectItem={this.handleDeleteSelectItem}
                  /> :
                  (quiz.type === '填空题'?
                    <Input answer={answer}
                    />
                    : <MakeQuiz
                      picture={quiz.picture}
                      answer={answer}
                      radioOnChange={this.radioOnChange}/>))
            )}
            {quiz.type !== '识图题' ?
              (quiz.type !== '填空题' ?
                  <Tooltip title={'添加一个选项'}>
                    <Icon style={{fontSize: 20}} type='plus-circle-o' onClick={this.handleAddSelectItem}/>
                  </Tooltip>
                :'')
              : ''
            }
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
