import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Divider, message, Steps} from 'antd'
import Modal from "antd/es/modal/Modal";
import PaperBindQuizBox from "./paper-bind-quiz-Box";
import PaperBasicInfoModal from './paper-basic-info-modal'
import {getMajors} from '../../../action/major-action'
import {getQuizzes} from "../../../action/quiz-action";

const Step = Steps.Step

class NewPaperBox extends Component {
  state = {
    current: 0,
    paper : {
      title: '',
      major: -1,
      chapter: -1,
      level: -1,
    },
    mockData: [],
    targetKeys: []
  }

  componentDidMount = () => {
    this.props.getMajors()
    this.props.getQuizzes()
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({mockData, targetKeys});
  }

  next = ()=> {
    const current = this.state.current + 1;
    this.setState({current});
  }

  prev = () =>{
    const current = this.state.current - 1;
    this.setState({current});
  }

  updatePaperTitle = (title) => {
    const {paper} = this.state
    paper.title = title
    this.setState({paper})
  }

  render() {
    const {mockData,current, targetKeys, paper} = this.state
    const {majorPageable, quizzes} = this.props

    const steps = [{
      title: '创建试卷',
      content: <PaperBasicInfoModal
          paper={paper}
          onChangeHandle={(e)=> this.updatePaperTitle(e.target.value)}/>,
    }, {
      title: '绑定试题',
      content: <PaperBindQuizBox
        quizzes={quizzes}
        majorPageable={majorPageable}
        mockData={mockData}
        targetKeys={targetKeys}
      />,
    }, {
      title: '完成',
      content: 'Last-content',
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
          && <Button type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
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

const mapStateToProps = ({user, quizzes, majorPageable}) => ({
  user,
  majorPageable,
  quizzes
})

const mapDispatchToProps = dispatch => ({
  getMajors: () => dispatch(getMajors()),
  getQuizzes: () => dispatch(getQuizzes())
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPaperBox)
