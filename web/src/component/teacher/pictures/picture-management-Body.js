import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Divider, Table} from 'antd'
import NewPictureModal from './new-picture-modal'
import {addPicture, editPicture, getPictures} from "../../../action/picture-action";
import EditPictureModal from './edit-picture-modal'

class PictureManagementBody extends Component {
  state = {
    currentPage: 1,
    isNewModalOpen: false,
    isEditModalOpen: false
  }

  componentDidMount = () => {
    this.props.getPictures(this.state.currentPage)
  }

  getPictures = (pagination) => {
    const {current} = pagination
    this.setState({currentPage: current}, () => {
      this.props.getClassCourses(current)
    })
  }

  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'title',
        key: 'title'
      }, {
        title: 'url',
        dataIndex: 'url',
        key: 'url',
        render: url => {
          return <span>{url.substr(0, 40)}...</span>
        }
      }, {
        title: '章节',
        dataIndex: 'chapter',
        key: 'chapter'
      }, {
        title: '添加时间',
        dataIndex: 'createTime',
        key: 'createTime'
      }, {
        title: '标注个数',
        dataIndex: 'labels',
        key: 'labels',
        render: text => text.length
      }, {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, picture) => {
          return <div>
            <a onClick={() => this.setState({isEditModalOpen: true, picture})}>编辑</a>
            <Divider type='vertical'/>
            <a onClick={() => this.props.history.push(`/teachers/pictures/${picture.id}/labels`)}>标注</a>
          </div>
        }
      }
    ]
    const {picturesPageable} = this.props
    const {totalElements, content} = picturesPageable
    const {currentPage, isNewModalOpen, isEditModalOpen, picture} = this.state

    return <div>
      <p><Button
        type="primary"
        onClick={() => this.setState({isNewModalOpen: true})}>
        添加图片
      </Button></p>

      <NewPictureModal
        isNewModalOpen={isNewModalOpen}
        closeModal={() => this.setState({isNewModalOpen: false})}
        addPicture={this.props.addPicture}
      />
      <EditPictureModal
        isEditModalOpen={isEditModalOpen}
        picture={picture}
        closeModal={() => this.setState({isEditModalOpen: false})}
        editPicture={this.props.editPicture}
      />
      <Table
        bordered
        columns={columns}
        dataSource={content}
        rowKey='id'
        onChange={(pagination) => this.getPictures(pagination)}
        pagination={{
          defaultCurrent: currentPage,
          total: totalElements
        }}/>
    </div>
  }
}

const mapStateToProps = ({user, picturesPageable}) => ({
  user,
  picturesPageable,
})

const mapDispatchToProps = dispatch => ({
  getPictures: (current) => dispatch(getPictures(current)),
  addPicture: (picture, callback) => dispatch(addPicture(picture, callback)),
  editPicture: (picture, callback) => dispatch(editPicture(picture, callback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PictureManagementBody)
