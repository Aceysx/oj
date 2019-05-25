import * as request from '../constant/fetchRequest'
import HTTP_CODE from '../constant/httpCode'
import { message } from 'antd'
import { getPapersByPage } from './paper-action'
import picture from '../reducer/picture'

export const getPictures = (current, title='') => {
  return (dispatch) => {
    (async () => {
      const res =
        await request.get(`/api/pictures/pageable?page=${--current}&title=${title}`)
      if (res.status === HTTP_CODE.OK) {
        dispatch({
          type: 'REFRESH_PICTURES',
          data: res.body
        })
      }
    })()
  }
}

export const getPicture = (pictureId, callback) => {
  return (dispatch) => {
    (async () => {
      const res =
        await request.get(`/api/pictures/${pictureId}`)
      if (res.status === HTTP_CODE.OK) {
        callback(res.body)
        dispatch({
          type: 'REFRESH_PICTURE',
          data: res.body
        })
      }
    })()
  }
}

export const addPicture = (picture, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.post(`/api/pictures`, picture)
      if (res.status === HTTP_CODE.CREATED) {
        dispatch(getPictures())
        callback()
      }
    })()
  }
}
export const editPictureLabels = (pictureId, labels, callback) => {
  return () => {
    (async () => {
      const res = await request.update(`/api/pictures/${pictureId}/labels`, labels)
      if (res.status === HTTP_CODE.NO_CONTENT) {
        callback()
      }
    })()
  }
}
export const editPicture = (picture, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await request.update(`/api/pictures/${picture.id}`, picture)
      if (res.status === HTTP_CODE.NO_CONTENT) {
        dispatch(getPictures())
        callback()
      }
    })()
  }
}

export const deletePicture = (id) => {
  return dispatch => {
    (async () => {
      const res = await request.del(`/api/pictures/${id}`)
      if (res.status === HTTP_CODE.NO_CONTENT) {
        message.success('删除成功')
        dispatch(getPictures())
      }
    })()
  }
}

