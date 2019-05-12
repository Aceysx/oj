import React from 'react'
import {Divider, Icon} from "antd";
import {statistic} from "../../../action/paper-action";
import {connect} from 'react-redux'
class PaperReviewBody extends React.Component {

  componentDidMount = () =>{
    const {paperId} = this.props.match.params
    this.props.statistic(paperId)
  }

  render () {
    const {paperStatistics} = this.props
    const {total,finish,avg,highest,lowest} = paperStatistics

    return <div>
      <p>
        <a onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' /> 返回
        </a>
      </p>
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
