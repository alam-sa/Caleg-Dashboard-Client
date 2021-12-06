const initialState = {
  auth: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'AUTH/UPDATEAUTH':
      return { ...state, auth: payload }
    // case 'LOADING/CHANGELOADINGBOOK':
    //   return { ...state, loading: payload }
    // case 'FAVORITES/ADDFAVORITEBOOK':
    //   return { ...state, favoriteBooks: [...state.favoriteBooks, payload] }
    default:
      return state
  }
}

export default reducer