import React from 'react'
import {Divider, Empty, Icon, Table, Tabs} from "antd";
import {getPapersBy, statistic} from "../../../action/paper-action";
import {connect} from 'react-redux'

const {TabPane} = Tabs

class PaperReviewBody extends React.Component {

    componentDidMount = () => {
        const {classCourseId} = this.props.match.params
        // this.props.getPapersBy(classCourseId, papers => {
        //     if (papers.length > 0) {
        //         this.props.statistic(classCourseId, papers[0].id);
        //     }
        // })
    }

    render() {
        const {paperStatistics, papers} = this.props
        const {classCourseId} = this.props.match.params
        const {total, finish, avg, highest, lowest, stuTestInfo} = paperStatistics

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
                    <Icon type='arrow-left'/> 返回
                </a>
            </p>
            <Divider/>
            {
                papers.length === 0
                    ? <Empty/>
                    :
                    <Tabs defaultActiveKey="1" tabPosition='left'
                          onChange={id => this.props.statistic(classCourseId, id)}>
                        {
                            papers.map(paper => {
                                return <TabPane tab={paper.title} key={paper.id}>
                                    <Table
                                        bordered
                                        columns={columns}
                                        dataSource={stuTestInfo}
                                        rowKey='id'
                                    />

                                    <Divider/>
                                    <p>总人数：{total}</p>
                                    <p>已提交：{finish}</p>
                                    <p>平均数：{(avg || 0).toFixed(2)}</p>
                                    <p>最高分：{highest}</p>
                                    <p>最低分：{lowest}</p>
                                </TabPane>
                            })
                        }

                    </Tabs>
            }
        </div>
    }
}

const mapStateToProps = ({paperStatistics, papers}) => ({
    paperStatistics, papers
})

const mapDispatchToProps = (dispatch) => ({
    statistic: (classCourseId, paperId) => dispatch(statistic(classCourseId, paperId)),
    getPapersBy: (classCourseId, callback) => dispatch(getPapersBy(classCourseId, callback)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PaperReviewBody)
