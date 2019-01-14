import * as request from '../constant/fetchRequest'
import HTTP_CODE from '../constant/httpCode'

export const getMajor = (current) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/major?page=${--current}`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_MAJOR',
          data: res.body
        })
      }
    })()
  }
}

export const addMajor = (major, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.post(`../api/major`, major)
      if (res.status === HTTP_CODE.CREATED) {
        dispatch(getMajor())
        callback()
      }
    })()
  }
}
