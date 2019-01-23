import {combineReducers} from 'redux'

import user from './user'
import classCoursesPageable from './class-courses'
import majorPageable from './majorPageable'
import majors from './majors'
import quizPageable from './quizPageable'
import quizzes from './quizzes'
export default combineReducers({
  user,
  majors,
  classCoursesPageable,
  majorPageable,
  quizPageable,
  quizzes
})
