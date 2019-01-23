import React, {Component} from 'react'
import {Button, Divider, Select, Tag, Transfer} from 'antd'

const Option = Select.Option

class PaperBindQuizBox extends Component {

  handleChange = (targetKeys) => {
    this.props.updatePaperQuizzes(targetKeys)
  }

  filter = quizzes => {
    let result = quizzes
    const {currentMajorId,currentChapter,currentLevel} = this.props
    if (currentChapter !== -1) {
      result = result.filter(quiz => quiz.chapter === currentChapter)
    }
    if (currentMajorId !== -1) {
      result = result.filter(quiz => quiz.major.id === currentMajorId)
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
        description:  <span>
          <Tag color="#2db7f5">章节</Tag>{quiz.chapter }<Divider type='vertical'/>
          <Tag color="#f50">专业</Tag>{quiz.major.name }
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

  getChapterList = (quizzes) => {
    const chapters = new Set()
    quizzes.forEach(quiz => chapters.add(quiz.chapter))
    return Array.from(chapters).map((chapter, index) =>
      <Option key={index} value={chapter}>{chapter}</Option>)
  }

  render() {
    const {quizzes, targetKeys, currentMajorId,currentChapter,currentLevel} = this.props
    const dataSource = this.getQuizzesDataSource(quizzes)

    return <div><p>
      <Tag color="#f50">专业</Tag>
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
        <Option value='简单'>简单</Option>
        <Option value='一般'>一般</Option>
        <Option value='困难'>困难</Option>
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
          width: '47%',
          height: '400px',
        }}
        targetKeys={[...targetKeys]}
        onChange={this.handleChange}
        render={this.renderItem}
      />
    </div>
  }
}

export default PaperBindQuizBox