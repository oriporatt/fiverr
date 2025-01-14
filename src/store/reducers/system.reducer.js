export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_SEARCH_BOX_POS = 'SET_SEARCH_BOX_POS'


const initialState = {
  isLoading: false,
  searchBoxPosition: 'bottom'
}

export function systemReducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_SEARCH_BOX_POS:
      return { ...state, searchBoxPosition: action.searchBoxPosition }
    default: return state
  }
}

