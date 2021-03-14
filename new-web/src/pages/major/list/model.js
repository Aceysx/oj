import {fetchMajors} from './service'

const Model = {
  type: {
    FETCH_ROLES: 'majorCenter/fetchMajors'
  },
  namespace: 'majorCenter',
  state: {
    roles: []
  },
  effects: {
    * fetchRoles (_, {call, put}) {
      const response = yield call(fetchMajors)
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
