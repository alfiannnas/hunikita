import { LOGIN, LOGOUT, UPDATE_AUTH } from './type'

const initialState = null

export function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN :
      return action.payload
    case LOGOUT :
      return null
    case UPDATE_AUTH :
      return action.payload
    default :
      return state
  }
}
