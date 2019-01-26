const init = [{
  id: 1,
  title: 'ces',
  quizzes: [],
  createTime: '2017-01-01',
  user: {}
}]
export default (state = init, action) => {
  switch (action.type) {
    case 'REFRESH_PAPERS':
      return action.data
    default:
      return state
  }
}
