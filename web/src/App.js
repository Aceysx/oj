import React, {Component} from 'react'
import OjLayout from './component/layout'
import MyClassCourseBody from './component/student/my-class-course-body'
import ClassCourseManagementBody from './component/teacher/class-course-management-Body'
import MajorManagementBody from './component/teacher/major-management-body'
import UserBody from './component/roles/user-body'

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <Router>
        <OjLayout>
          <Route exact path='/' component={MyClassCourseBody} />
          <Route exact path='/teachers/class-courses' component={ClassCourseManagementBody} />
          <Route exact path='/teachers/major' component={MajorManagementBody} />
          <Route exact path='/roles/users' component={UserBody} />
          <Route exact path='/students/class-courses' component={MyClassCourseBody} />

        </OjLayout>
      </Router>
    )
  }
}

export default (App)
