import * as request from '../constant/fetchRequest'
import HTTP_CODE from '../constant/httpCode'

export const getClassCourses = (current) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/classCourses?page=${--current}`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_CLASS_COURSES',
          data: res.body
        })
      }
    })()
  }
}
