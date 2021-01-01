import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Divider, Table} from 'antd'
import NewPaperBox from './new-paper-box'
import AutoGeneratePaper from './paper-auto-generate-paper'
import {deletePaper, getPapersByPage} from "../../../action/paper-action";
import PreviewPaperModal from "./preview-paper-modal";
import {getMajors} from "../../../action/major-action";
import {getChapters, getQuizzes} from "../../../action/quiz-action";

class PaperManagementBody extends Component {
    state = {
        isShowNewPaperBox: false,
        isPreviewModalOpen: false,
        isEditModalOpen: false,
        currentPage: 1,
        paper: {quizzes: []},
        isAutoGenerateTestPaper: false
    }

    componentDidMount = () => {
        this.props.getPapersByPage(this.state.currentPage)
        setTimeout(() => {
            this.props.getMajors()
            this.props.getQuizzes()
            this.props.getChapters()
        }, 10)
    }

    cancel = () => {
        this.setState({
            isPreviewModalOpen: false,
            isEditModalOpen: false,
            isShowNewPaperBox: false,
            paper: {quizzes: []},
            isAutoGenerateTestPaper: false
        })
    }

    getPapersByPage = (pagination) => {
        const {current} = pagination
        this.setState({currentPage: current}, () => {
            this.props.getPapersByPage(current)
        })
    }

    render() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'title',
                key: 'title'
            }, {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime'
            }, {
                title: '题目个数',
                dataIndex: 'count',
                key: 'count',
                render: (text, record) => {
                    return <span>{record.quizzes.length}</span>
                }
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: (text, paper) => {
                    return <div>
                        <a onClick={() => this.setState({isPreviewModalOpen: true, paper})}>预览</a>
                        <Divider type='vertical'/>
                        <a onClick={() => this.setState({isEditModalOpen: true, paper})}>编辑</a>
                        <Divider type='vertical'/>
                        <a onClick={() => this.props.deletePaper(paper.id)}>删除</a>
                    </div>
                }
            }
        ]
        const {paperPageable, quizzes, chapters, majors} = this.props
        const {totalElements, content} = paperPageable || {}
        const {
            currentPage, isShowNewPaperBox,
            isPreviewModalOpen, paper,
            isEditModalOpen, isAutoGenerateTestPaper
        } = this.state
        console.log(paper)
        return <div>
            <p><Button
                type="primary"
                onClick={() => this.setState({isShowNewPaperBox: true})}>
                添加试卷
            </Button>
                <Divider type='vertical'/>
                <Button
                    type="primary"
                    onClick={() => this.setState({isAutoGenerateTestPaper: true})}>
                    自动生成试卷
                </Button>
            </p>
            {
                isShowNewPaperBox ?
                    <NewPaperBox
                        visible={isShowNewPaperBox}
                        chapters={chapters}
                        majors={majors}
                        quizzes={quizzes}
                        onCancel={this.cancel}/>
                    : ''
            }
            {
                isPreviewModalOpen ?
                    <PreviewPaperModal
                        visible={isPreviewModalOpen}
                        paper={paper}
                        onCancel={this.cancel}/>
                    : ''
            }
            {
                isEditModalOpen ?
                    <NewPaperBox
                        visible={isEditModalOpen}
                        paper={paper}
                        chapters={chapters}
                        majors={majors}
                        quizzes={quizzes}
                        onCancel={this.cancel}/>
                    : ''
            }{
            isAutoGenerateTestPaper ?
                <AutoGeneratePaper
                    visible={isAutoGenerateTestPaper}
                    paper={paper}
                    onCancel={this.cancel}/>
                : ''
        }

            <Table
                bordered
                columns={columns}
                dataSource={content}
                rowKey='id'
                onChange={(pagination) => this.getPapersByPage(pagination)}
                pagination={{
                    defaultCurrent: currentPage,
                    total: totalElements
                }}/>
        </div>
    }
}

const mapStateToProps = ({user, paperPageable, quizzes,chapters,majors}) => ({
    user,
    paperPageable,
    quizzes,
    chapters,majors
})

const mapDispatchToProps = dispatch => ({
    getPapersByPage: (current) => dispatch(getPapersByPage(current)),
    deletePaper: id => dispatch(deletePaper(id)),
    getMajors: () => dispatch(getMajors()),
    getQuizzes: () => dispatch(getQuizzes()),
    getChapters: () => dispatch(getChapters())
})

export default connect(mapStateToProps, mapDispatchToProps)(PaperManagementBody)
