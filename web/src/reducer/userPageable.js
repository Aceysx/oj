const init = {
  totalElements: 1,
  content: [{
    id: 1,
    username: 'admin',
    createTime: '2017-01-01',
    actualName: '小明',
    phone: '110011',
    email: 'iio@admin.com'
  }]
}
export default (state = init, action) => {
  switch (action.type) {
    case 'REFRESH_USERS_PAGEABLE':
      return action.data
    default:
      return state
  }
}
