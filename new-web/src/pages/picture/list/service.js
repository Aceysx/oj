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

export async function deletePicture(id) {
  return request.delete('/api/pictures/' + id)
}

export async function addPicture(params) {
  return request.post('/api/pictures', {
    method: 'POST',
    data: {...params}
  })
}

export async function updatePicture(params) {
  return request.put('/api/pictures/' + params.id, {
    data: {...params}
  })
}
