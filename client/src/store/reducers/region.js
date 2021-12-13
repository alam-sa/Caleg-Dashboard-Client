const initialState = {
  provinces: [],
  districts: [{value: 0, label: "-- Pilih Provinsi Terlebih Dahulu --", disabled: true}],
  subdistricts: [{value: 0, label: "-- Pilih Kabupaten / Kota Terlebih Dahulu --", disabled: true}],
  loadingRegion: true
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'REGION/ADDPROVINCES':
      return { ...state, provinces: payload }
    case 'REGION/ADDDISTRICTS':
      return { ...state, districts: payload }
    case 'REGION/ADDSUBDISTRICTS':
    return { ...state, subdistricts: payload }
    case 'LOADING/CHANGELOADINGPROVINCES':
      return { ...state, loadingRegion: payload }
    // case 'FAVORITES/ADDFAVORITEBOOK':
    //   return { ...state, favoriteBooks: [...state.favoriteBooks, payload] }
    default:
      return state
  }
}

export default reducer