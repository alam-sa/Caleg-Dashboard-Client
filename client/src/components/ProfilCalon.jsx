import React, { useEffect, useState } from 'react'
import moment from 'moment';
import DatePicker from 'react-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getCalegLogin, setLoadingCaleg, getProvinces, getDistricts, getDapils, getParpols } from '../store/action';
import axios from '../api/config'
import Select from 'react-select'
import { toast } from 'react-toastify';

var idLocale = require('moment/locale/id'); 
  moment.locale('id', idLocale);

const ProfilCalon = ({loading, caleg, dapil, parpol}) => {
  const { provinces, districts, subdistricts } = useSelector((state) => state.region);
  const { dapils } = useSelector((state) => state.dapil);
  const { parpols } = useSelector((state) => state.parpol);
  
  const [value, onChange] = useState(new Date())
  const [profil, setProfil] = useState({
    nama: caleg.nama,
    NIK: caleg.NIK,
    foto_profil: caleg.foto_profil,
    partai: { value: caleg.partaiId, label: parpol.nama_partai },
    dapil: { value: caleg.dapilId, label: dapil.nama_dapil },
    email: caleg.email,
    tempat_lahir: caleg.tempat_lahir,
    agama: caleg.agama,
    dapilId: caleg.dapilId,
    partaiId:caleg.partaiId,
    noHp: caleg.noHp,
    provinsi: caleg.provinsi,
    kabupaten: caleg.kabupaten,
    kecamatan: caleg.kecamatan,
    alamat: caleg.alamat
  })


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProvinces())
    dispatch(getDapils());
    dispatch(getParpols());
  }, [dispatch])
  useEffect(() => {
  },[caleg, provinces, districts])

  function handleSelectProvince(selectedProvince) {
      setProfil({
        ...profil,
        provinsi: selectedProvince
      })
      dispatch(getDistricts('province', selectedProvince.label))
  }
  function handleSelectDistrict(selectedDistrict) {
    setProfil({
      ...profil,
      kabupaten: selectedDistrict
    })
    dispatch(getDistricts('city', selectedDistrict.label))
  }

  function handleSelectSubdistrict(selectedSubdistrict) {
    setProfil({
      ...profil,
      kecamatan: selectedSubdistrict
    })
  }

  function handleSelectDapil(selectedDapil) {
    setProfil({
      ...profil,
      dapilId: selectedDapil.value,
      dapil: selectedDapil
    })
  }

  function handleSelectPartai(selectedPartai) {
    setProfil({
      ...profil,
      partaiId: selectedPartai.value,
      partai: selectedPartai
    })
  }

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

  function handleSubmit(event) {
    event.preventDefault()
    const payload = {
      nama: caleg.nama,
      NIK: profil.NIK,
      foto_profil: profil.foto_profil,
      email: profil.email,
      tempat_lahir: profil.tempat_lahir,
      agama: profil.agama,
      dapilId: profil.dapilId,
      partaiId:profil.partaiId,
      noHp: profil.noHp,
      provinsi: JSON.stringify(profil.provinsi),
      kabupaten: JSON.stringify(profil.kabupaten),
      kecamatan: JSON.stringify(profil.kecamatan),
      alamat: profil.alamat
    }
    axios({
      url: `caleg/profil`,
      method: 'PATCH',
      data: payload,
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
    .then((res) => {
      dispatch(getCalegLogin());
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
              <form onSubmit={(e) => handleSubmit(e)} className="mt-5">
                  <div className="form-row">
                      <div className="col-6">
                          <div className="card p-3 h-100">
                              {/* <label htmlFor="noUrut">Nomor Urut</label>
                              <input type="text" className="form-control mb-3" id="noUrut" value={caleg.no_urut} disabled /> */}
                              <label htmlFor="nik">NIK</label>
                              <input type="text" onChange={(e) => setProfil({...profil, NIK: e.target.value})} name="NIK" className="form-control mb-3" id="nik" value={profil.NIK} />
                              <label htmlFor="fullName">Nama Lengkap</label>
                              <input type="text" onChange={(e) => setProfil({...profil, nama: e.target.value})} name="nama" className="form-control mb-3" id="fullName" value={profil.nama} />
                              <label htmlFor="birthPlace">Tempat Lahir</label>
                              <input type="text" onChange={(e) => setProfil({...profil, tempat_lahir: e.target.value})} name="tempat_lahir" className="form-control mb-3" id="birthPlace" value={profil.tempat_lahir} />
                              <label htmlFor="birthDate">Tanggal Lahir</label>
                              <DatePicker
                              onChange={onChange}
                              value={value}
                              className="mb-3"
                              maxDate={new Date()}
                              />
                              <label htmlFor="religion">Agama</label>
                              <input type="text" name="agama" onChange={(e) => setProfil({...profil, agama: e.target.value})} className="form-control mb-3" id="religion" value={profil.agama} />
                              <label htmlFor="dapil">Daerah Pemilihan</label>
                              {/* <input type="text" className="form-control mb-3" id="dapil" value={profil.dapil} /> */}
                              <Select
                                  name="dapil"
                                  closeMenuOnSelect={true}
                                  hideSelectedOptions={false}
                                  options={dapils}
                                  value={profil.dapil}
                                  className="mb-3"
                                  classNamePrefix="select"
                                  placeholder={'Pilih Daerah Pemilih'}
                                  onChange={handleSelectDapil}
                              />
                              <label htmlFor="partai">Asal Partai</label>
                              {/* <input type="text" className="form-control mb-3" id="partai" value={profil.partai} /> */}
                              <Select
                                  name="partai"
                                  closeMenuOnSelect={true}
                                  hideSelectedOptions={false}
                                  options={parpols}
                                  value={profil.partai}
                                  className="mb-3"
                                  classNamePrefix="select"
                                  placeholder={'Pilih Daerah Pemilih'}
                                  onChange={handleSelectPartai}
                              />
                          </div>
                      </div>
                      <div className="col-6">
                          <div className="card p-3 h-100">
                              <label htmlFor="email">Email</label>
                              <input type="text" name="email" onChange={(e) => setProfil({...profil, email: e.target.value})} className="form-control mb-3" id="email" value={profil.email} />
                              <label htmlFor="phoneNumber">Nomor Telepon</label>
                              <div class="input-group input-group mb-3">
                                <div class="input-group-prepend">
                                  <span className="input-group-text" id="inputGroup-sizing-default">+62</span>
                                </div>
                                <input type="text" name="noHp" onChange={(e) => setProfil({...profil, noHp: e.target.value})} className="form-control" id="phoneNumber" value={profil.noHp} />
                              </div>
                              <label htmlFor="province">Provinsi</label>
                              <Select
                                  name="Provinsi"
                                  closeMenuOnSelect={true}
                                  hideSelectedOptions={false}
                                  options={provinces}
                                  value={profil.provinsi}
                                  className="mb-3"
                                  classNamePrefix="select"
                                  placeholder={'Pilih Provinsi'}
                                  onChange={handleSelectProvince}
                              />
                              <label htmlFor="cityDistrict">Kabupaten / Kota</label>
                              <Select
                                  name="kabupaten"
                                  closeMenuOnSelect={true}
                                  hideSelectedOptions={false}
                                  options={districts}
                                  value={profil.kabupaten}
                                  className="mb-3"
                                  classNamePrefix="select"
                                  placeholder={'Pilih Kabupaten / kota'}
                                  onChange={handleSelectDistrict}
                                  isOptionDisabled={(option) => option.disabled}
                              />
                              <label htmlFor="district">Kecamatan</label>
                              <Select
                                  name="kecamatan"
                                  closeMenuOnSelect={true}
                                  hideSelectedOptions={false}
                                  options={subdistricts}
                                  value={profil.kecamatan}
                                  className="mb-3"
                                  classNamePrefix="select"
                                  placeholder={'Pilih Kecamatan'}
                                  onChange={handleSelectSubdistrict}
                                  isOptionDisabled={(option) => option.disabled}
                              />
                              {/* <label htmlFor="urban">Kelurahan / Desa</label>
                              <input type="text" className="form-control mb-3" id="urban" value="Bone" /> */}
                              <label htmlFor="address">Alamat</label>
                              <textarea className="form-control mb-3" name="alamat" id="address" rows="3"value={profil.alamat} onChange={(e) => setProfil({...profil, alamat: e.target.value})} />
                          <button type="submit" className="btn btn-primary w-30">Simpan</button>
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
