import React, {Component} from 'react'
import OjLayout from './component/layout'
import MyClassCourseBody from './component/student/myClassCourse/my-class-course-body'
import ClassCourseManagementBody from './component/teacher/class-course/class-course-management-Body'
import MajorManagementBody from './component/teacher/major/major-management-body'
import UserBody from './component/roles/user-body'
import QuizManagementBody from './component/teacher/quiz/quizzes-management-Body'
import Login from './component/login-body'
import PaperManagement from './component/teacher/paper/paper-management-Body'
import PaperAnswer from './component/student/myClassCourse/answer-paper'
import PaperReviewQuiz from './component/student/myClassCourse/paper-review-quiz'
import WrongQuizzesBody from './component/student/wrongQuiz/wrong-quiz-body'
import PictureManagementBody from './component/teacher/pictures/picture-management-Body'
import MakeLabelBody from './component/teacher/pictures/make-label-body'
import PaperReviewBody from './component/teacher/class-course/paper-review-body'
import MenusBody from './component/menus-body'
import './style/App.css'
import 'braft-editor/dist/index.css'

import {
  HashRouter as Router,
    Route
} from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <Router>
        <OjLayout>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={MenusBody} />
          <Route exact path='/teachers' component={ClassCourseManagementBody} />
          <Route exact path='/teachers/class-courses' component={ClassCourseManagementBody} />
          <Route exact path='/teachers/majors' component={MajorManagementBody} />
          <Route exact path='/teachers/papers' component={PaperManagement} />
          <Route exact path='/teachers/class-courses/:classCourseId/papers/review' component={PaperReviewBody} />
          <Route exact path='/teachers/quizzes' component={QuizManagementBody} />
          <Route exact path='/teachers/pictures' component={PictureManagementBody} />
          <Route exact path='/teachers/pictures/:pictureId/labels' component={MakeLabelBody} />

          <Route exact path='/roles' component={UserBody} />
          <Route exact path='/roles/users' component={UserBody} />

          <Route exact path='/students' component={MyClassCourseBody} />
          <Route exact path='/students/class-courses' component={MyClassCourseBody} />
          <Route exact path='/students/class-courses/:classCourseId/papers/:paperId/answer' component={PaperAnswer} />
          <Route exact path='/students/class-courses/:classCourseId/papers/:paperId/reviewQuiz' component={PaperReviewQuiz} />
          <Route exact path='/students/wrong-quizzes' component={WrongQuizzesBody} />
        </OjLayout>
      </Router>
    )
  }
}

export default (App)
