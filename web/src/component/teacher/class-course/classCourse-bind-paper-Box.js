import React, {Component} from 'react'
import {message, Modal, Tag, Transfer} from 'antd'

class ClassCourseBindPaperBox extends Component {
  state = {
    targets : []
  }

  componentWillReceiveProps = (nextProps) => {
    const {classCourse} = nextProps
    if (classCourse.papers === this.state.targets ) {
      return false
    }
    this.setState({targets: classCourse.papers})
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
          <Tag color="#2db7f5">创建者</Tag>{paper.user.username}
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
  convert = (targets) => {
    return targets.map(target => target.id.toString())
  }

  editClassCourse = () => {
    const {editClassCourse, closeModal, classCourse} = this.props
    const {targets} = this.state
    editClassCourse(Object.assign({}, classCourse, {papers: targets}), () => {
      message.success('绑定成功')
      this.setState({targets: []})
      closeModal()
    })
  }

  render() {
    const {papers, visible} = this.props
    const {targets} = this.state
    const dataSource = this.getDataSource(papers)
    const targetKeys = this.convert(targets)

    return <Modal
      title='绑定试卷'
      width='70%'
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
          height: '400px',
        }}
        operations={['添加', '移除']}
        targetKeys={[...targetKeys]}
        onChange={this.handleChange}
        render={this.renderItem}
      />
    </Modal>
  }
}

export default ClassCourseBindPaperBox