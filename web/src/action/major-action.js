import * as request from '../constant/fetchRequest'
import HTTP_CODE from '../constant/httpCode'
import { message } from 'antd'

export const getMajorsByPage = (current) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/majors/pageable?page=${--current}`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_MAJORS_PAGEABLE',
          data: res.body
        })
      }
    })()
  }
}

export const getMajors = () => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/majors`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_MAJORS',
          data: res.body
        })
      }
    })()
  }
}

export const addMajor = (major, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.post(`../api/majors`, major)
      if (res.status === HTTP_CODE.CREATED) {
        dispatch(getMajorsByPage())
        callback()
      }
    })()
  }
}

export const  putMajor = (major, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.update(`../api/majors`, major)
      if (res.status === HTTP_CODE.NO_CONTENT) {
        dispatch(getMajorsByPage())
        callback()
      }
    })()
  }
}

export const deleteMajor = (id) => {
  return dispatch => {
    (async () => {
      const res = await request.del(`/api/majors/${id}`)
      if (res.status === HTTP_CODE.NO_CONTENT) {
        message.success('删除成功')
        dispatch(getMajorsByPage())
      }
    })()
  }
}