import * as request from '../constant/fetchRequest'
import HTTP_CODE from '../constant/httpCode'

export const getPapersByPage = (current) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/papers/pageable?page=${--current}`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_PAPERS_PAGEABLE',
          data: res.body
        })
      }
    })()
  }
}

export const getPapers = () => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/papers`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_PAPERS',
          data: res.body
        })
      }
    })()
  }
}

export const addPaper = (paper, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.post(`../api/papers`, paper)
      if (res.status === HTTP_CODE.CREATED) {
        dispatch(getPapersByPage())
        callback()
      }
    })()
  }
}
export const editQuiz = (paper, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.update(`../api/papers`, paper)
      if (res.status === HTTP_CODE.NO_CONTENT) {
        dispatch(getPapersByPage())
        callback()
      }
    })()
  }
}
