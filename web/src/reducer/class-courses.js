const init = [
  {
    id:1,
    title: 'example',
    code: 'aaaaaa',
    endTime: '2222',
    papers: []
  }
]
export default (state = init, action) => {
  switch (action.type) {
    case 'REFRESH_CLASS_COURSES':
      return action.data
    default:
      return state
  }
}
