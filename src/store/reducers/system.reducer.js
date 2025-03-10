export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_SEARCH_BOX_POS = 'SET_SEARCH_BOX_POS'
export const SET_SYSTEM_MODE = 'SET_SYSTEM_MODE'



const initialState = {
  isLoading: false,
  searchBoxPosition: 'bottom',
  mode: 'seller'
}

export function systemReducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_SEARCH_BOX_POS:
      return { ...state, searchBoxPosition: action.searchBoxPosition }
    case SET_SYSTEM_MODE:
      return { ...state, mode: action.mode }
    default: return state
  }
}

