import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserBody extends Component {
  render () {
    return <div >
           用户管理
        </div>
  }
}

const mapStateToProps = ({user}) => ({
  user
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(UserBody)
