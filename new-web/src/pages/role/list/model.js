import {fetchRoles} from './service'

const Model = {
  type: {
    FETCH_ROLES: 'roleCenter/fetchRoles'
  },
  namespace: 'roleCenter',
  state: {
    roles: []
  },
  effects: {
    * fetchRoles (_, {call, put}) {
      const response = yield call(fetchRoles)
      yield put({
        type: 'roles',
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
export default Model