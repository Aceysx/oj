import React, {Component} from 'react'
import {LabelImg} from '../../common/labelimg'
import '../../../style/labelimg.css'
import {editPictureLabels, getPicture} from "../../../action/picture-action";
import {connect} from 'react-redux'
import {Button, Icon, Row, Col} from "antd";

let label;
const data = [
  {
    fill: "#ff0000",
    index: 1,
    label: "111",
    position: [
      [834.7826086956521, 547.4352331606218],
      [1411.8077803203662, 828.4715025906736],
      [1423.5240274599541, 494.74093264248705],
      [840.6407322654462, 427.40932642487047]]
  },
  {
    fill: "#00db00",
    index: 1,
    label: "asda",
    position: [
      [1115.9725400457667, 541.5803108808291]
      , [1508.4668192219679, 846.0362694300519]
      , [1107.1853546910754, 1048.0310880829015]
      , [925.5835240274599, 778.7046632124353]
      , [1115.9725400457667, 541.5803108808291]
      , [1113.0434782608695, 544.5077720207254]]
  }
]

class MakeLabelBody extends Component {
  state = {
    visible: false,
    pictureId: -1,
    labels: []
  }

  componentDidMount() {
    const {pictureId} = this.props.match.params
    this.setState({pictureId})
    this.props.getPicture(pictureId, (picture) => {
      let {url,labels=[]} = picture
      labels.forEach(label => label.position = JSON.parse(label.position))
      const list = [
        {
          imgUrl: url,
          labeled: false
        }
      ]
      label = new LabelImg({
        submit: labels => this.setState({labels}),
        initData: labels
      })
      label.addImg(list[0].imgUrl)
      window.setTimeout(label.init, 500)
    })

  }
  editPictureLabels = () =>{
    let {pictureId,labels} = this.state
    labels = labels.map(label => {
      return {...label,position:JSON.stringify(label.position)}
    })
    this.props.editPictureLabels(pictureId, labels, ()=>{
      this.props.history.push('/teachers/pictures')
    })
  }
  render() {
    return (
      <div>
        <Row type='flex' justify="space-between">
          <Col>
            <a onClick={() => this.props.history.goBack()}>
              <Icon type="arrow-left"/> 返回
            </a>
          </Col>
          <Col>
            <Button type='primary' onClick={this.editPictureLabels}>提交</Button>
          </Col>
        </Row>
        <div id='canva'/>
      </div>
    )
  }
}

const mapStateToProps = ({picture}) => ({
  picture
})

const mapDispatchToProps = (dispatch) => ({
  getPicture: (pictureId, callback) => dispatch(getPicture(pictureId, callback)),
  editPictureLabels: (pictureId,labels,callback) => dispatch(editPictureLabels(pictureId,labels, callback))
})
export default connect(mapStateToProps, mapDispatchToProps)(MakeLabelBody)