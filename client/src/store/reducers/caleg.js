const initialState = {
  calegs: [],
  caleg: {},
  loading: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'CALEG/ADDCALEGLIST':
      return { ...state, calegs: payload }
    case 'CALEG/ADDCALEG':
      return { ...state, caleg: payload }
    case 'LOADING/CHANGELOADINGCALEG':
      return { ...state, loading: payload }
    // case 'FAVORITES/ADDFAVORITEBOOK':
    //   return { ...state, favoriteBooks: [...state.favoriteBooks, payload] }
    default:
      return state
  }
}

export default reducer