import React from 'react'
import {Button, Col, Radio, Form, Input, message, Modal, Row, Tooltip, Icon, Select} from 'antd'
import majorPageable from "../../reducer/major";

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

class NewQuizModal extends React.Component {

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
    let {options, answer} = this.props
    console.log(answer)

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
    const validated = options.every(option => option.trim() !== '')
      && answer !== -1 && answer < options.length
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
        const {answer, options} = this.props

        const quiz = Object.assign({}, values, {answer, options: JSON.stringify(options)})
        this.props.addQuiz(quiz, () => {
          message.success('添加成功')
          this.props.closeModal()
        })
      }
    })
  }


  render() {
    const {isNewModalOpen, closeModal, form, options, answer, majorPageable} = this.props
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
              <Select defaultValue={majors[0] ?  majors[0].id : -1}>
                {
                  majors.map(major =>
                    <Option value={major.id}>{major.name}</Option>
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
            {getFieldDecorator('options', {
              rules: [{
                required: true, message: '请输入选项',
              }],
            })(
              <RadioGroup onChange={this.radioOnChange.bind(this)} value={answer}>
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
          <Row type='flex' align='center'>
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

const NewQuizModalForm = Form.create()(NewQuizModal)

export default NewQuizModalForm
