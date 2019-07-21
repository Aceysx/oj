import React from 'react'
import {Button, Table, Col, DatePicker, Form, Input, message, Modal, Row, Divider, Icon} from "antd";
import {statistic} from "../../../action/paper-action";
import {connect} from 'react-redux'
class PaperReviewBody extends React.Component {

  componentDidMount = () =>{
    const {paperId} = this.props.match.params
    this.props.statistic(paperId)
  }

  render () {
    const {paperStatistics} = this.props
    const {total,finish,avg,highest,lowest,stuTestInfo} = paperStatistics
    console.log('考生数据：' + JSON.stringify(this.props))

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '班课',
        dataIndex: 'cTitle',
        key: 'cTitle'
      }, {
        title: '试卷',
        dataIndex: 'pTitle',
        key: 'pTitle',
      }, {
        title: '分数',
        dataIndex: 'score',
        key: 'score'
      }
    ]

    return <div>
      <p>
        <a onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' /> 返回
        </a>
      </p>

      <Table
        bordered
        columns={columns}
        dataSource={stuTestInfo}
        rowKey='id'
      />

      <Divider />
      <p>总人数：{total}</p>
      <p>已提交：{finish}</p>
      <p>平均数：{avg}</p>
      <p>最高分：{highest}</p>
      <p>最低分：{lowest}</p>
    </div>
  }
}

const mapStateToProps = ({paperStatistics}) => ({
  paperStatistics
})

const mapDispatchToProps = (dispatch) => ({
  statistic: (paperId) => dispatch(statistic(paperId))
})
export default connect(mapStateToProps, mapDispatchToProps)(PaperReviewBody)
