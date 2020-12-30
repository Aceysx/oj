import React, {Component} from 'react'
import {DatePicker, Divider, InputNumber, message, Modal, Tag, Transfer} from 'antd'
import moment from "moment";

class ClassCourseBindPaperBox extends Component {
    state = {
        classCourse: {},
        classCoursePapers: [],
        targets: []
    }

    componentWillReceiveProps = (nextProps) => {
        const {classCourse} = nextProps
        if (classCourse.id === this.state.classCourse.id) {
            return false
        }

        let classCoursePapers = classCourse.classCoursePapers;
        const stateClassCoursePapers = classCoursePapers.map(item => {
            return {...item, endTime: moment(item.endTime)}
        })
        let classCoursePaperIds = classCoursePapers.map(item => item.paperId);
        const targets = this.props.papers.filter(paper => classCoursePaperIds.includes(paper.id))
        this.setState({
            classCourse, targets, classCoursePapers: stateClassCoursePapers
        })
    }

    handleChange = (targetKeys) => {
        const {papers} = this.props
        const targets = papers.filter(paper => targetKeys.includes(paper.id.toString()))
        this.setState({targets})
    }

    getDataSource = (papers) => {
        return papers.map(paper => {
            return {
                key: paper.id.toString(),
                title: paper.title,
                description: <span>
          <span><Tag color="#2db7f5">创建者</Tag>{paper.user.username}</span>
          </span>,
            };
        })
    }

    renderItem = (item) => {
        const customLabel = (
            <span className="custom-item">
        {item.title} - {item.description}
      </span>
        );
        return {
            label: customLabel,
            value: item.title,
        };
    }

    updateClassCoursePaperEndDateTime = (paper, date) => {
        const {classCoursePapers = []} = this.state
        let found = classCoursePapers.find(item => item.paperId === paper.id);
        if (found) {
            found.endTime = date
        } else {
            classCoursePapers.push({paperId: paper.id, endTime: date})
        }
        this.setState({classCoursePapers})
    }

    updateClassCoursePaperTimeBox = (paper, timeBox) => {
        const {classCoursePapers = []} = this.state
        let found = classCoursePapers.find(item => item.paperId === paper.id);
        if (found) {
            found.timeBox = timeBox
        } else {
            classCoursePapers.push({paperId: paper.id, timeBox})
        }
        this.setState({classCoursePapers})
    }

    validate = () => {
        const {classCoursePapers} = this.state
        if (!classCoursePapers || classCoursePapers.length === 0) {
            message.warn('请先绑定试卷')
            return false
        }
        if (classCoursePapers.some(item => !item.paperId || !item.endTime || !item.timeBox)) {
            message.warn('请填写试卷截止时间和试卷考试时长')
            return false
        }
        return true
    }

    editClassCourse = () => {
        const {editClassCourse, closeModal, classCourse} = this.props
        const {classCoursePapers} = this.state
        if (!this.validate()) {
            return
        }
        classCoursePapers.forEach(item => item.endTime = moment(item.endTime).format('YYYY-MM-DD HH:mm'))
        const {id, title, code, endTime} = classCourse
        editClassCourse({classCourse: {id, title, code, endTime}, classCoursePapers}, () => {
                message.success('绑定成功')
                this.setState({classCourse: {}, targets: [], classCoursePapers: []})
                closeModal()
            }
        );
    }

    render() {
        const {papers, visible} = this.props
        const {targets, classCoursePapers = []} = this.state
        const dataSource = this.getDataSource(papers)
        const targetKeys = targets.map(target => target.id.toString())

        return <Modal
            title='绑定试卷'
            width='95%'
            okText='确定'
            cancelText='取消'
            visible={visible}
            maskClosable={false}
            onCancel={this.props.closeModal}
            onOk={this.editClassCourse}
        >
            <Transfer
                dataSource={dataSource}
                showSearch
                listStyle={{
                    width: '45%',
                    height: '500px',
                }}
                operations={['添加', '移除']}
                targetKeys={targetKeys}
                onChange={this.handleChange}
                render={this.renderItem}
            />
            <div>
                {
                    papers.filter(paper => targetKeys.includes(paper.id.toString()))
                        .map(paper => {
                            const found = classCoursePapers.find(item => item.paperId === paper.id) || {}
                            return <p key={paper.id}>
                                 <span className="custom-item">
                                    {paper.title}
                                 </span>
                                <span><Divider type={'vertical'}/>
                              <span>
                                  <Tag color="#2db7f5">创建者</Tag>{paper.user.username}</span>
                              <Divider type={'vertical'}/>
                              <span>
                                  <Tag color="#1d1af5">截止时间</Tag>
                                  <DatePicker showTime
                                              defaultValue={found.endTime}
                                              onChange={date => this.updateClassCoursePaperEndDateTime(paper, date)}
                                              format="YYYY-MM-DD HH:mm"/>
                              </span>
                                    <span>
                                  <Tag color="#1d1af5">考试时长</Tag>
                                  <InputNumber min={1} defaultValue={found.timeBox}
                                               onChange={timeBox => this.updateClassCoursePaperTimeBox(paper, timeBox)}/>
                              </span>
                              </span>
                            </p>
                        })
                }
            </div>
        </Modal>
    }
}

export default ClassCourseBindPaperBox