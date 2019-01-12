import {combineReducers} from 'redux'

import user from './user'
import classCoursesPageable from './class-courses'

export default combineReducers({
  user,
  classCoursesPageable
})
