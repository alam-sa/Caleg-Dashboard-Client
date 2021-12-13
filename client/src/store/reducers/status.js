const initialState = {
  status: 0
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'STATUS/UPDATESTATUS':
      return { ...state, status: payload }
    // case 'LOADING/CHANGELOADINGUSERS':
    //   return { ...state, loading: payload }
    // case 'FAVORITES/ADDFAVORITEBOOK':
    //   return { ...state, favoriteBooks: [...state.favoriteBooks, payload] }
    default:
      return state
  }
}

export default reducer