import * as request from '../constant/fetchRequest'
import HTTP_CODE from '../constant/httpCode'
import {message} from 'antd'

export const getPapersByPage = (current) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`/api/papers/pageable?page=${--current}`)
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
      const res = await request.get(`/api/papers`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_PAPERS',
          data: res.body
        })
      }
    })()
  }
}

export const getPaper = (paperId) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`/api/papers/${paperId}`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_PAPER',
          data: res.body
        })
      }
    })()
  }
}

export const addPaper = (paper, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.post(`/api/papers`, paper)
      if (res.status === HTTP_CODE.CREATED) {
        dispatch(getPapersByPage())
        callback()
      }
    })()
  }
}
export const submit = (classCourseId, paperId, submission, callback) => {
  return () => {
    (async () => {
      const res = await request.post(`/api/classCourses/${classCourseId}/papers/${paperId}/submission`, {submission})
      if (res.status === HTTP_CODE.CREATED) {
        message.success('提交成功')
        window.setTimeout(callback(), 1000)
      }
    })()
  }
}
export const getReviewQuiz = (classCourseId, paperId) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`/api/classCourses/${classCourseId}/papers/${paperId}/reviewQuiz`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_REVIEW_QUIZ',
          data: res.body
        })
      }
    })()
  }
}
export const editPaper = (paper, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.update(`/api/papers`, paper)
      if (res.status === HTTP_CODE.NO_CONTENT) {
        dispatch(getPapersByPage())
        callback()
      }
    })()
  }
}
export const statistic = (paperId) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`/api/papers/${paperId}/statistics`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'PAPER_STATISTICS',
          data: res.body
        })
      }
    })()
  }
}
