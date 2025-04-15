import {LOGIN, LOGOUT, UPDATE_AUTH} from './type'

export function doLogin(payload){
  // console.log(payload)
  const body = {
    id: payload.id,
    name: payload.name,
    email: payload.email,
    token: payload.token,
    role: payload.role
  }

  return {
    type:LOGIN,
    payload:body
  }
}

export function updateAuth(payload){
  return {
    type: UPDATE_AUTH,
    payload: payload
  }
}

export function doLogout(){
  return {
    type:LOGOUT,
    payload:null
  }
}
