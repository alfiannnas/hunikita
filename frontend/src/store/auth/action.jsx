import {LOGIN, LOGOUT} from './type'
export function doLogin(payload){
  console.log(payload)
  const body = {
    id: payload.id,
    name: payload.username,
    email: payload.email,
    token: payload.token,
  }

  return {
    type:LOGIN,
    payload:body
  }
}


export function doLogout(){
  return {
    type:LOGOUT,
    payload:null
  }
}
