import React from 'react'
import {Button, Col, DatePicker, Form, Input, Modal, Row} from 'antd'
import {message} from "antd/lib/index";
import moment from 'moment'

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

class EditClassCourseModal extends React.Component {
    handleSubmit = (e) => {
        const {classCourse} = this.props
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(classCourse, values)
                const {id, title, endTime, code} = classCourse
                this.props.editClassCourse({classCourse: {id, title, endTime, code}}, () => {
                    message.success('编辑成功')
                    this.props.closeModal()
                })
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        const {classCourse, form} = nextProps
        if (classCourse === this.props.classCourse) {
            return false
        }
        const {title, code, endTime} = classCourse
        form.setFieldsValue({title, code, endTime: moment(endTime)})
    }

    resetCode = () => {
        const {form} = this.props
        const code = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)

        form.setFieldsValue({code})
    }

    render() {
        const {isNewModalOpen, closeModal, form} = this.props
        const {getFieldDecorator} = form

        return <div>
            <Modal
                title='添加班课'
                visible={isNewModalOpen}
                footer={null}
                onCancel={() => closeModal()}
            >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="班课名称"
                    >
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true, message: '请输入班课名称',
                            }],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="口令"
                    >
                        {getFieldDecorator('code', {
                            rules: [{
                                required: true, message: '请输入班课口令',
                            }],
                        })(
                            <Input disabled/>
                        )}
                        <a onClick={this.resetCode}>重置code</a>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="截止时间"
                    >
                        {getFieldDecorator('endTime', {
                            rules: [{
                                required: true, message: '请选择截止时间',
                            }],
                        })(
                            <DatePicker
                                disabledDate={startValue => startValue.valueOf() < new Date().getTime()}/>
                        )}
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

const NewClassCourseModalForm = Form.create()(EditClassCourseModal)

export default NewClassCourseModalForm
