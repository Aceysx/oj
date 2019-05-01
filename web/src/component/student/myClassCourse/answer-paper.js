import React, {Component} from 'react'
import Paper from '../../common/paper'
import {connect} from 'react-redux'
import {getPaper, submit} from "../../../action/paper-action"
import {Row, Button, Icon, Popconfirm, message, Divider} from "antd";

class AnswerPaper extends Component {
  state = {
    paperId: -1,
    classCourseId: -1,
    answers: {}
  }

  componentDidMount = () => {
    const {paperId, classCourseId} = this.props.match.params
    this.props.getPaper(paperId)
    this.setState({paperId, classCourseId})

  }

  onChange = (quizId, answer) => {
    const {answers} = this.state
    answers[quizId] = answer
    this.setState({answers})
  }

  submit = () => {
    const {answers, paperId, classCourseId} = this.state
    const {paper} = this.props
    if (paper.quizzes.length !== Object.keys(answers).length) {
      message.warning('还有未完成的题目')
      return
    }
    this.props.submit(classCourseId, paperId, answers, () => {
      this.props.history.goBack()
    });
  }

  render() {
    const {paper} = this.props
    const {answers} = this.state
    return <div>
      <Row type='flex' justify='space-between'>
      <a onClick={() => this.props.history.goBack()}>
        <Icon type="arrow-left"/> 返回
      </a>

      <Popconfirm title="确定提交吗?"
                  onConfirm={this.submit}
                  okText="提交" cancelText="取消">
        <Button type='primary'>提交</Button>
      </Popconfirm>
      </Row>
      <Divider/>
      <Paper
        answers={answers}
        onChange={this.onChange}
        paper={paper}
      />

    </div>
  }
}

const mapStateToProps = ({paper}) => ({
  paper
})

const mapDispatchToProps = (dispatch) => ({
  getPaper: paperId => dispatch(getPaper(paperId)),
  submit: (classCourseId, paperId, answers, callback) => dispatch(submit(classCourseId, paperId, answers, callback))
})
export default connect(mapStateToProps, mapDispatchToProps)(AnswerPaper)