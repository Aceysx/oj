import React, {Component} from 'react'
import {Button, Divider, Form, Input, Select, Tag, Transfer} from 'antd'

const Option = Select.Option

class PaperBindQuizBox extends Component {
    handleChange = (targetKeys) => {
        this.props.updatePaperQuizzes(targetKeys)
    }

    filter = quizzes => {
        let result = quizzes
        const {currentMajorId, currentChapter, currentLevel} = this.props
        if (currentChapter === -1 && currentLevel === -1 && currentMajorId === -1) {
            return []
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
        return result
    }

    getQuizzesDataSource = (quizzes) => {
        quizzes = this.filter(quizzes)
        return quizzes.map(quiz => {
            return {
                key: quiz.id.toString(),
                title: quiz.description,
                description: <span>
          <Tag color="#2db7f5">章节</Tag>{quiz.chapter}<Divider type='vertical'/>
          <Tag color="green">{quiz.type}</Tag>
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
    getMajorList = () => {
        const {majors} = this.props
        return majors.map(major => <Option key={major.id} value={major.id}>{major.name}</Option>)
    }

    getChapterList = () => {
        return this.props.chapters.map((item, index) =>
            <Option key={index} value={item.chapter}>{item.chapter}</Option>)
    }

    render() {
        const {quizzes, targetKeys, currentMajorId, currentChapter, currentLevel,title,updateTitle} = this.props
        const dataSource = this.getQuizzesDataSource(quizzes)
        return <div>
            <Form.Item
                label='试卷名称'>
                <Input value={title} onChange={e => updateTitle(e.target.value)}/>
            </Form.Item>
            <p>
                <Tag color="#f50">课程名称</Tag>
                <Select value={currentMajorId}
                        style={{width: 120}}
                        onChange={this.props.majorChangeHandle}>
                    <Option value={-1}>全部</Option>
                    {this.getMajorList()}
                </Select>

                <Divider type='vertical'/>
                <Tag color="#2db7f5">章节</Tag>
                <Select value={currentChapter}
                        style={{width: 120}}
                        onChange={this.props.chapterChangeHandle}>
                    <Option value={-1}>全部</Option>
                    {this.getChapterList(quizzes)}
                </Select>

                <Divider type='vertical'/>
                <Tag color="#87d068">难度</Tag>
                <Select value={currentLevel}
                        style={{width: 120}}
                        onChange={this.props.levelChangeHandle}>
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
                    onClick={this.props.reset}>
                    查看所有绑定题目
                </Button>

            </p>

            <Transfer
                dataSource={dataSource}
                showSearch
                listStyle={{
                    width: '45%',
                    height: '400px',
                }}
                operations={['添加', '移除']}
                targetKeys={[...targetKeys]}
                onChange={this.handleChange}
                render={this.renderItem}
            />
        </div>
    }
}

export default PaperBindQuizBox