import {combineReducers} from 'redux'

import user from './user'
import classCoursesPageable from './class-courses'
import majorPageable from './major'

export default combineReducers({
  user,
  classCoursesPageable,
  majorPageable
})
