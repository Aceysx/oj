import React, {Component} from 'react'
import {connect} from 'react-redux'


class ClassCourseBody extends Component {
    render() {

        return <div className='notification-box'>
           我的班课
        </div>
    }
}

const mapStateToProps = ({user}) => ({
    user
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassCourseBody)
