const init = []
export default (state = init, action) => {
  switch (action.type) {
    case 'REFRESH_ROLE_PAGEABLE':
      return action.data
    default:
      return state
  }
}
