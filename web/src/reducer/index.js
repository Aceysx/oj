import {combineReducers} from 'redux'

import user from './user'
import userPageable from './userPageable'
import classCoursesPageable from './class-courses'
import picturesPageable from './pictures'
import picture from './picture'
import majorPageable from './majorPageable'
import majors from './majors'
import quizPageable from './quizPageable'
import quizzes from './quizzes'
import paperPageable from './paperPageable'
import papers from './papers'
import roles from './role'
import rolePageable from './rolePageable'
import paper from './paper'
import paperReviewQuiz from './reviewQuiz'

export default combineReducers({
  user,
  userPageable,
  majors,
  classCoursesPageable,
  picturesPageable,
  picture,
  majorPageable,
  quizPageable,
  quizzes,
  papers,
  paperPageable,
  roles,
  rolePageable,
  paper,
  paperReviewQuiz
})
