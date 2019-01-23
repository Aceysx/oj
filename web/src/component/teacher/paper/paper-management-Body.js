import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Divider, Table} from 'antd'
import NewPaperBox from './new-paper-box'

class PaperManagementBody extends Component {
  state = {
    isShowNewPaperBox: false
  }

  componentDidMount = () => {
  }
  render () {
    const columns = [
      {
        title: '名称',
        dataIndex: 'title',
        key: 'title'
      }, {
        title: '口令',
        dataIndex: 'code',
        key: 'code'
      }, {
        title: '截止时间',
        dataIndex: 'endTime',
        key: 'endTime'
      }, {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => {
          return <div>
            <a onClick={() => this.setState({isEditModalOpen: true, classCourse: record})}>编辑</a>
            <Divider type='vertical' />
            <a>绑定试卷</a>
          </div>
        }
      }
    ]
    const {classCoursesPageable} = this.props
    const {totalElements, content} = classCoursesPageable || {}
    const {currentPage, isShowNewPaperBox} = this.state

    return <div >
      <p><Button
        type="primary"
        onClick={()=>this.setState({isShowNewPaperBox:true})}>
        添加试卷
      </Button></p>
      {
        isShowNewPaperBox ?
          <NewPaperBox
            visible={isShowNewPaperBox}
            onCancel={()=>this.setState({isShowNewPaperBox:false})}/>
          :''
      }

      <Table
        bordered
        columns={columns}
        dataSource={content}
        rowKey='id'
        onChange={(pagination) => this.getClassCourse(pagination)}
        pagination={{
          defaultCurrent : currentPage,
          total: totalElements
        }}/>


    </div>
  }
}

const mapStateToProps = ({user}) => ({
  user
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PaperManagementBody)
