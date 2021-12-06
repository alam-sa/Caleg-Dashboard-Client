const initialState = {
  dapils: [],
  dapil: {},
  loading: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'DAPIL/ADDDAPILLIST':
      return { ...state, dapils: payload }
    case 'DAPIL/ADDDAPILCALEG':
    return { ...state, dapil: payload }
    case 'LOADING/CHANGELOADINGDAPILS':
      return { ...state, loading: payload }
    // case 'FAVORITES/ADDFAVORITEBOOK':
    //   return { ...state, favoriteBooks: [...state.favoriteBooks, payload] }
    default:
      return state
  }
}

export default reducer