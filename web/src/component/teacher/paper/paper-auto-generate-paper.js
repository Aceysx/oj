import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Divider, message, Steps} from 'antd'
import Modal from "antd/es/modal/Modal";
import PaperBindQuizAttributeBox from "./paper-bind-quiz-attribute-box";
import PaperBasicInfoModal from './paper-basic-info-modal'
import {getMajors} from '../../../action/major-action'
import {getChapters} from "../../../action/quiz-action";
import Paper from '../../common/paper'
import {addAutoPaper} from "../../../action/paper-action";

const Step = Steps.Step

class AutoGeneratePaper extends Component {
  state = {
    current: 0,
    currentMajorId: -1,
    currentChapter: -1,
    currentLevel: -1,
    currentQuizType: "",
    paper: {
      title: '',
      id: '',
      endTime: '',
      quizzes: [],
      timeBox: '',
      quizNumber: 0,
      currentMajorId: -1,
      currentChapter: -1,
      currentLevel: -1,
      currentQuizType: "",
    },
    targetKeys: [],
    chapters:[]
  }

  componentDidMount = () => {
    this.props.getMajors()
    this.props.getChapters()
  }

  componentWillReceiveProps = (nextProps) => {
    const {paper = {title: '', quizzes: []}} = nextProps
    let targetKeys = []
    if (paper === this.state.paper) {
      return false
    }
    if (paper) {
      targetKeys = paper.quizzes.map(quiz => quiz.id.toString())
    }
    this.setState({paper, targetKeys});
  }

  next = () => {
    const {paper} = this.state
    const {title, endTime, timeBox,quizNumber} = paper
    if (timeBox === '' || title === '' || endTime === '' || timeBox===undefined || title===undefined || endTime===undefined) {
      message.warning('请完善信息')
      return
    }
    const current = this.state.current + 1;

    if (current===2){
      if (quizNumber<=0||quizNumber===''||quizNumber===undefined){
        message.warning('题目数量不合法，请重新输入')
        return
      }
    }

    this.setState({current});
  }

  prev = () => {
    const current = this.state.current - 1;
    this.setState({current});
  }

  updatePaper = (key, value) => {
    const {paper} = this.state;
    paper[key] = value
    this.setState({paper})
  }

  operPaper = () => {
    const {paper} = this.state
    if (paper.id) {
      this.props.editPaper(paper, () => {
        message.success('编辑成功')
        this.props.onCancel()
      })
    } else {
      this.props.addAutoPaper(paper, () => {
        message.success('添加成功')
        this.props.onCancel()
      })
    }

  }

  render() {
    const {current, targetKeys, paper, currentMajorId, currentChapter, currentLevel,currentQuizType} = this.state
    const {majors, quizzes,chapters} = this.props
    const steps = [{
      title: '创建试卷',
      content: <PaperBasicInfoModal
        paper={paper}
        updatePaper={this.updatePaper}/>,
    }, {
      title: '选择题目属性',
      content: <PaperBindQuizAttributeBox
        paper={paper}
        updatePaper={this.updatePaper}
        currentMajorId={currentMajorId}
        currentChapter={currentChapter}
        currentLevel={currentLevel}
        currentQuizType={currentQuizType}
        majorChangeHandle={currentMajorId => this.setState({currentMajorId}, () => {
          this.setState({
            currentChapter: -1,
            chapters: chapters.filter(item => item.majorId === currentMajorId)
          })
        })}
        levelChangeHandle={currentLevel => this.setState({currentLevel})}
        chapterChangeHandle={currentChapter => this.setState({currentChapter})}
        quizTypeChangeHandle={currentQuizType => this.setState({currentQuizType})}
        quizzes={quizzes}
        chapters={this.state.chapters}
        majors={majors}
        targetKeys={targetKeys}
      />,
    }, {
      title: '完成',
      content: <Paper paper={{...paper}} preview/>,
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
          && <Button type="primary" onClick={this.operPaper}>完成</Button>
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

const mapStateToProps = ({user, quizzes, majors,chapters}) => ({
  user,
  chapters,
  majors,
  quizzes
})

const mapDispatchToProps = dispatch => ({
  getChapters: () => dispatch(getChapters()),
  addAutoPaper: (paper, callback) => dispatch(addAutoPaper(paper, callback)),
  getMajors: () => dispatch(getMajors()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AutoGeneratePaper)
