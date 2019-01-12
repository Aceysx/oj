import React, {Component} from 'react'
import {connect} from 'react-redux'

class Index extends Component {
    render() {
        return <div >
           首页
        </div>
    }
}

const mapStateToProps = ({user}) => ({
    user
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
