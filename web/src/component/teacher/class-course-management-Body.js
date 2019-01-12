import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Divider, Table} from 'antd'
import {getClassCourses} from '../../action/class-course-action'

class ClassCourseManagementBody extends Component {
  state ={
    currentPage: 1
  }

  componentDidMount = () =>{
    this.props.getClassCourses(this.state.currentPage)
  }

  getClassCourse = (pagination) => {
    const {current} = pagination
    this.setState({currentPage: current}, () => {
      this.props.getClassCourses(current)
    })
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
            <a>编辑</a>
            <Divider type='vertical' />
            <a>绑定试卷</a>
          </div>
        }
      }
    ]
    const {classCoursesPageable} = this.props
    const {totalElements, content} = classCoursesPageable
    const {currentPage} = this.state

    return <div >
      <Table
        columns={columns}
        dataSource={content}
        onChange={(pagination) => this.getClassCourse(pagination)}
        pagination={{
          defaultCurrent : currentPage,
          total: totalElements
        }}/>
    </div>
  }
}

const mapStateToProps = ({user, classCoursesPageable}) => ({
  user,
  classCoursesPageable
})

const mapDispatchToProps = dispatch => ({
  getClassCourses: (current) => dispatch(getClassCourses(current))
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassCourseManagementBody)
