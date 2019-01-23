const init = [{
  id: 1,
  description: '题目描述',
  options: 'options',
  answer: '1',
  chapter: '章节',
  level: '简单',
  major: {id: 1, name: 'aaa'}
}]
export default (state = init, action) => {
  switch (action.type) {
    case 'REFRESH_QUIZZES':
      return action.data
    default:
      return state
  }
}
