const init = [
  {
    id:1,
    title: 'example',
    createTime: '2222',
    labels: []
  }
]
export default (state = init, action) => {
  switch (action.type) {
    case 'REFRESH_PICTURES':
      return action.data
    default:
      return state
  }
}
