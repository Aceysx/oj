import * as request from '../constant/fetchRequest'
import HTTP_CODE from '../constant/httpCode'

export const initUser = () => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/users/1`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'INIT_USER',
          user: res.body
        })
      }
    })()
  }
}

export const login = (user, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.post(`../api/users/login`, user)
      if (res.status === HTTP_CODE.CREATED) {
        callback()
        dispatch({
          type: 'INIT_USER',
          user: res.body
        })
      }
    })()
  }
}

export const getUsersByPage = (current) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/users/pageable?page=${--current}`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_USERS_PAGEABLE',
          data: res.body
        })
      }
    })()
  }
}

export const addUser = (user, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.post(`../api/users`, user)
      if (res.status === HTTP_CODE.CREATED) {
        dispatch(getUsersByPage())
        callback()
      }
    })()
  }
}

export const  putUser = (user, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.update(`../api/users`, user)
      if (res.status === HTTP_CODE.NO_CONTENT) {
        dispatch(getUsersByPage())
        callback()
      }
    })()
  }
}