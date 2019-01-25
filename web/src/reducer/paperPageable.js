const init = {
  totalElements: 1,
  content: [{
    id: 1,
    title: 'ces',
    quizzes: [],
    createTime: '2017-01-01'
  }]
}
export default (state = init, action) => {
  switch (action.type) {
    case 'REFRESH_PAPERS_PAGEABLE':
      return action.data
    default:
      return state
  }
}
