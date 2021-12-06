import { toast } from 'react-toastify';
import axios from '../api/config';

// AUTH
export function setAuth(payload) {
  return { type: 'AUTH/UPDATEAUTH', payload }
}
// STATUS
export function setStatus(payload) {
  return { type: 'STATUS/UPDATESTATUS', payload }
}
// PROVINCES
export function setProvinces(payload) {
  return { type: 'REGION/ADDPROVINCES', payload }
}

export function setLoadingProvinces(payload) {
  return { type: 'LOADING/CHANGELOADINGPROVINCES', payload }
}

// CALEG
export function setLoadingCaleg(payload) {
  return { type: 'LOADING/CHANGELOADINGCALEG', payload }
}
export function setCaleg(payload) {
  return { type: 'CALEG/ADDCALEGLIST', payload }
}

export function setCalegLogin(payload) {
  return { type: 'CALEG/ADDCALEG', payload }
}

// ADMIN KPU
export function setUsers(payload) {
  return { type: 'USER/ADDUSERLIST', payload }
}

export function setLoadingUsers(payload) {
  return { type: 'LOADING/CHANGELOADINGUSERS', payload }
}

// PARPOL
export function setParpols(payload) {
  return { type: 'PARPOL/ADDPARPOLLIST', payload }
}
export function setParpol(payload) {
  return { type: 'PARPOL/ADDPARPOLCALEG', payload }
}

export function setLoadingParpols(payload) {
  return { type: 'LOADING/CHANGELOADINGPARPOLS', payload }
}

// DAPIL
export function setDapils(payload) {
  return { type: 'DAPIL/ADDDAPILLIST', payload }
}
export function setDapil(payload) {
  return { type: 'DAPIL/ADDDAPILCALEG', payload }
}

export function setLoadingDapils(payload) {
  return { type: 'LOADING/CHANGELOADINGDAPILS', payload }
}

// export function setLoadingMovie(payload) {
//   return { type: 'LOADING/CHANGELOADINGMOVIE', payload }
// }

// export function addFavoriteBook(payload) {
//   return { type: 'FAVORITES/ADDFAVORITEBOOK', payload }
// }

// export function addFavoriteMovie(payload) {
//   return { type: 'FAVORITES/ADDFAVORITEMOVIE', payload }
// }

// CALEG
// export function registerCaleg(payload) { 
//   return async (dispatch) => {
//     try {
    //   await axios({
    //     url: `caleg/register`,
    //     method: 'POST',
    //     data: payload
    //   })
    //   .then(({data}) => {
    //     console.log(data);
    //     toast.success(`Akun telah berhasil dibuat`, {
    //       position: "top-center",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });

    //   }).catch(err => {
    //     console.log(err);
    //     toast.error("Registrasi Gagal!", {
    //       position: "top-center",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     }); 
    //   })
    // } catch(err) {
    //   console.log(err);
    //   toast.error("Registrasi Gagal!", {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   }); 
    // }
