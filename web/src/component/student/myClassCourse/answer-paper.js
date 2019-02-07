import React, {Component} from 'react'
import Paper from '../../common/paper'
import {connect} from 'react-redux'
import {getPaper} from "../../../action/paper-action"
import {Icon} from "antd";

class AnswerPaper extends Component {

  componentDidMount = () => {
    const paperId = this.props.match.params.paperId
    this.props.getPaper(paperId)
  }

  render() {
    const {paper} = this.props
    return <div>
      <a onClick={() => this.props.history.goBack()}>
        <Icon type="arrow-left" /> 返回</a>
      <Paper
        paper={paper}
      />
    </div>
  }
}

const mapStateToProps = ({paper}) => ({
  paper
})

const mapDispatchToProps = (dispatch) => ({
  getPaper: paperId => dispatch(getPaper(paperId))
})
export default connect(mapStateToProps, mapDispatchToProps)(AnswerPaper)