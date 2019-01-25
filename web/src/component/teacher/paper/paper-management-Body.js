import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Divider, Table} from 'antd'
import NewPaperBox from './new-paper-box'
import {getPapersByPage} from "../../../action/paper-action";

class PaperManagementBody extends Component {
  state = {
    isShowNewPaperBox: false,
    currentPage: 1
  }

  componentDidMount = () => {
    this.props.getPapersByPage(this.state.currentPage)
  }

  render () {
    const columns = [
      {
        title: '名称',
        dataIndex: 'title',
        key: 'title'
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
      }, {
        title: '题目个数',
        dataIndex: 'count',
        key: 'count',
        render: (text, record) => {
          return <span>{record.quizzes.length}</span>
        }
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
    const {paperPageable} = this.props
    const {totalElements, content} = paperPageable || {}
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

const mapStateToProps = ({user,paperPageable}) => ({
  user,
  paperPageable
})

const mapDispatchToProps = dispatch => ({
  getPapersByPage: (current) => dispatch(getPapersByPage(current))
})

export default connect(mapStateToProps, mapDispatchToProps)(PaperManagementBody)
