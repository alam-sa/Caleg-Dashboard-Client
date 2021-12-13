const initialState = {
  dokumen: {},
  loading: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'DOKUMEN/ADDDOKUMENCALEG':
    return { ...state, dokumen: payload }
    case 'LOADING/CHANGELOADINGDOKUMEN':
      return { ...state, loading: payload }
    default:
      return state
  }
}

export default reducer