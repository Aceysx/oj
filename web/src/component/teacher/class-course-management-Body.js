import React, {Component} from 'react'
import {connect} from 'react-redux'

class ClassCourseManagementBody extends Component {
  render () {
    return <div >
           班课管理
        </div>
  }
}

const mapStateToProps = ({user}) => ({
  user
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassCourseManagementBody)
