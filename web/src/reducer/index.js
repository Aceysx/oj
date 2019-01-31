import {combineReducers} from 'redux'

import user from './user'
import userPageable from './userPageable'
import classCoursesPageable from './class-courses'
import majorPageable from './majorPageable'
import majors from './majors'
import quizPageable from './quizPageable'
import quizzes from './quizzes'
import paperPageable from './paperPageable'
import papers from './papers'

export default combineReducers({
  user,
  userPageable,
  majors,
  classCoursesPageable,
  majorPageable,
  quizPageable,
  quizzes,
  papers,
  paperPageable
})
