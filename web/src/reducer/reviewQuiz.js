const init = {
  paper: {quizzes:[]},
  reviewQuiz: {},
  submission: []
}
export default (state = init, action) => {
  switch (action.type) {
    case 'REFRESH_REVIEW_QUIZ':
      return action.data
    default:
      return state
  }
}
