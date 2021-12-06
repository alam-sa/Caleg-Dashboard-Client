import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Select from 'react-select'
import axios  from '../api/config';
import { getParpols, getDapils, registerCaleg } from '../store/action'

const KPUButton = styled.button`
    color: #fff;
    background-color: #e78421;
    border-color: #e78421;
    box-shadow: none;
    margin-top: 10px;

    &:hover {
        color: #fff;
        background-color: #e99037;
        border-color: #e78421;
        box-shadow: none;
    }
`;

function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userData, setUserData] = useState({
        nama: "",
        NIK: "",
        partai: "",
        dapil: "",
        email: "",
        password: ""
    })
    
    const parpols = useSelector(state => state.parpol.parpols);
    const dapils = useSelector(state => state.dapil.dapils)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getParpols());
        dispatch(getDapils());
    }, [])
   
    function handleSelectPartai(selectedPartai) {
        setUserData({
            ...userData,
            partai: selectedPartai
        })
    }
    function handleSelectDapil(selectedDapil) {
        setUserData({
            ...userData,
            dapil: selectedDapil
        })
    }
    function handleInput(e) {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit() {
        if (userData.nama && userData.NIK && userData.dapil && userData.partai && userData.email && userData.password) {
            const payload = {
                nama: userData.nama,
                NIK: userData.NIK,
                partaiId: userData.partai.value,
                dapilId: userData.dapil.value,
                email: userData.email,
                password: userData.password

            }
            axios({
                url: `caleg/register`,
                method: 'POST',
                data: payload
              })
              .then(({data}) => {
                toast.success(`Akun telah berhasil dibuat`, {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                navigate("/login");
              }).catch(err => {
                if (err.response.data.message) {
                    toast.error(err.response.data.message[0], {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      }); 
                } else {
                    toast.error("Registrasi Gagal!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      }); 
                }
              })
        }else {
            toast.error("Lengkapi Data Anda!", {
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
        <React.Fragment>
            <div className="page-wrapper" style={{ backgroundColor: '#EEEEEE', height: '95vh' }}>
                <main className="main login-page">
                    <div className="page-content w-100">
                        <div className="container-fluid">
                            <div className="row d-flex justify-content-center mb-10">
                                <div className="col-lg-4 col-sm-12 mt-10 mb-10">
                                    <div className="d-flex justify-content-center">
                                        <Link to="/">
                                            <img style={{ width: '300px' }} src="KPU-Gowa-header-2-1637450221446.png" alt="logo" />
                                        </Link>
                                    </div>
                                    <div className="card mt-5" style={{ borderRadius: '10px' }}>
                                    <div className="card card-outline card-warning" >
                                        <div className="card-header text-center">
                                          <h2>REGISTER CALEG</h2>
                                        </div>
                                        <div className="card-body mr-4 ml-4">
                                          {/* <form> */}
                                            <div className="input-group mb-3">
                                              <input type="text" name="nama" className="form-control" onChange={(e) => handleInput(e)} placeholder="Nama Lengkap" />
                                            </div>
                                            <div className="input-group mb-3">
                                              <input type="text" name="NIK" className="form-control" onChange={(e) => handleInput(e)} placeholder="NIK" />
                                            </div>
                                            <div className="input-group mb-3" >
                                                <Select
                                                    name="dapil"
                                                    closeMenuOnSelect={true}
                                                    hideSelectedOptions={false}
                                                    options={parpols}
                                                    value={userData.partai}
                                                    className="col-12 p-0"
                                                    classNamePrefix="select"
                                                    placeholder={'Asal Partai'}
                                                    onChange={handleSelectPartai}
                                                />
                                            </div>
                                            <div className="input-group mb-3" >
                                                <Select
                                                    name="dapil"
                                                    closeMenuOnSelect={true}
                                                    hideSelectedOptions={false}
                                                    options={dapils}
                                                    value={userData.dapil}
                                                    className="col-12 p-0"
                                                    classNamePrefix="select"
                                                    placeholder={'Daerah Pemilihan'}
                                                    onChange={handleSelectDapil}
                                                />
                                            </div>
                                            <div className="input-group mb-3">
                                              <input type="email" name="email" className="form-control" onChange={(e) => handleInput(e)} placeholder="Email" />
                                              <div className="input-group-append">
                                                <div className="input-group-text">
                                                  <span className="fas fa-envelope" />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="input-group mb-3">
                                              <input type={passwordVisible ? "text" : "password"} name="password" className="form-control" onChange={(e) => handleInput(e)} placeholder="Password" />
                                              <div className="input-group-append">
                                                <div onClick={() => setPasswordVisible(!passwordVisible)}className="input-group-text">
                                                  <span className={passwordVisible ? "fas fa-unlock" : "fas fa-lock"} />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-8">
                                                {/* <div className="icheck-primary">
                                                  <input type="checkbox" id="agreeTerms" name="terms" defaultValue="agree" />
                                                  <label htmlFor="agreeTerms">
                                                    I agree to the <a href="#">terms</a>
                                                  </label>
                                                </div> */}
                                              </div>
                                              {/* /.col */}
                                              <div className="col-4">
                                                {/* <button type="submit" className="btn btn-primary btn-block">Register</button> */}
                                                <KPUButton onClick={handleSubmit} style={{ width: '100%' }} className="btn mb-3">Register</KPUButton>
                                              </div>
                                              {/* /.col */}
                                            </div>
                                          {/* </form> */}
                                          <p><Link to="/login" style={{color: '#e78421'}} >I already have an account!</Link></p>
                                        </div>
                                        {/* /.form-box */}
                                      </div>{/* /.card */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </React.Fragment>
    )
}

export default Register;