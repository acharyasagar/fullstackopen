import { SET_USER } from '../actions/action-types'
const userReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.data
    default:
      return state
  }
}

export default userReducer
