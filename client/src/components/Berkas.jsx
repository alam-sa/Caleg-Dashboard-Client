import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getCalegLogin, getDokumen, setLoadingCaleg, setStatus, updateStatusCaleg } from '../store/action';
import axios from '../api/config';
import { toast } from 'react-toastify';

const Berkas = ({caleg}) => {

  const { dokumen } = useSelector((state) => state.dokumen);

  const [ legal, setLegal ]= useState({
    ktp: dokumen.ktp,
    bb1: dokumen.bb1,
    bb2: dokumen.bb2,
    ijazah: dokumen.ijazah,
    suket_sehat: dokumen.suket_sehat,
    suket_kpu: dokumen.suket_kpu,
    skck: dokumen.skck,
    kta_parpol: dokumen.kta_parpol,
    dokumen_lainnya: dokumen.dokumen_lainnya
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

useEffect(() => {
  // dispatch(getDokumen(caleg.dokumenId))
},[])

function uploadDokumen(event) {
  event.preventDefault();
  setLabel({
    ...label,
    [event.target.name]: event.target.files[0]
  })
  let selectedFile = event.target.files[0]
  const formData = new FormData();
  formData.append('berkas', selectedFile);
  axios({
    url: `berkas/upload`,
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
  if (legal.ktp && legal.bb1 && legal.bb2 && legal.ijazah && legal.suket_sehat && legal.suket_kpu && legal.skck && legal.kta_parpol && legal.dokumen_lainnya) {
    axios({
      url: `berkas/caleg/${caleg.dokumenId}`,
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
      dispatch(getCalegLogin());
      dispatch(updateStatusCaleg(caleg.id, 2))
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
      toast.error("Gagal upload dokumen!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  } else {
    toast.error("Lengkapi dokumen anda!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  
}
  
  return (
    <div className='container-fluid'>
      <div className='row'>
                  <div className='d-flex flex-column col-md-12'>
                      <div className='p-4 text-muted card mb-0 '>
                          <div className="d-flex justify-content-center">
                              
                              <div className='d-flex flex-column ml-3'>
                              <div className='card mb-0' style={{width:"150px", height:"150px", minWidth:'150px'}}>
                                  <input type="file" accept="application/pdf" className='d-none' id='logo' />
                                      <img src={"pdf.png"} height="150px"  width="150px" alt="" htmlFor={'logo'} />
                              </div>
                                  <Link to="/files/FormulirBB1.pdf" className='btn w-10 mt-3 btn-success' target="_blank" download>download BB.1</Link>
                              </div>

                              <div className='d-flex flex-column ml-3'>
                              <div className='card mb-0' style={{width:"150px", height:"150px", minWidth:'150px'}}>
                                  <input type="file" accept="application/pdf" className='d-none' id='logo' />
                                      <img src={"pdf.png"} height="150px"  width="150px" alt="" htmlFor={'logo'} />
                              </div>
                              <Link to="/files/FormulirBB2.pdf" className='btn w-10 mt-3 btn-success' target="_blank" download>download BB.2</Link>
                              </div>
                          </div>
                      </div>
                  </div>
              </div> 

              <div className='p-4 text-muted card mt-3 mb-0 '>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group col-10 mx-auto">
          {
            dokumen.ktp_verified === null ?
            (<React.Fragment>
              <label htmlFor="exampleInputFile">Scan e-KTP</label>
              {
                dokumen.ktp ?
                (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                      <i className="fas fa-check-circle mr-5"></i>
                      <div>
                          Dokumen KTP Menunggu Verifikasi
                      </div>
                  </div>
                )
                :
                (
                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" accept="application/pdf" name="ktp" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
                      <label className="custom-file-label" htmlFor="exampleInputFile" >{label.ktp.name? label.ktp.name : "Choose file"}</label>
                    </div>
                  </div>
                )
              }
            </React.Fragment>
            )
            : dokumen.ktp_verified === false ? 
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Scan e-KTP</label>
                <div className="input-group">
                <div className="custom-file">
                  <input type="file" accept="application/pdf" name="ktp" className={`custom-file-input ${label.ktp.name ? null : "is-invalid"} `} onChange={(e) => uploadDokumen(e)} />
                  <label className="custom-file-label" htmlFor="exampleInputFile" >{label.ktp.name? label.ktp.name : "Choose file"}</label>
                </div>
                <div className="invalid-feedback" style={{display: `${label.ktp.name ? "none" : "block" }`}}>Dokumen anda tidak valid, upload dokumen valid.</div>
              </div>
              </React.Fragment>
            ) :
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Scan e-KTP</label>
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <i className="fas fa-check-circle mr-5"></i>
                    <div>
                        Your KTP has already been verified.
                    </div>
                </div>
              </React.Fragment>
            )
          } 
        </div>

        {/* BB.1 */}
        <div className="form-group col-10 mx-auto">
          {
            dokumen.bb1_verified === null ?
            (<React.Fragment>
              <label htmlFor="exampleInputFile">Formulir BB.1</label>
              {
                dokumen.bb1 ?
                (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                      <i className="fas fa-check-circle mr-5"></i>
                      <div>
                          Dokumen BB.1 Menunggu Verifikasi
                      </div>
                  </div>
                )
                :
                (
                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" accept="application/pdf" name="bb1" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
                      <label className="custom-file-label" htmlFor="exampleInputFile" >{label.bb1.name? label.bb1.name : "Choose file"}</label>
                    </div>
                  </div>
                )
              }
            </React.Fragment>
            )
            : dokumen.bb1_verified === false ? 
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Formulir BB.1</label>
                <div className="input-group">
                <div className="custom-file">
                  <input type="file" accept="application/pdf" name="bb1" className="custom-file-input is-invalid" onChange={(e) => uploadDokumen(e)} />
                  <label className="custom-file-label" htmlFor="exampleInputFile" >{label.bb1.name? label.bb1.name : "Choose file"}</label>
                </div>
                <div className="invalid-feedback" style={{display: "block"}}>Dokumen anda tidak valid, upload dokumen valid.</div>
              </div>
              </React.Fragment>
            ) :
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Formulir BB.1</label>
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <i className="fas fa-check-circle mr-5"></i>
                    <div>
                        Dokumen BB.1 telah diverifikasi.
                    </div>
                </div>
              </React.Fragment>
            )
          } 
        </div>
        {/* END OF BB.1 */}

        {/* BB.2 */}
        <div className="form-group col-10 mx-auto">
          {
            dokumen.bb2_verified === null ?
            (<React.Fragment>
              <label htmlFor="exampleInputFile">Formulir BB.2</label>
              {
                dokumen.bb2 ?
                (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                      <i className="fas fa-check-circle mr-5"></i>
                      <div>
                          Dokumen BB.2 Menunggu Verifikasi
                      </div>
                  </div>
                )
                :
                (
                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" accept="application/pdf" name="bb2" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
                      <label className="custom-file-label" htmlFor="exampleInputFile" >{label.bb2.name? label.bb2.name : "Choose file"}</label>
                    </div>
                  </div>
                )
              }
            </React.Fragment>
            )
            : dokumen.bb2_verified === false ? 
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Formulir BB.2</label>
                <div className="input-group">
                <div className="custom-file">
                  <input type="file" accept="application/pdf" name="bb2" className="custom-file-input is-invalid" onChange={(e) => uploadDokumen(e)} />
                  <label className="custom-file-label" htmlFor="exampleInputFile" >{label.bb2.name? label.bb2.name : "Choose file"}</label>
                </div>
                <div className="invalid-feedback" style={{display: "block"}}>Dokumen anda tidak valid, upload dokumen valid.</div>
              </div>
              </React.Fragment>
            ) :
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Formulir BB.2</label>
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <i className="fas fa-check-circle mr-5"></i>
                    <div>
                        BB.2 telah diverifikasi.
                    </div>
                </div>
              </React.Fragment>
            )
          } 
        </div>
        {/* END OF BB.2 */}

        {/* Surat Keterangan Sehat */}
        <div className="form-group col-10 mx-auto">
          {
            dokumen.suket_sehat_verified === null ?
            (<React.Fragment>
              <label htmlFor="exampleInputFile">Surat Keterangan Sehat</label>
              {
                dokumen.suket_sehat ?
                (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                      <i className="fas fa-check-circle mr-5"></i>
                      <div>
                          Surat Keterangan Sehat Menunggu Verifikasi
                      </div>
                  </div>
                )
                :
                (
                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" accept="application/pdf" name="suket_sehat" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
                      <label className="custom-file-label" htmlFor="exampleInputFile" >{label.suket_sehat.name? label.suket_sehat.name : "Choose file"}</label>
                    </div>
                  </div>
                )
              }
            </React.Fragment>
            )
            : dokumen.suket_sehat_verified === false ? 
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Surat Keterangan Sehat</label>
                <div className="input-group">
                <div className="custom-file">
                  <input type="file" accept="application/pdf" name="suket_sehat" className="custom-file-input is-invalid" onChange={(e) => uploadDokumen(e)} />
                  <label className="custom-file-label" htmlFor="exampleInputFile" >{label.suket_sehat.name? label.suket_sehat.name : "Choose file"}</label>
                </div>
                <div className="invalid-feedback" style={{display: "block"}}>Dokumen anda tidak valid, upload dokumen valid.</div>
              </div>
              </React.Fragment>
            ) :
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Surat Keterangan Sehat</label>
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <i className="fas fa-check-circle mr-5"></i>
                    <div>
                        Surat Keterangan Sehat telah diverifikasi.
                    </div>
                </div>
              </React.Fragment>
            )
          } 
        </div>
        {/* END OF Surat Keterangan Sehat */}

        {/* IJAZAH */}
        <div className="form-group col-10 mx-auto">
          {
            dokumen.ijazah_verified === null ?
            (<React.Fragment>
              <label htmlFor="exampleInputFile">Scan Ijazah SMA</label>
              {
                dokumen.ijazah ?
                (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                      <i className="fas fa-check-circle mr-5"></i>
                      <div>
                          Ijazah Menunggu Verifikasi
                      </div>
                  </div>
                )
                :
                (
                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" accept="application/pdf" name="ijazah" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
                      <label className="custom-file-label" htmlFor="exampleInputFile" >{label.ijazah.name? label.ijazah.name : "Choose file"}</label>
                    </div>
                  </div>
                )
              }
            </React.Fragment>
            )
            : dokumen.ijazah_verified === false ? 
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Scan Ijazah SMA</label>
                <div className="input-group">
                <div className="custom-file">
                  <input type="file" accept="application/pdf" name="ijazah" className="custom-file-input is-invalid" onChange={(e) => uploadDokumen(e)} />
                  <label className="custom-file-label" htmlFor="exampleInputFile" >{label.ijazah.name? label.ijazah.name : "Choose file"}</label>
                </div>
                <div className="invalid-feedback" style={{display: "block"}}>Dokumen anda tidak valid, upload dokumen valid.</div>
              </div>
              </React.Fragment>
            ) :
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Scan Ijazah SMA</label>
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <i className="fas fa-check-circle mr-5"></i>
                    <div>
                        Ijazah telah diverifikasi.
                    </div>
                </div>
              </React.Fragment>
            )
          } 
        </div>
        {/* END OF IJAZAH */}

        {/* Surat Keterangan KPU */}
        <div className="form-group col-10 mx-auto">
          {
            dokumen.suket_kpu_verified === null ?
            (<React.Fragment>
              <label htmlFor="exampleInputFile">Surat Keterangan KPU</label>
              {
                dokumen.suket_kpu ?
                (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                      <i className="fas fa-check-circle mr-5"></i>
                      <div>
                      Surat Keterangan KPU Menunggu Verifikasi
                      </div>
                  </div>
                )
                :
                (
                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" accept="application/pdf" name="suket_kpu" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
                      <label className="custom-file-label" htmlFor="exampleInputFile" >{label.suket_kpu.name? label.suket_kpu.name : "Choose file"}</label>
                    </div>
                  </div>
                )
              }
            </React.Fragment>
            )
            : dokumen.suket_kpu_verified === false ? 
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Surat Keterangan KPU</label>
                <div className="input-group">
                <div className="custom-file">
                  <input type="file" accept="application/pdf" name="suket_kpu" className="custom-file-input is-invalid" onChange={(e) => uploadDokumen(e)} />
                  <label className="custom-file-label" htmlFor="exampleInputFile" >{label.suket_kpu.name? label.suket_kpu.name : "Choose file"}</label>
                </div>
                <div className="invalid-feedback" style={{display: "block"}}>Dokumen anda tidak valid, upload dokumen valid.</div>
              </div>
              </React.Fragment>
            ) :
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Surat Keterangan KPU</label>
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <i className="fas fa-check-circle mr-5"></i>
                    <div>
                    Surat Keterangan KPU telah diverifikasi.
                    </div>
                </div>
              </React.Fragment>
            )
          } 
        </div>
        {/* END OF Surat Keterangan KPU */}

        {/* SKCK */}
        <div className="form-group col-10 mx-auto">
          {
            dokumen.skck_verified === null ?
            (<React.Fragment>
              <label htmlFor="exampleInputFile">SKCK</label>
              {
                dokumen.skck ?
                (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                      <i className="fas fa-check-circle mr-5"></i>
                      <div>
                         SKCK Menunggu Verifikasi
                      </div>
                  </div>
                )
                :
                (
                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" accept="application/pdf" name="skck" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
                      <label className="custom-file-label" htmlFor="exampleInputFile" >{label.skck.name? label.skck.name : "Choose file"}</label>
                    </div>
                  </div>
                )
              }
            </React.Fragment>
            )
            : dokumen.skck_verified === false ? 
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">SKCK</label>
                <div className="input-group">
                <div className="custom-file">
                  <input type="file" accept="application/pdf" name="skck" className="custom-file-input is-invalid" onChange={(e) => uploadDokumen(e)} />
                  <label className="custom-file-label" htmlFor="exampleInputFile" >{label.skck.name? label.skck.name : "Choose file"}</label>
                </div>
                <div className="invalid-feedback" style={{display: "block"}}>Dokumen anda tidak valid, upload dokumen valid.</div>
              </div>
              </React.Fragment>
            ) :
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">SKCK</label>
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <i className="fas fa-check-circle mr-5"></i>
                    <div>
                       SKCK telah diverifikasi.
                    </div>
                </div>
              </React.Fragment>
            )
          } 
        </div>
        {/* END OF SKCK */}

        {/* Scan KTA Parpol*/}
        <div className="form-group col-10 mx-auto">
          {
            dokumen.kta_parpol_verified === null ?
            (<React.Fragment>
              <label htmlFor="exampleInputFile">Scan KTA Parpol</label>
              {
                dokumen.kta_parpol ?
                (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                      <i className="fas fa-check-circle mr-5"></i>
                      <div>
                         KTA Parpol Menunggu Verifikasi
                      </div>
                  </div>
                )
                :
                (
                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" accept="application/pdf" name="kta_parpol" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
                      <label className="custom-file-label" htmlFor="exampleInputFile" >{label.kta_parpol.name? label.kta_parpol.name : "Choose file"}</label>
                    </div>
                  </div>
                )
              }
            </React.Fragment>
            )
            : dokumen.kta_parpol_verified === false ? 
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Scan KTA Parpol</label>
                <div className="input-group">
                <div className="custom-file">
                  <input type="file" accept="application/pdf" name="kta_parpol" className="custom-file-input is-invalid" onChange={(e) => uploadDokumen(e)} />
                  <label className="custom-file-label" htmlFor="exampleInputFile" >{label.kta_parpol.name? label.kta_parpol.name : "Choose file"}</label>
                </div>
                <div className="invalid-feedback" style={{display: "block"}}>Dokumen anda tidak valid, upload dokumen valid.</div>
              </div>
              </React.Fragment>
            ) :
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">Scan KTA Parpol</label>
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <i className="fas fa-check-circle mr-5"></i>
                    <div>
                       KTA Parpol telah diverifikasi.
                    </div>
                </div>
              </React.Fragment>
            )
          } 
        </div>
        {/* END OF Scan KTA Parpol */}

        {/* File Pendukung Lainnya */}
        <div className="form-group col-10 mx-auto">
          {
            dokumen.dokumen_lainnya_verified === null ?
            (<React.Fragment>
              <label htmlFor="exampleInputFile">File Pendukung Lainnya</label>
              {
                dokumen.dokumen_lainnya ?
                (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                      <i className="fas fa-check-circle mr-5"></i>
                      <div>
                          Dokumen Pendukung Lainnya Menunggu Verifikasi
                      </div>
                  </div>
                )
                :
                (
                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" accept="application/pdf" name="dokumen_lainnya" className="custom-file-input" onChange={(e) => uploadDokumen(e)} />
                      <label className="custom-file-label" htmlFor="exampleInputFile" >{label.dokumen_lainnya.name? label.dokumen_lainnya.name : "Choose file"}</label>
                    </div>
                  </div>
                )
              }
            </React.Fragment>
            )
            : dokumen.dokumen_lainnya_verified === false ? 
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">File Pendukung Lainnya</label>
                <div className="input-group">
                <div className="custom-file">
                  <input type="file" accept="application/pdf" name="dokumen_lainnya" className="custom-file-input is-invalid" onChange={(e) => uploadDokumen(e)} />
                  <label className="custom-file-label" htmlFor="exampleInputFile" >{label.dokumen_lainnya.name? label.dokumen_lainnya.name : "Choose file"}</label>
                </div>
                <div className="invalid-feedback" style={{display: "block"}}>Dokumen anda tidak valid, upload dokumen valid.</div>
              </div>
              </React.Fragment>
            ) :
            (
              <React.Fragment>
                <label htmlFor="exampleInputFile">File Pendukung Lainnya</label>
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <i className="fas fa-check-circle mr-5"></i>
                    <div>
                        Dokumen Pendukung Lainnya telah diverifikasi.
                    </div>
                </div>
              </React.Fragment>
            )
          } 
        </div>
        {/* END OF File Pendukung Lainnya */}

        <div className="form-group col-10 mx-auto">
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
      </form>
      </div>
    </div>
  )
}

export default Berkas
