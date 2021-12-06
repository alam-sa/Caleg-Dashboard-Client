import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCalegLogin, setLoadingCaleg } from '../store/action';
import axios from '../api/config';


const Berkas = () => {
  const [ legal, setLegal ]= useState({
    ktp: "",
    bb1: "",
    bb2: "",
    ijazah: "",
    suket_sehat: "",
    suket_kpu: "",
    skck: "",
    kta_parpol: "",
    dokumen_lainnya: ""
  });

  const [ label, setLabel ]= useState({
    ktp: "",
    bb1: "",
    bb2: "",
    ijazah: "",
    suket_sehat: "",
    suket_kpu: "",
    skck: "",
    kta_parpol: "",
    dokumen_lainnya: ""
  });

const dispatch = useDispatch();

function uploadDokumen(event) {
  event.preventDefault();
  setLabel({
    ...label,
    [event.target.name]: event.target.files[0]
  })
  let selectedFile = event.target.files[0]
  const formData = new FormData();
  formData.append('dokumen', selectedFile);
  axios({
    url: `dokumen/upload`,
    method: 'POST',
    data: formData,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .then((res) => {
    setLegal({
      ...legal,
      [event.target.name]: res.data.dokumen
    })
    // dispatch(getCalegLogin());
  }).catch(err => {
    dispatch(setLoadingCaleg(false));
    console.log(err);
  })
}

function handleSubmit(event) {
  event.preventDefault()
  axios({
    url: `dokumen/caleg`,
    method: 'PATCH',
    data: legal,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .then((res) => {
    setLegal({
      ...legal,
      [event.target.name]: res.data.dokumen
    })
    // dispatch(getCalegLogin());
  }).catch(err => {
    dispatch(setLoadingCaleg(false));
    console.log(err);
  })
}
  
  return (
    <div className='container-fluid'>
   <form onSubmit={(e) => handleSubmit(e)}>      

      <div className="form-group col-10 mx-auto">
          <label htmlFor="exampleInputFile">Scan e-KTP</label>
          <div className="input-group">
            <div className="custom-file">
              <input type="file" name="ktp" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
              <label className="custom-file-label" htmlFor="exampleInputFile" >{label.ktp.name? label.ktp.name : "Choose file"}</label>
            </div>
            {/* <div className="input-group-append" onClick={(e) => uploadDokumen(e, "ktp")}>
              <span className="input-group-text">Upload</span>
            </div> */}
          </div>
        </div>

        <div className="form-group col-10 mx-auto">
          <label htmlFor="exampleInputFile">Formulir BB.1</label>
          <div className="input-group">
            <div className="custom-file">
              <input type="file" name="bb1" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
              <label className="custom-file-label" htmlFor="exampleInputFile">{label.bb1.name? label.bb1.name : "Choose file"}</label>
            </div>
            {/* <div className="input-group-append">
              <span className="input-group-text">Upload</span>
            </div> */}
          </div>
        </div>

        <div className="form-group col-10 mx-auto">
          <label htmlFor="exampleInputFile">Formulir BB.2</label>
          <div className="input-group">
            <div className="custom-file">
              <input type="file" name="bb2" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
              <label className="custom-file-label" htmlFor="exampleInputFile">{label.bb2.name? label.bb2.name : "Choose file"}</label>
            </div>
            {/* <div className="input-group-append">
              <span className="input-group-text">Upload</span>
            </div> */}
          </div>
        </div>

        <div className="form-group col-10 mx-auto">
          <label htmlFor="exampleInputFile">Surat Keterangan Sehat</label>
          <div className="input-group">
            <div className="custom-file">
              <input type="file" name="suket_sehat" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
              <label className="custom-file-label" htmlFor="exampleInputFile">{label.suket_sehat.name? label.suket_sehat.name : "Choose file"}</label>
            </div>
            {/* <div className="input-group-append">
              <span className="input-group-text">Upload</span>
            </div> */}
          </div>
        </div>

        <div className="form-group col-10 mx-auto">
          <label htmlFor="exampleInputFile">Scan Ijazah SMA</label>
          <div className="input-group">
            <div className="custom-file">
              <input type="file" name="ijazah" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
              <label className="custom-file-label" htmlFor="exampleInputFile">{label.ijazah.name? label.ijazah.name : "Choose file"}</label>
            </div>
            {/* <div className="input-group-append">
              <span className="input-group-text">Upload</span>
            </div> */}
          </div>
        </div>

        <div className="form-group col-10 mx-auto">
          <label htmlFor="exampleInputFile">Surat Keterangan KPU</label>
          <div className="input-group">
            <div className="custom-file">
              <input type="file" name="suket_kpu" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
              <label className="custom-file-label" htmlFor="exampleInputFile">{label.suket_kpu.name? label.suket_kpu.name : "Choose file"}</label>
            </div>
            {/* <div className="input-group-append">
              <span className="input-group-text">Upload</span>
            </div> */}
          </div>
        </div>

        <div className="form-group col-10 mx-auto">
          <label htmlFor="exampleInputFile">SKCK</label>
          <div className="input-group">
            <div className="custom-file">
              <input type="file" name="skck" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
              <label className="custom-file-label" htmlFor="exampleInputFile">{label.skck.name? label.skck.name : "Choose file"}</label>
            </div>
            {/* <div className="input-group-append">
              <span className="input-group-text">Upload</span>
            </div> */}
          </div>
        </div>

        <div className="form-group col-10 mx-auto">
          <label htmlFor="exampleInputFile">Scan KTA Parpol</label>
          <div className="input-group">
            <div className="custom-file">
              <input type="file" name="kta_parpol" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
              <label className="custom-file-label" htmlFor="exampleInputFile">{label.kta_parpol.name? label.kta_parpol.name : "Choose file"}</label>
            </div>
            {/* <div className="input-group-append">
              <span className="input-group-text">Upload</span>
            </div> */}
          </div>
        </div>

        <div className="form-group col-10 mx-auto">
          <label htmlFor="exampleInputFile">File Pendukung Lainnya</label>
          <div className="input-group">
            <div className="custom-file">
              <input type="file" name="dokumen_lainnya" className="custom-file-input" onChange={(e) => uploadDokumen(e)}/>
              <label className="custom-file-label" htmlFor="exampleInputFile">{label.dokumen_lainnya.name? label.dokumen_lainnya.name : "Choose file"}</label>
            </div>
            {/* <div className="input-group-append">
              <span className="input-group-text">Upload</span>
            </div> */}
          </div>
        </div>

        <div className="form-group col-10 mx-auto">
          <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">Submit</button>
          </div>
      </div>
        </form> 


      </div>

//     </div>
// </div>
  )
}

export default Berkas
