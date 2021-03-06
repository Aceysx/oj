import React from 'react'
import {Button, Col, Form, Icon, Input, message, Modal, Row, Upload} from 'antd'

const { TextArea } = Input

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
// const ROOT_PATH = 'http://39.98.165.4:8004/ronhe-file-system/'
const ROOT_PATH = 'http://116.62.230.75:8000/file-server/'
function beforeUpload(file) {
  const isJPG = file.type.includes('image')
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }

  return isJPG
}


class EditPictureModal extends React.Component {
  state ={
    imageUrl: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {form,picture} = this.props
    const {imageUrl} = this.state

    if (!imageUrl) {
      message.error('请上传图片')
      return
    }
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.editPicture({...values,url:imageUrl,id:picture.id}, () => {
          message.success('修改成功')
          this.props.closeModal()
        })
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    const {picture, form} = nextProps
    if (picture === this.props.picture ) {
      return false
    }
    this.setState({imageUrl:picture.url})
    form.setFieldsValue({...picture})
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        imageUrl:ROOT_PATH+info.file.response.path,
        loading: false
      })
    }
  }

  render() {
    const {isEditModalOpen, closeModal, form} = this.props
    const {getFieldDecorator} = form
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return <div>
      <Modal
        title='编辑图片'
        visible={isEditModalOpen}
        footer={null}
        onCancel={() => closeModal()}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="图片名称"
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入名称',
              }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="图片描述"
          >
            {getFieldDecorator('description')(
              <TextArea  autosize={{ minRows: 2, maxRows: 6 }} />

            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="图片章节"
          >
            {getFieldDecorator('chapter', {
              rules: [{
                required: true, message: '请输入章节',
              }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // action="http://39.98.165.4:8004/ronhe-file-system/file/upload"
            action="http://116.62.230.75:8000/file-server/file/upload"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? <img width={200} src={imageUrl} alt="avatar" /> : uploadButton}
          </Upload>
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

const EditPictureModalForm = Form.create()(EditPictureModal)

export default EditPictureModalForm
