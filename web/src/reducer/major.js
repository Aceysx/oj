const init = [
  {
    id: 1,
    name: 'example',
    createTime: 2018-10-10
  }
]

export default (state = init, action) => {
  switch (action.type) {
    case 'REFRESH_MAJOR' :
      return action.data
    default :
      return state
  }
}