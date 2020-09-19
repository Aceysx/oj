import React, {Component} from 'react'
import {Divider, Select, Tag, Input} from 'antd'

const Option = Select.Option

class PaperBindQuizAttributeBox extends Component {

  getMajorList = () => {
    const {majors} = this.props
    return majors.map(major => <Option key={major.id} value={major.id}>{major.name}</Option>)
  }

  getChapterList = () => {
    return this.props.chapters.map((item, index) =>
      <Option key={index} value={item.chapter}>{item.chapter}</Option>)
  }

  render() {
    const {quizzes,paper,updatePaper,currentMajorId,currentChapter,currentLevel,currentQuizType} = this.props
    return <div><p>
      <Tag color="#f68">题目数量</Tag>
        <Input style={{width: 120}}
               type='number' value={paper.quizNumber}
               onChange={e => updatePaper('quizNumber', e.target.value)} />
      <Divider type='vertical'/>
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
      <Tag color="#e2df18">题目类型</Tag>
      <Select
        style={{width: 120}}
        value={currentQuizType}
        onChange={this.props.quizTypeChangeHandle}
      >
        <Option value="">全部</Option>
        <Option value="单选题">单选题</Option>
        <Option value="多选题">多选题</Option>
        <Option value="识图题">识图题</Option>
        <Option value="判断题">判断题</Option>
      </Select>
      <p style={{display:'none'}}>
      {paper["currentMajorId"] = currentMajorId}
      {paper["currentChapter"] = currentChapter}
      {paper["currentLevel"] = currentLevel}
      {paper["currentQuizType"] = currentQuizType}
      </p>
    </p>
    </div>
  }
}

export default PaperBindQuizAttributeBox