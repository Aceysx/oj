import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Divider, message, Steps} from 'antd'
import Modal from "antd/es/modal/Modal";
import PaperBindQuizBox from "./paper-bind-quiz-Box";
import PaperBasicInfoModal from './paper-basic-info-modal'
import {getMajors} from '../../../action/major-action'
import {getQuizzes} from "../../../action/quiz-action";
import Paper from '../../common/paper'
import {addPaper} from "../../../action/paper-action";

const Step = Steps.Step

class NewPaperBox extends Component {
  state = {
    current: 0,
    currentMajorId: -1,
    currentChapter: -1,
    currentLevel: -1,
    paper: {
      title: '',
      quizzes: []
    },
    targetKeys: []
  }

  componentDidMount = () => {
    this.props.getMajors()
    this.props.getQuizzes()
  }

  next = () => {
    const current = this.state.current + 1;
    this.setState({current});
  }

  prev = () => {
    const current = this.state.current - 1;
    this.setState({current});
  }

  updatePaperTitle = (title) => {
    const {paper} = this.state
    paper.title = title
    this.setState({paper})
  }

  reset = () => {
    this.setState({
      currentMajorId: -1,
      currentChapter: -1,
      currentLevel: -1
    })
  }

  updatePaperQuizzes = (targetKeys) => {
    let {quizzes} = this.props
    let {paper} = this.state
    paper.quizzes = quizzes.filter(quiz => targetKeys.includes(quiz.id.toString()))

    this.setState({targetKeys, paper})
  }
  addPaper = () => {
    const {paper} = this.state
    this.props.addPaper(paper, () => {
      message.success('添加成功')
      this.props.onCancel()
    })
  }
  render() {
    const {current, targetKeys, paper, currentMajorId, currentChapter, currentLevel} = this.state
    const {majors, quizzes} = this.props
    const steps = [{
      title: '创建试卷',
      content: <PaperBasicInfoModal
        paper={paper}
        onChangeHandle={(e) => this.updatePaperTitle(e.target.value)}/>,
    }, {
      title: '绑定试题',
      content: <PaperBindQuizBox
        currentMajorId={currentMajorId}
        currentChapter={currentChapter}
        currentLevel={currentLevel}
        majorChangeHandle={currentMajorId => this.setState({currentMajorId})}
        levelChangeHandle={currentLevel => this.setState({currentLevel})}
        chapterChangeHandle={currentChapter => this.setState({currentChapter})}
        reset={this.reset}
        quizzes={quizzes}
        majors={majors}
        targetKeys={targetKeys}
        updatePaperQuizzes={this.updatePaperQuizzes}
      />,
    }, {
      title: '完成',
      content: <Paper paper={paper}/>,
    }];


    return <Modal
      maskClosable={false}
      title={<Steps style={{width: '90%'}} current={current}>
        {steps.map(item => <Step key={item.title} title={item.title}/>)}
      </Steps>}
      width='90%'
      visible={this.props.visible}
      footer={null}
      onCancel={() => this.props.onCancel()}
    >
      <div className="steps-content">
        {steps[current].content}
      </div>
      <Divider type='horizontal'/>
      <div className="steps-action">
        {
          current < steps.length - 1
          && <Button type="primary" onClick={() => this.next()}>下一步</Button>
        }
        {
          current === steps.length - 1
          && <Button type="primary" onClick={this.addPaper}>完成</Button>
        }
        {
          current > 0
          && (
            <Button style={{marginLeft: 8}} onClick={() => this.prev()}>
              上一步
            </Button>
          )
        }
      </div>
    </Modal>
  }
}

const mapStateToProps = ({user, quizzes, majors}) => ({
  user,
  majors,
  quizzes
})

const mapDispatchToProps = dispatch => ({
  addPaper: (paper, callback) => dispatch(addPaper(paper, callback)),
  getMajors: () => dispatch(getMajors()),
  getQuizzes: () => dispatch(getQuizzes())
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPaperBox)
