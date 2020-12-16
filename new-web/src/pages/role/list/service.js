import request from 'umi-request'

export async function queryUsers (params) {
  return request('/api/users/pageable', {
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
export async function addRule (params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' }
  })
}
export async function updateRule (params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' }
  })
}
