import React, {Component} from 'react'
import {Button, Divider, Select, Tag, Transfer} from 'antd'

const Option = Select.Option

class PaperBindQuizBox extends Component {


  handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys);
    this.setState({targetKeys});
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
    const {majorPageable} = this.props
    return majorPageable.map(major => <Option key={major.id} value={major.id}>{major.name}</Option>)
  }
  getChapterList = (quizzes) => {
    const chapters = new Set()
    quizzes.forEach(quiz => chapters.add(quiz.chapter))
    return Array.from(chapters).map((chapter,index) =>
      <Option key={index} value={chapter}>{chapter}</Option>)
  }

  render() {
    const {mockData, targetKeys, quizzes} = this.props

    return <div><p>
      <Tag color="#f50">专业</Tag>
      <Select value="-1" style={{width: 120}}>
        <Option value='-1'>全部</Option>
        {this.getMajorList()}
      </Select>

      <Divider type='vertical'/>
      <Tag color="#2db7f5">章节</Tag>
      <Select value="-1" style={{width: 120}}>
        <Option value="-1">全部</Option>
        {this.getChapterList(quizzes)}
      </Select>

      <Divider type='vertical'/>
      <Tag color="#87d068">难度</Tag>
      <Select value='全部' style={{width: 120}}>
        <Option value='-1'>全部</Option>
        <Option value='简单'>简单</Option>
        <Option value='一般'>一般</Option>
        <Option value='困难'>困难</Option>
      </Select>
      <Divider type='vertical'/>
      <Button
        type="primary"
        icon="search"
        onClick={() => {
        }}>
        搜索
      </Button>
    </p>

      <Transfer
        dataSource={mockData}
        showSearch
        listStyle={{
          width: '47%',
          height: '400px',
        }}
        targetKeys={targetKeys}
        onChange={this.handleChange}
        render={this.renderItem}
      />
    </div>
  }
}

export default PaperBindQuizBox