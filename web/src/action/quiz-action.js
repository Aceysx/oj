import * as request from '../constant/fetchRequest'
import HTTP_CODE from '../constant/httpCode'
import {message} from 'antd'

export const getQuizzesByPage = (current = 1, type = '', chapter = '', majorId='') => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/quizzes/pageable?page=${--current}&type=${type}&chapter=${chapter}&majorId=${majorId}`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_QUIZZES_PAGEABLE',
          data: res.body
        })
      }
    })()
  }
}
export const getChapters = () => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/quizzes/chapters`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_CHAPTERS',
          data: res.body
        })
      }
    })()
  }
}

export const getQuizzes = () => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/quizzes`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_QUIZZES',
          data: res.body
        })
      }
    })()
  }
}

export const getMyWrongQuizzesByPage = (currentPage = 1) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/quizzes/wrong/pageable?page=${--currentPage}`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_QUIZZES_PAGEABLE',
          data: res.body
        })
      }
    })()
  }
}

export const addQuiz = (quiz, callback) => {
  if (quiz.type === '多选题') {
    quiz.answer = JSON.stringify(quiz.answer)
  }
  return (dispatch) => {
    (async () => {
      const res = await request.post(`../api/quizzes`, quiz)
      if (res.status === HTTP_CODE.CREATED) {
        dispatch(getQuizzesByPage())
        callback()
      }
    })()
  }
}
export const editQuiz = (quiz, callback) => {
  if (quiz.type === '多选题') {
    quiz.answer = JSON.stringify(quiz.answer)
  }
  return (dispatch) => {
    (async () => {
      const res = await request.update(`../api/quizzes`, quiz)
      if (res.status === HTTP_CODE.NO_CONTENT) {
        dispatch(getQuizzesByPage())
        callback()
      }
    })()
  }
}

export const deleteQuiz = (id) => {
  return dispatch => {
    (async () => {
      const res = await request.del(`/api/quizzes/${id}`)
      if (res.status === HTTP_CODE.NO_CONTENT) {
        message.success('删除成功')
        dispatch(getQuizzesByPage())
      }
    })()
  }
}
