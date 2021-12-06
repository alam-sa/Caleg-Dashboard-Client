const initialState = {
  provinces: [],
  city_districts: [],
  loading: true
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'REGION/ADDPROVINCES':
      return { ...state, provinces: [...state.provinces, payload] }
    case 'LOADING/CHANGELOADINGPROVINCES':
      return { ...state, loading: payload }
    // case 'FAVORITES/ADDFAVORITEBOOK':
    //   return { ...state, favoriteBooks: [...state.favoriteBooks, payload] }
    default:
      return state
  }
}

export default reducer