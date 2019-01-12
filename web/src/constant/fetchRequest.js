import HTTP_METHOD from './httpMethod'
import { message } from 'antd'
const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('jwt')
}
const authenticationFilter = (status) => {
  if (status === 403 || status === 401) {
    window.location.href = '/learn/auth/logout'
  }
}
function errHandler (res) {
  res.json().then(res =>
    message.error(res.body.message)
  )
  return {status: res.status}
}
export const get = async (url) => {
  try {
    const res = await fetch(url, {
      method: HTTP_METHOD.GET,
      credentials: 'include',
      headers: new Headers({
        'Accept': 'application/json;charset=utf-8',
	      'id': 21,
        token: getTokenFromLocalStorage()
      })
    })
    const status = res.status
    authenticationFilter(status)
    if (!res.ok) {
      return errHandler(res)
    }

    const body = await res.json()

    return Object.assign({}, {body}, {status})
  } catch (ex) {
    return {status: ex.status}
  }
}

export const del = async (url) => {
  try {
    const res = await fetch(url, {
      method: HTTP_METHOD.DELETE,
      credentials: 'include',
	    headers: new Headers({
      'id': 21,
      token: getTokenFromLocalStorage()
	    })
    })

    return {status: res.status}
  } catch (ex) {
    return {status: ex.status}
  }
}

export const post = async (url, growthNote) => {
  try {
    const res = await fetch(url, {
      method: HTTP_METHOD.POST,
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
	      'id': 21,
        token: getTokenFromLocalStorage()
      }),
      body: JSON.stringify(growthNote)
    })

    const status = res.status

    if (res.ok) {
      const body = await res.json()
      return Object.assign({}, {status}, {body})
    }

    return {status}
  } catch (ex) {
    return {status: ex.status}
  }
}

export const update = async (url, growthNote) => {
  try {
    const res = await fetch(url, {
      method: HTTP_METHOD.PUT,
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        'id': 21,
        token: getTokenFromLocalStorage()
      }),
      body: JSON.stringify(growthNote)
    })

    return {status: res.status}
  } catch (ex) {
    return {status: ex.status}
  }
}
