import React, {useEffect, useState} from 'react'
import {connect, history, useParams} from "umi";
import Model from "@/pages/picture/list/model";
import {Button, Col, message, Row} from "antd";
import {LabelImg} from "../resource/labelimg";
import '../resource/labelimg.css'
import {updatePictureLabels} from "@/pages/picture/list/service";

let label;

const PictureMark = (props) => {
  const params = useParams()
  const {picture} = props.pictureCenter

  const [labels, handleLabels] = useState([])

  useEffect(() => {
    props.dispatch({
      type: Model.type.FETCH_PICTURE,
      id: params.id
    })
    let {url, labels = []} = picture
    handleLabels(labels)
    labels.forEach(label => label.position = JSON.parse(label.position))
    const list = [
      {
        imgUrl: url,
        labeled: false
      }
    ]
    label = new LabelImg({
      submit: labels => handleLabels(labels),
      initData: labels
    })
    label.addImg(list[0].imgUrl)
    window.setTimeout(label.init, 500)
  }, [picture.id])

  const handleUpdate = async (labels) => {
    try {
      await updatePictureLabels(params.id,labels)
      message.success('更新成功')
      return true
    } catch (error) {
      message.error('更新失败！')
      return false
    }
  }

  const editPictureLabels = () => {
    const newLabels = labels.map(label => {
      return {...label, position: JSON.stringify(label.position)}
    })
    handleUpdate(newLabels).then(result => {
      if (result) {
        history.push('/picture/list')
      }
    })
  }

  return (
    <div>
      <Row type='flex' justify="space-between">
        <Col span={20}>
          <a onClick={() => history.goBack()}>
            返回 | {picture.title}
          </a>
        </Col>
        <Col>
          <Button type='primary' onClick={editPictureLabels}>提交</Button>
        </Col>
      </Row>
      <div id='canva'/>
    </div>
  )
}
export default connect(({pictureCenter}) => ({
  pictureCenter
}))(PictureMark)
