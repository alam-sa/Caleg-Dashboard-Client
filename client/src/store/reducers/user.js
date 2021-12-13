const initialState = {
  users: [],
  register: [],
  verified: [],
  loading: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'USER/ADDUSERLIST':
      return { ...state, users: payload }
    case 'USER/ADDUSERREGISTER':
    return { ...state, register: payload }
    case 'USER/ADDUSERVERIFIED':
      return { ...state, verified: payload }
    case 'LOADING/CHANGELOADINGUSERS':
      return { ...state, loading: payload }
    // case 'FAVORITES/ADDFAVORITEBOOK':
    //   return { ...state, favoriteBooks: [...state.favoriteBooks, payload] }
    default:
      return state
  }
}

export default reducer