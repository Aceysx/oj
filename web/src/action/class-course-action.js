import * as request from '../constant/fetchRequest'
import HTTP_CODE from '../constant/httpCode'
import { message } from 'antd'

export const getClassCourses = (current) => {
  return (dispatch) => {
    (async () => {
      const res =
        await request.get(`../api/classCourses?page=${--current}`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_CLASS_COURSES',
          data: res.body
        })
      }
    })()
  }
}

export const addClassCourse = (classCourse, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.post(`../api/classCourses`, classCourse)
      if (res.status === HTTP_CODE.CREATED) {
        dispatch(getClassCourses())
        callback()
      }
    })()
  }
}
export const editClassCourse = (classCourse, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.update(`../api/classCourses`, classCourse)
      if (res.status === HTTP_CODE.NO_CONTENT) {
        dispatch(getClassCourses())
        callback()
      }
    })()
  }
}

export const addMyClassCourse = (code, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.post(`../api/classCourses/my?code=${code}`)
      if (res.status === HTTP_CODE.CREATED) {
        dispatch(getMyClassCourses())
        callback()
      }
    })()
  }
}

export const getMyClassCourses = (current) => {
  return (dispatch) => {
    (async () => {
      const res =
        await request.get(`../api/classCourses/my?page=${--current}`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_CLASS_COURSES',
          data: res.body
        })
      }
    })()
  }
}

export const deleteClassCourse = (id) => {
  return dispatch => {
    (async () => {
      const res = await request.del(`/api/classCourses/${id}`)
      if (res.status === HTTP_CODE.NO_CONTENT) {
        message.success('删除成功')
        dispatch(getClassCourses())
      }
    })()
  }
}

