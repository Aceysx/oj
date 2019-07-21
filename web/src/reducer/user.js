const init = {
  id: -1,
  name: 'admin',
  roles:[]
}
export default (state = init, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.user
    default:
      return state
  }
}
