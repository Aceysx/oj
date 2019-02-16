const init = {
    totalElements: 1,
    content: [{
        id: -1,
        roleName: ''
    }]
}
export default (state = init, action) => {
    switch (action.type) {
        case 'REFRESH_ROLE_PAGEABLE':
            return action.data
        default:
            return state
    }
}
