import React, {Component} from 'react'
import OjLayout from './component/layout'
import MyClassCourseBody from './component/student/my-class-course-body'
import ClassCourseManagementBody from './component/teacher/class-course-management-Body'
import MajorManagementBody from './component/teacher/major-management-body'
import UserBody from './component/roles/user-body'
import QuizManagementBody from './component/teacher/quizzes-management-Body'
import Login from './component/login-body'

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <OjLayout>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/' component={MyClassCourseBody}/>
                        <Route exact path='/teachers/class-courses' component={ClassCourseManagementBody}/>
                        <Route exact path='/teachers/majors' component={MajorManagementBody}/>
                        <Route exact path='/teachers/quizzes' component={QuizManagementBody}/>
                        <Route exact path='/roles/users' component={UserBody}/>
                        <Route exact path='/students/class-courses' component={MyClassCourseBody}/>

                    </OjLayout>
                </div>
            </Router>
        )
    }
}

export default (App)
