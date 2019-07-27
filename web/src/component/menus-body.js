import React from 'react'
import Background from '../images/background.png'
import PicPng from '../images/icon/图片管理.png'
import MyClassCoursePng from '../images/icon/我的课班.png'
import ClassCoursePng from '../images/icon/班课管理.png'
import PaperPng from '../images/icon/试卷管理.png'
import CourseTitlePng from '../images/icon/课程名称管理.png'
import WrongQuizPng from '../images/icon/错题本.png'
import QuizPng from '../images/icon/题目管理.png'

import Line from '../images/line.png'
import routers from '../constant/routers'
import {Row} from 'antd'
import {withRouter} from 'react-router-dom'
const icons = {
  我的班课: MyClassCoursePng,
  图片管理: PicPng,
  班课管理: ClassCoursePng,
  试卷管理: PaperPng,
  课程名称管理: CourseTitlePng,
  错题本: WrongQuizPng,
  题目管理: QuizPng

}
class MenusBody extends React.Component {
  render () {
    const {menu} = this.props
    console.log(menu,routers)
    return <div style={{background: `url("${Background}")`, height: '150%'}}>
      <Row type='flex' justify='center'>
        <div style={{marginTop: '5%', textAlign: 'center', color: 'white', fontSize: 30}}>
          DRVS在线考试系统
          <div style={{marginTop: '20', fontWeight: 'bolder  ', fontSize: 45}}>
            {menu === 'teachers'
            ? '教师端'
            : '学生端'}
          </div>
          <img src={Line} style={{marginTop: '-40'}} />
        </div>
      </Row>
      <Row type='flex' justify='center'>
        {
          (routers[menu]||[]).map(item => {
            return <div
              onClick={() => this.props.history.push(item.url)}
              style={{cursor: 'pointer',
                background: `#8b98f4`,
                borderRadius: '10',
                boxShadow: '0 0 30px  #8b98f4',
                textAlign: 'center',
                width: 240,
                height: 340,
                margin: 10}}>
              <img src={icons[item.title]} width={150} style={{margin: '50px 0'}} />
              <p style={{ textAlign: 'center', color: 'white', fontSize: '25'}}>{item.title}</p>
            </div>
          })
        }
      </Row>
    </div>
  }
}

export default withRouter(MenusBody)
