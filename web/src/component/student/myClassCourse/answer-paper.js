import React, {Component} from 'react'
import Paper from '../../common/paper'
import {connect} from 'react-redux'
import {getPaper, getReviewQuiz, submit} from "../../../action/paper-action"
import {Button, Divider, Icon, Popconfirm, Row} from "antd";
import moment from "moment";

let interval = '';
class AnswerPaper extends Component {
  state = {
    paperId: -1,
    classCourseId: -1,
    answers: {},
    restTime: 1
  }

  componentDidMount = () => {
    const submit = this.submit
    window.onblur = function() {
      submit()
    };
    window.document.addEventListener("visibilitychange", function() {
      if(document.visibilityState == "hidden") {
        submit()
      }
    });
    const {paperId, classCourseId} = this.props.match.params
    this.props.getReviewQuiz(classCourseId, paperId)
    this.props.getPaper(paperId)
    this.setState({paperId, classCourseId})
    interval = window.setInterval(() => {
      const restTime = this.getRestTime()
      if (restTime <= 0) {
        this.submit()
        window.clearInterval(interval)
        return
      }
      this.setState({restTime});
    }, 1000)
  }

  onChange = (quizId, answer) => {
    const {answers} = this.state
    answers[quizId] = answer
    this.setState({answers})
  }

  submit = () => {
    const {answers, paperId, classCourseId} = this.state
    this.props.submit(classCourseId, paperId, answers, () => {
      this.props.history.goBack()
    });
  }
  getRestTime = () => {
    const {paperReviewQuiz, paper} = this.props
    const {reviewQuiz} = paperReviewQuiz
    if (!reviewQuiz) {
      return 0
    }
    const startTime = new Date(moment(reviewQuiz.startTime).format()).getTime()/1000;
    const nowTime = new Date().getTime()/1000
    const timeBox = parseInt(paper.timeBox) * 60
    return  (timeBox +startTime) - nowTime
  }

  render() {
    const {paper} = this.props

    const {answers, restTime} = this.state
    return <div>
      <Row type='flex' justify='space-between'>
        <div>
          <a onClick={() => this.props.history.goBack()}>
            <Icon type="arrow-left"/> 返回
          </a>
          <Divider type='vertical'/>
          <span>倒计时： {parseInt(restTime / 60,10)} 分 {parseInt(restTime % 60,10)} 秒</span>
        </div>
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

const mapStateToProps = ({paper, paperReviewQuiz}) => ({
  paper,
  paperReviewQuiz
})

const mapDispatchToProps = (dispatch) => ({
  getPaper: paperId => dispatch(getPaper(paperId)),
  getReviewQuiz: (classCourseId, paperId) => dispatch(getReviewQuiz(classCourseId, paperId)),
  submit: (classCourseId, paperId, answers, callback) => dispatch(submit(classCourseId, paperId, answers, callback))
})
export default connect(mapStateToProps, mapDispatchToProps)(AnswerPaper)