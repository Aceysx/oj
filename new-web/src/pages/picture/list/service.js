import request from 'umi-request'

export async function queryPictures(params) {
  return request('/api/pictures/pageable', {
    params
  })
}

export async function queryPicture(id) {
  return request('/api/pictures/' + id)
}

export async function updatePictureLabels(id, labels) {
  return request.put(`/api/pictures/${id}/labels`, {
    data: labels
  })
}
