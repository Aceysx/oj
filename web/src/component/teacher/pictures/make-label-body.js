import React, {Component} from 'react'
import {LabelImg} from '../../common/labelimg'
import '../../../style/labelimg.css'
import {editPictureLabels, getPicture} from "../../../action/picture-action";
import {connect} from 'react-redux'
import {Button, Icon, Row, Col} from "antd";

let label;

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