const initialState = {
  parpols: [],
  parpol: {},
  loading: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'PARPOL/ADDPARPOLLIST':
      return { ...state, parpols: payload }
    case 'PARPOL/ADDPARPOLCALEG':
      return { ...state, parpol: payload }
    case 'LOADING/CHANGELOADINGPARPOLS':
      return { ...state, loading: payload }
    // case 'FAVORITES/ADDFAVORITEBOOK':
    //   return { ...state, favoriteBooks: [...state.favoriteBooks, payload] }
    default:
      return state
  }
}

export default reducer