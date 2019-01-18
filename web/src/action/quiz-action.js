import * as request from '../constant/fetchRequest'
import HTTP_CODE from '../constant/httpCode'

export const getQuizzes = (current) => {
  return (dispatch) => {
    (async () => {
      const res = await request.get(`../api/quizzes?page=${--current}`)
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
        dispatch(getQuizzes())
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
        dispatch(getQuizzes())
        callback()
      }
    })()
  }
}
