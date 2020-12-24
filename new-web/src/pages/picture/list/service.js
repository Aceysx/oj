import request from 'umi-request'

export async function queryPictures (params) {
  return request('/api/pictures/pageable', {
    params
  })
}

export async function fetchRoles () {
  return request('/api/users/roles')
}

export async function removeRule (params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' }
  })
}
export async function addUser (params) {
  return request('/api/users', {
    method: 'POST',
    data: { ...params, method: 'post' }
  })
}
export async function updateUser (params) {
  return request.put('/api/users', {
    data: { ...params, method: 'update' }
  })
}
