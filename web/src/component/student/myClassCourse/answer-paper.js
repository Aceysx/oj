import React, {Component} from 'react'
import Paper from '../../common/paper'
import {connect} from 'react-redux'
import {getPaper} from "../../../action/paper-action"
import {Button, Icon} from "antd";

class AnswerPaper extends Component {
  state = {
    paperId: -1,
    answers: []
  }

  componentDidMount = () => {
    const {paperId} = this.props.match.params
    this.props.getPaper(paperId)
    this.setState({paperId})
  }

  onChange = (quizId, answer)=>{
    const {answers} = this.state
    answers[quizId] = answer
    this.setState({answers})
  }

  render() {
    const {paper} = this.props
    const {answers} = this.state
    return <div>
      <a onClick={() => this.props.history.goBack()}>
        <Icon type="arrow-left" /> 返回</a>
      <Paper
        answers={answers}
        onChange={this.onChange}
        paper={paper}
      />
      <div  style={{textAlign:'center'}}>
        <Button type='primary'>提交</Button>
      </div>
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