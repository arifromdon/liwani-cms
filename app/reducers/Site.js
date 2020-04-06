import {
  SET_SITE_THEME,
} from 'constants/ActionTypes'

const initialState = {
  light: false,
}

export default function site(state = initialState, action) {
  switch (action.type) {
    case SET_SITE_THEME:
      return {
        ...state,
        light: action.theme,
      }
    default:
      return state
  }
}
