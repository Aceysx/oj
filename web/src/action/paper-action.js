import * as request from '../constant/fetchRequest'
import HTTP_CODE from '../constant/httpCode'
import {message} from 'antd'
import { getMajorsByPage } from './major-action'

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

export const addAutoPaper = (paper, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.post(`/api/papers/addAutoPaper`, paper)
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
        callback()
      }
    })()
  }
}
export const startAnswer = (classCourseId, paperId,callback) => {
  return () => {
    (async () => {
      const res = await request.post(`/api/classCourses/${classCourseId}/papers/${paperId}/submission/starter`)
      if (res.status === HTTP_CODE.CREATED) {
        callback()
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
  };
}
export const statistic = (classCourseId,paperId) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`/api/classCourses/${classCourseId}/papers/${paperId}/statistics`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'PAPER_STATISTICS',
          data: res.body
        })
      }
    })()
  }
}
export const getPapersBy = (classCourseId,callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`/api/classCourses/${classCourseId}/papers`)
      if (res.status === HTTP_CODE.OK) {
        callback(res.body)
        dispatch({
          type: 'REFRESH_PAPERS',
          data: res.body
        })
      }
    })()
  }
}
export const deletePaper = (id) => {
  return dispatch => {
    (async () => {
      const res = await request.del(`/api/papers/${id}`)
      if (res.status === HTTP_CODE.NO_CONTENT) {
        message.success('删除成功')
        dispatch(getPapersByPage())
      }
    })()
  }
}
