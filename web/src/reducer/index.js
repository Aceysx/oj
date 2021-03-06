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
import roles from './roles'
import paper from './paper'
import paperReviewQuiz from './reviewQuiz'
import paperStatistics from './paper-statistics'
import chapters from './chapters'

export default combineReducers({
  user,
  chapters,
  paperStatistics,
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
  paper,
  paperReviewQuiz
})
