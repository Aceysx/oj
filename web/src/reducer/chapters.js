const init = ['chapter']
export default (state = init, action) => {
  switch (action.type) {
    case 'REFRESH_CHAPTERS':
      return action.data
    default:
      return state
  }
}
