import React from 'react'
import {Button, Col, Form, Icon, Input, message, Modal, Radio, Row, Select, Tooltip} from 'antd'
import SingleChoiceQuiz from "./single-choice-quiz";
import MulChoiceQuiz from "./mul-choice-quiz";
import MakeQuiz from "./make-quiz";
import {Link} from "react-router-dom";

const {TextArea} = Input
const RadioGroup = Radio.Group
const {Option} = Select;

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

class NewQuizModal extends React.Component {
  state = {
    type: '单选题'
  }

  radioOnChange = (answer) => {
    this.props.updateAnswer(answer)
  }

  changeType = (type) => {
    if (type === '单选题') {
      this.props.updateAnswer('')
    } else {
      this.props.updateAnswer([]);
    }
    this.props.updateOptions(['', '', '', ''])
    this.setState({type})
  }

  optionOnChange = (index, e) => {
    const {options} = this.props
    options[index] = e.target.value
    this.props.updateOptions(options)
  }

  handleDeleteSelectItem = (index) => {
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
    const {answer} = this.props
    if ('' !== answer) {
      return true
    }
    message.error('请填写选项，勾选答案')
    return false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && this.validateOptions()) {
        let {answer, options} = this.props
        const quiz = Object.assign({}, values, {answer, options: JSON.stringify(options)});
        this.props.addQuiz(quiz, () => {
          message.success('添加成功')
          this.props.closeModal()
        })
      }
    })
  }
  getCurrentSelectPicture = (pictures, form) => {
    return pictures.find(picture => picture.id === parseInt(form.getFieldValue('pictureId'))) || {}
  }

  getPictures = pictures => {
    return pictures.map(item => <Option key={item.id}>{item.title}</Option>)
  }

  render() {
    const {picturesPageable, isNewModalOpen, closeModal, form, options, answer, majors} = this.props
    const {content = []} = picturesPageable
    const {type} = this.state
    const {getFieldDecorator} = form


    return <div>
      <Modal
        title='添加题目'
        visible={isNewModalOpen}
        width='80%'
        footer={null}
        onCancel={() => closeModal()}
      >
        <Form onSubmit={this.handleSubmit}>
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
              <RadioGroup onChange={e => this.changeType(e.target.value)}>
                <Radio value='单选题'>单选题</Radio>
                <Radio value='多选题'>多选题</Radio>
                <Radio value='识图题'>识图题</Radio>
              </RadioGroup>
            )}
          </Form.Item>
          {type !== '识图题' ?
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
              <Select defaultValue={majors[0] ? majors[0].id : -1}>
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
          {type === '识图题' ?
            <Form.Item
              {...formItemLayout}
              label="图片选择"
            >
              {getFieldDecorator('pictureId', {
                rules: [{
                  required: true, message: '输入图片名称',
                }],
              })(
                <Select
                  showSearch
                  placeholder='输入图片名称'
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={this.props.searchPictures}
                  notFoundContent={null}
                >
                  {this.getPictures(content)}
                </Select>
              )}
            </Form.Item>:''
          }
          <Form.Item
            {...formItemLayout}
            label={type === '识图题' ? '标注选项': "选项"}
          >
            {getFieldDecorator('options', {
              rules: [{
                required: true, message: '请输入选项',
              }],
            })(
              type === '单选题' ?
                <SingleChoiceQuiz
                  options={options}
                  answer={answer}
                  radioOnChange={this.radioOnChange}
                  optionOnChange={this.optionOnChange}
                  handleDeleteSelectItem={this.handleDeleteSelectItem}
                /> :
                (type === '多选题' ?
                    <MulChoiceQuiz
                      options={options}
                      answer={answer}
                      radioOnChange={this.radioOnChange}
                      optionOnChange={this.optionOnChange}
                      handleDeleteSelectItem={this.handleDeleteSelectItem}
                    /> :
                    <MakeQuiz
                      picture={this.getCurrentSelectPicture(content, form)}
                      answer={answer}
                      radioOnChange={this.radioOnChange}/>
                )
            )}
            {type !== '识图题' ?
              <Tooltip title={'添加一个选项'}>
                <Icon style={{fontSize: 20}} type='plus-circle-o' onClick={this.handleAddSelectItem}/>
              </Tooltip>
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

const NewQuizModalForm = Form.create()(NewQuizModal)

export default NewQuizModalForm
