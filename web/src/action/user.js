import * as request from '../constant/fetchRequest'
import HTTP_CODE from '../constant/httpCode'
import * as types from '../constant/action-types'

export const initUser = () => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`./api/users/21`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: types.INIT_USER,
          user: res.body
        })
      }
    })()
  }
}
