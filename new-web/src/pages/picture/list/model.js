import {fetchRoles} from './service'

const Model = {
  type: {
    FETCH_ROLES: 'pictureCenter/fetchRoles'
  },
  namespace: 'pictureCenter',
  state: {
    pictures: []
  },
  effects: {
    * fetchRoles (_, {call, put}) {
      const response = yield call(fetchRoles)
      yield put({
        type: 'pictures',
        payload: response
      })
    }
  },
  reducers: {
    pictures (state, action) {
      return {...state, pictures: action.payload || []}
    }
  }
}
export default Model
