import request from 'umi-request'

export async function fetchMajors(params) {
  return request('/api/majors/pageable', {
    params
  })
}

export async function deleteMajor(id) {
  return request.delete('/api/majors/' + id)
}

export async function addMajor(params) {
  return request('/api/majors', {
    method: 'POST',
    data: {...params, method: 'post'}
  })
}

export async function updateMajor(params) {
  return request.put('/api/majors', {
    data: {...params, method: 'update'}
  })
}
