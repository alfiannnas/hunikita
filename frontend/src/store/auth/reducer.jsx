import { LOGIN, LOGOUT } from './type'
export const AuthReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN :
      return action.payload
    case LOGOUT :
      return null
    default :
      return state
  }
}
