const init = {
    id: -1,
    roleName: ''
}

export default (state = init, action) => {
    switch (action.type) {
        case 'INIT_ROLE':
            return action.data
        default:
            return state
    }
}