//   }
// }
export function getCalegLogin() { 
  return async (dispatch) => {
    try {
      dispatch(setLoadingCaleg(true));
      await axios({
        url: `caleg/user`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then((res) => {
        dispatch(setCalegLogin(res.data));
        dispatch(setDapil(res.data.Dapil))
        dispatch(setParpol(res.data.Partai));
        dispatch(setStatus(res.data.StatusCaleg))
        dispatch(setLoadingCaleg(false));
      }).catch(err => {
        dispatch(setLoadingCaleg(false));
        console.log(err);
      })
    } catch(err) {
      console.log(err);
    }
  }
}

export function getCaleg(id) { 
  return async (dispatch) => {
    try {
      dispatch(setLoadingCaleg(true));
      await axios({
        url: `caleg/${id}`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then((res) => {
        dispatch(setCaleg(res.data));
        dispatch(setLoadingCaleg(false));
      }).catch(err => {
        console.log(err);
        dispatch(setLoadingCaleg(false));
      })
    } catch(err) {
      console.log(err);
      dispatch(setLoadingCaleg(false));
    }
  }
}



// ADMIN KPU
export function getUsers() { 
  return async (dispatch) => {
    try {
      dispatch(setLoadingUsers(true))
      await axios({
        url: `user`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then((res) => {
        dispatch(setUsers(res.data))
        dispatch(setLoadingUsers(false))
      }).catch(err => {
        console.log(err);
        dispatch(setLoadingUsers(false))
      })
    } catch(err) {
      console.log(err);
    }
  }
}

export function updateActiveUser(id, payload) { 
  console.log(payload);
  const is_active = payload
  return async (dispatch) => {
    try {
      dispatch(setLoadingUsers(true))
      await axios({
        url: `user/status/${id}`,
        method: 'PATCH',
        data: {is_active},
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then((res) => {
        dispatch(getUsers())
        dispatch(setLoadingUsers(false))
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      }).catch(err => {
        console.log(err);
        dispatch(setLoadingUsers(false))
        toast.error(err.response.data.message[0], {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      })
    } catch(err) {
      console.log(err);
    }
  }
}
export function addUser(payload) { 
  return async (dispatch) => {
    try {
      dispatch(setLoadingUsers(true))
      await axios({
        url: `user/addadmin`,
        method: 'POST',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then((res) => {
        dispatch(setLoadingUsers(false))
        dispatch(getUsers())
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      }).catch(err => {
        console.log(err);
        dispatch(setLoadingUsers(false))
        toast.error(err.response.data.message[0], {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      })
    } catch(err) {
      console.log(err);
    }
  }
}
export function deleteUser(id) { 
  return async (dispatch) => {
    try {
      dispatch(setLoadingUsers(true))
      await axios({
        url: `user/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then((res) => {
        dispatch(setLoadingUsers(false))
        dispatch(getUsers())
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      }).catch(err => {
        console.log(err);
        dispatch(setLoadingUsers(false))
        toast.error(err.response.data.message[0], {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      })
    } catch(err) {
      console.log(err);
    }
  }
}

// PARPOL
export function getParpols() { 
  return async (dispatch) => {
    try {
      dispatch(setLoadingParpols(true))
      await axios({
        url: `partai`,
        method: 'GET'
      })
      .then(({data}) => {
        console.log(data);
        data = data.map(data => {
          return { value: data.id, label: data.nama_partai }
       })
        dispatch(setParpols(data))
        dispatch(setLoadingParpols(false))
      }).catch(err => {
        console.log(err);
        dispatch(setLoadingParpols(false))
      })
    } catch(err) {
      console.log(err);
    }
  }
}
export function addParpols(payload) { 
  return async (dispatch) => {
    try {
      dispatch(setLoadingParpols(true))
      await axios({
        url: `partai/add`,
        method: 'POST',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then((res) => {
        dispatch(setLoadingParpols(false))
        dispatch(getParpols())
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      }).catch(err => {
        console.log(err);
        dispatch(setLoadingParpols(false))
        toast.error(err.response.data.message[0], {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      })
    } catch(err) {
      console.log(err);
    }
  }
}

// DAPIL
export function getDapils() { 
  return async (dispatch) => {
    try {
      dispatch(setLoadingDapils(true))
      await axios({
        url: `dapil`,
        method: 'GET'
      })
      .then(({data}) => {
        console.log(data);
        data = data.map(data => {
          return { value: data.id, label: data.nama_dapil }
       })
        dispatch(setDapils(data))
        dispatch(setLoadingDapils(false))
      }).catch(err => {
        console.log(err);
        dispatch(setLoadingDapils(false))
      })
    } catch(err) {
      console.log(err);
    }
  }
}

// export function fetchMovie() {
  // return async (dispatch) => {
  //   try {
  //     const response = await fetch('https://the-one-api.dev/v2/movie', { headers: { "authorization": process.env.REACT_APP_API_KEY }})
  //     const data = await response.json()
  //     dispatch(setMovies(data.docs))
  //     dispatch(setLoadingMovie(false))
  //   } catch(err) {
  //     swal({
  //       title: "Error!",
  //       text: `${err.message}`,
  //       icon: "error",
  //     });
  //   }
  // }
// }