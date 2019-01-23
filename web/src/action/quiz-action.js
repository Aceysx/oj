import * as request from '../constant/fetchRequest'
import HTTP_CODE from '../constant/httpCode'

export const getQuizzesByPage = (current) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/quizzes/pageable?page=${--current}`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_QUIZZES_PAGEABLE',
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

export const addQuiz = (quiz, callback) => {
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
