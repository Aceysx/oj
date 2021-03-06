import React, {Component} from 'react'
import {Button, Divider, Form, Input, message, Pagination, Select, Tag, Transfer} from 'antd'
import Modal from "antd/es/modal/Modal";
import {addPaper, editPaper} from "../../../action/paper-action";
import {connect} from "react-redux";
import Paper from "../../common/paper";

const {Option} = Select
const PAGE_SIZE = 10

class NewPaperBox extends Component {
    state = {
        currentMajorId: -1,
        currentChapter: -1,
        currentLevel: -1,
        currentPage: 1,
        displayAll: false,
        previewQuizzes: [],
        paper: {
            title: '',
            id: '',
            quizzes: []
        },
        targetKeys: []
    }

    componentDidMount() {
        const {paper = {title: '', quizzes: []}, quizzes} = this.props
        let targetKeys = paper.quizzes
        if (paper.id) {
            targetKeys = paper.quizzes.map(quiz => quiz.id.toString());
            paper.quizzes = targetKeys
        }
        const previewQuizzes = quizzes.filter(quiz => targetKeys.includes(quiz.id.toString()))
        console.log(paper)
        this.setState({paper, targetKeys, previewQuizzes});
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps')
        const {paper = {title: '', quizzes: []}, quizzes} = nextProps
        let targetKeys = []
        if (!paper.id || paper.id === this.state.paper.id) {
            return false
        }
        targetKeys = paper.quizzes.map(quiz => quiz.id.toString())
        const previewQuizzes = quizzes.filter(quiz => targetKeys.includes(quiz.id.toString()))
        paper.quizzes = targetKeys
        console.log(paper)
        this.setState({paper, targetKeys, previewQuizzes});
    }

    reset = () => {
        this.setState({
            currentMajorId: -1,
            currentChapter: -1,
            currentLevel: -1,
            displayAll: true
        })
    }

    updatePaperQuizzes = (targetKeys) => {
        let {paper} = this.state
        const {quizzes} = this.props
        const previewQuizzes = quizzes.filter(quiz => targetKeys.includes(quiz.id.toString()))
        paper.quizzes = targetKeys

        this.setState({targetKeys, paper, previewQuizzes})
    }

    validate = paper => {
        const {title, quizzes} = paper
        if (!title) {
            message.warn('试卷名称不能为空')
            return false
        }
        if (!(quizzes || []).length > 0) {
            message.warn('请选择题目')
            return false
        }
        return true
    }
    operPaper = () => {
        const {paper} = this.state

        if (!this.validate(paper)) {
            return
        }
        paper.quizzes = paper.quizzes.map(id => {
                return {id}
            }
        )
        if (paper.id) {
            this.props.editPaper(paper, () => {
                message.success('编辑成功')
                this.props.onCancel()
            });
        } else {
            this.props.addPaper(paper, () => {
                message.success('添加成功')
                this.props.onCancel()
            });
        }

    }

    filter = quizzes => {
        let result = quizzes
        const {currentMajorId, currentChapter, currentLevel, currentPage, displayAll} = this.state
        if (displayAll) {
            return {data: result, total: result.length}
        }
        if (currentChapter === -1 && currentLevel === -1 && currentMajorId === -1) {
            return {data: [], total: 0};
        }
        if (currentChapter !== -1) {
            result = result.filter(quiz => quiz.chapter === currentChapter);
        }
        if (currentMajorId !== -1) {
            result = result.filter(quiz => {
                if (!quiz.major) return false
                return quiz.major.id === currentMajorId
            })
        }
        if (currentLevel !== -1) {
            result = result.filter(quiz => quiz.level === currentLevel)
        }
        return {
            data: result.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
            total: result.length
        }
    }

