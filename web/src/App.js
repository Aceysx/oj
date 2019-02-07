import React, {Component} from 'react'
import OjLayout from './component/layout'
import MyClassCourseBody from './component/student/myClassCourse/my-class-course-body'
import ClassCourseManagementBody from './component/teacher/class-course/class-course-management-Body'
import MajorManagementBody from './component/teacher/major/major-management-body'
import UserBody from './component/roles/user-body'
import QuizManagementBody from './component/teacher/quiz/quizzes-management-Body'
import Login from './component/login-body'
import PaperManagement from './component/teacher/paper/paper-management-Body'

import 'braft-editor/dist/index.css'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <Router>
        <OjLayout>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={MyClassCourseBody} />
          <Route exact path='/teachers/class-courses' component={ClassCourseManagementBody} />
          <Route exact path='/teachers/majors' component={MajorManagementBody} />
          <Route exact path='/teachers/papers' component={PaperManagement} />
          <Route exact path='/teachers/quizzes' component={QuizManagementBody} />
          <Route exact path='/roles/users' component={UserBody} />
          <Route exact path='/students/class-courses' component={MyClassCourseBody} />
        </OjLayout>
      </Router>
    )
  }
}

export default (App)
