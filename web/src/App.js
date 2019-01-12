import React, {Component} from 'react'
import Index from './component/index'
import OjLayout from './component/layout'
import ClassCourseBody from './component/student/class-course-body'

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

class App extends Component {
  render () {

    return (
          <Router>
            <OjLayout>
              <Route exact path='/' component={Index} />
              <Route exact path='/students/class-courses' component={ClassCourseBody} />

            </OjLayout>
          </Router>
    )
  }
}


export default (App)
