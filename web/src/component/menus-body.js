import React from 'react'
import Background from '../images/background.png'
import Line from '../images/line.png'
import routers from '../constant/routers'
import {Row} from 'antd'
import {withRouter} from 'react-router-dom'

class MenusBody extends React.Component {
  render () {
    const {menu} = this.props
    return <div style={{background: `url("${Background}")`, height: '100%'}}>
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
          routers[menu].map(item => {
            return <div
              onClick={() => this.props.history.push(item.url)}
              style={{cursor: 'pointer', background: `gray`, opacity: 0.5, width: 255, height: 380, margin: 10}}>
              <p style={{position: 'relative', bottom: '-80%', textAlign: 'center'}}>{item.title}</p>
            </div>
          })
        }
      </Row>
    </div>
  }
}

export default withRouter(MenusBody)
