
export default (state = {}, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.user
    default:
      return state
  }
}
