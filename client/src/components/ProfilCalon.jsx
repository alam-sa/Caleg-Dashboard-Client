import React, { useEffect, useState } from 'react'
import moment from 'moment';
import DatePicker from 'react-date-picker';
import { useDispatch } from 'react-redux';
import { setStatus, getCalegLogin, setLoadingCaleg } from '../store/action';
import axios from '../api/config'

var idLocale = require('moment/locale/id'); 
  moment.locale('id', idLocale);

const ProfilCalon = ({loading, caleg, dapil, parpol}) => {
  // const { loading, caleg } = useSelector((state) => state.caleg)
  const [value, onChange] = useState(new Date())
  const [profil, setProfil] = useState({
    nama: caleg.nama,
    NIK: caleg.NIK,
    foto_profil: caleg.foto_profil,
    partai: parpol.nama_partai,
    dapil: dapil.nama_dapil,
    email: caleg.email,
    tempat_lahir: caleg.tempat_lahir,
    agama: caleg.agama,
    dapilId: caleg.dapilId,
    partaiId:caleg.partaiId,
    email: caleg.email,
    noHp: caleg.noHp,
    provinsi: caleg.provinsi,
    kabupaten: caleg.kabupaten,
    kecamatan: caleg.kecamatan,
    alamat: caleg.alamat
  })

  const dispatch = useDispatch();

  useEffect(() => {
  },[caleg])

  function handleUploadFoto(event) {
    event.preventDefault();
    const image = event.target.files[0]
    const formData = new FormData();
		formData.append('image', image);

    axios({
      url: `caleg/image/upload`,
      method: 'POST',
      data: formData,
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
    .then((res) => {
      dispatch(getCalegLogin());
    }).catch(err => {
      dispatch(setLoadingCaleg(false));
      console.log(err);
    })


  }

    return (
        <React.Fragment>
          {
            loading || caleg === undefined ? <h1>Loading....</h1> :
            <div>

            <div className='row'>
                <div className='col-md-12'>
                    <div className='p-4 text-muted card mb-0 '>
                        <div className="d-flex ">
                            <div className='card mb-0' style={{width:"150px", height:"150px", minWidth:'150px'}}>
                                <input type="file" className='d-none' id='logo' onChange={(e) => handleUploadFoto(e)} />
                                    <img src={profil.foto_profil ? `${profil.foto_profil}` : "avatar.jpg"} height="150px"  width="150px" alt="" htmlFor={'logo'} />
                                
                            </div>
                            <div className='d-flex flex-column ml-3 justify-content-center'>
                                <p className='w-50'>Ukuran optimal 225 x 330 pixel dengan Besar file: Maksimum 500.000 bytes (500 Kb). Ekstensi file yang diperbolehkan: JPG, JPEG </p>
                                <label className='btn w-50 btn-outline-primary' htmlFor='logo'>Pilih Foto
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

              
            <form className="mt-5">
                  <div className="form-row">
                      <div className="col-6">
                          <div className="card p-3 h-100">
                              {/* <label htmlFor="noUrut">Nomor Urut</label>
                              <input type="text" className="form-control mb-3" id="noUrut" value={caleg.no_urut} disabled /> */}
                              <label htmlFor="nik">NIK</label>
                              <input type="text" className="form-control mb-3" id="nik" value={profil.NIK} />
                              <label htmlFor="fullName">Nama Lengkap</label>
                              <input type="text" className="form-control mb-3" id="fullName" value={profil.nama} />
                              <label htmlFor="birthPlace">Tempat Lahir</label>
                              <input type="text" className="form-control mb-3" id="birthPlace" value={profil.tempat_lahir} />
                              <label htmlFor="birthDate">Tanggal Lahir</label>
                              <DatePicker
                              onChange={onChange}
                              value={value}
                              className="mb-3"
                              maxDate={new Date()}
                              />
                              <label htmlFor="religion">Agama</label>
                              <input type="text" className="form-control mb-3" id="religion" value={profil.agama} />
                              <label htmlFor="dapil">Daerah Pemilihan</label>
                              <input type="text" className="form-control mb-3" id="dapil" value={profil.dapil} />
                              <label htmlFor="partai">Asal Partai</label>
                              <input type="text" className="form-control mb-3" id="partai" value={profil.partai} />
                          </div>
                      </div>
                      <div className="col-6">
                          <div className="card p-3 h-100">
                              <label htmlFor="email">Email</label>
                              <input type="text" className="form-control mb-3" id="email" value={profil.email} />
                              <label htmlFor="phoneNumber">Nomor Telepon</label>
                              <div class="input-group input-group mb-3">
                                <div class="input-group-prepend">
                                  <span className="input-group-text" id="inputGroup-sizing-default">+62</span>
                                </div>
                                <input type="text" className="form-control" id="phoneNumber" value={profil.noHp} />
                              </div>
                              <label htmlFor="province">Provinsi</label>
                              <input type="text" className="form-control mb-3" id="province" value={profil.provinsi} />
                              <label htmlFor="cityDistrict">Kabupaten / Kota</label>
                              <input type="text" className="form-control mb-3" id="cityDistrict" value={profil.kabupaten} />
                              <label htmlFor="district">Kecamatan</label>
                              <input type="text" className="form-control mb-3" id="district" value={profil.kecamatan} />
                              {/* <label htmlFor="urban">Kelurahan / Desa</label>
                              <input type="text" className="form-control mb-3" id="urban" value="Bone" /> */}
                              <label htmlFor="address">Alamat</label>
                              <textarea className="form-control mb-3" id="address" rows="3"value={profil.alamat} />
                          <button className="btn btn-primary w-30">Simpan</button>
                          </div>
                      </div>
                  </div>
              </form>
            </div>
            // JSON.stringify(caleg)
          }
        </React.Fragment>
    )
}

export default ProfilCalon