    getQuizzesDataSource = (quizzes) => {
        const page = this.filter(quizzes)
        page.data = page.data.map(quiz => {
            return {
                key: quiz.id.toString(),
                title: quiz.description,
                description: <span key={quiz.id}>
          <Tag color="#2db7f5">章节</Tag>{quiz.chapter}<Divider type='vertical'/>
          <Tag color="green">{quiz.type}</Tag>
          </span>,
            };
        })
        return page
    }
    getMajorList = () => {
        const {majors} = this.props
        return majors.map(major => <Option key={major.id} value={major.id}>{major.name}</Option>)
    }

    getChapterList = () => {
        return this.props.chapters.map((item, index) =>
            <Option key={index} value={item.chapter}>{item.chapter}</Option>)
    }

    renderItem = (item) => {
        const customLabel = (
            <span className="custom-item">
        {item.title} - {item.description}
      </span>
        )
        return {
            label: customLabel,
            value: item.title,
        }
    }

    render() {
        const {targetKeys, paper, currentMajorId, currentChapter, currentLevel, previewQuizzes} = this.state
        const {quizzes = [], visible} = this.props
        const dataSource = this.getQuizzesDataSource(quizzes)
        console.log(paper)
        return <Modal
            maskClosable={false}
            title={paper.id ? '编辑试卷' : '创建试卷'}
            width='100%%'
            visible={visible}
            onOk={this.operPaper}
            onCancel={() => this.props.onCancel()}
        >
            <div>
                <Form.Item
                    label='试卷名称'>
                    <Input value={paper.title} onChange={e => {
                        paper.title = e.target.value
                        this.setState({paper})
                    }}/>
                </Form.Item>
                <p>
                    <Tag color="#f50">课程名称</Tag>
                    <Select value={currentMajorId}
                            style={{width: 120}}
                            onChange={currentMajorId => this.setState({
                                currentMajorId,
                                currentPage: 1,
                                displayAll: false
                            })}>
                        <Option value={-1}>全部</Option>
                        {this.getMajorList()}
                    </Select>

                    <Divider type='vertical'/>
                    <Tag color="#2db7f5">章节</Tag>
                    <Select value={currentChapter}
                            style={{width: 120}}
                            onChange={currentChapter => this.setState({
                                currentChapter,
                                currentPage: 1,
                                displayAll: false
                            })}>
                        <Option value={-1}>全部</Option>
                        {this.getChapterList(quizzes)}
                    </Select>

                    <Divider type='vertical'/>
                    <Tag color="#87d068">难度</Tag>
                    <Select value={currentLevel}
                            style={{width: 120}}
                            onChange={currentLevel => this.setState({currentLevel, currentPage: 1, displayAll: false})}>
                        <Option value={-1}>全部</Option>
                        <Option value='一级'>一级</Option>
                        <Option value='二级'>二级</Option>
                        <Option value='三级'>三级</Option>
                        <Option value='四级'>四级</Option>
                    </Select>
                    <Divider type='vertical'/>
                    <Button
                        type="primary"
                        icon="search"
                        onClick={this.reset}>
                        查看所有绑定题目
                    </Button>
                </p>
                <Transfer
                    dataSource={dataSource.data}
                    showSearch
                    listStyle={{
                        width: '45%',
                        height: '450px',
                    }}
                    operations={['添加', '移除']}
                    targetKeys={[...targetKeys]}
                    onChange={this.updatePaperQuizzes}
                    render={this.renderItem}
                />
                {
                    dataSource.total
                        ? <div style={{margin: '10px 0'}}><Pagination
                            defaultCurrent={1}
                            onChange={currentPage => this.setState({currentPage})}
                            total={dataSource.total}/>
                        </div>
                        : ''
                }

            </div>

            <Divider orientation="left">预览</Divider>
            <Paper paper={{...paper, quizzes: previewQuizzes}}
                   preview onChange={() => {
            }}/>
        </Modal>
    }
}

const mapDispatchToProps = dispatch => ({
    addPaper: (paper, callback) => dispatch(addPaper(paper, callback)),
    editPaper: (paper, callback) => dispatch(editPaper(paper, callback)),

})

export default connect(null, mapDispatchToProps)(NewPaperBox)
