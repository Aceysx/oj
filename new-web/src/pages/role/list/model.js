import {fetchRoles} from './service'

const RoleModel = {
  type: {
    FETCH_ROLES: 'roleCenter/fetchRoles'
  },
  namespace: 'roleCenter',
  state: {
    roles: []
  },
  effects: {
    * fetchRoles (_, {call, put}) {
      console.log(123)
      const response = yield call(fetchRoles)
      console.log(response)
      yield put({
        type: 'FETCH_ROLES',
        payload: response
      })
    }
  },
  reducers: {
    roles (state, action) {
      return {...state, roles: action.payload || []}
    }
  }
}
export default RoleModel
