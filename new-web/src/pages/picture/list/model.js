import {queryPicture, queryPictures} from './service'

const Model = {
  type: {
    FETCH_PICTURES: 'pictureCenter/fetchPictures',
    FETCH_PICTURE: 'pictureCenter/fetchPicture'
  },
  namespace: 'pictureCenter',
  state: {
    pictures: [],
    picture: {}
  },
  effects: {
    * fetchPictures(_, {call, put}) {
      const response = yield call(queryPictures)
      yield put({
        type: 'pictures',
        payload: response
      })
    },
    * fetchPicture({id}, {call, put}) {
      const response = yield call(queryPicture, id)
      yield put({
        type: 'picture',
        payload: response
      })
    }
  },
  reducers: {
    pictures(state, action) {
      return {...state, pictures: action.payload || []}
    },
    picture(state, action) {
      return {...state, picture: action.payload || {}}
    }
  }
}
export default Model
