import React, { useEffect, useState } from 'react';
import axios from '../api/config';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux'
import { getCalegLogin, getDapils, getParpols, setAuth } from '../store/action';

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



function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [isEmailFound, setIsEmailFound] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const  auth  = useSelector(state=> state.auth )

    function handleEmailChange(event) {
        if (event.target.value === '' || (event.target.value.includes('@') && (event.target.value.includes('.com') || event.target.value.includes('.id')))) {
            setUser({
                ...user,
                email: event.target.value
            })
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }
    function handlePasswordChange(event) {
        setUser({
            ...user,
            password: event.target.value
        })
    }

    function findEmail(event) {
        event.preventDefault()
        if (user.email === '' || !isEmailValid) {
            toast.error('Masukkan Email Anda!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            setIsEmailFound(true);
        }
    }

    function handleChangeLoginEmail(event) {
        setIsEmailFound(false);
        setUser({
            ...user,
            email: ''
        })
    }

    function handleTogglePasswordVisibility(event) {
        setIsPasswordVisible(!isPasswordVisible);
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `caleg/login`,
            data: {
                email: user.email,
                password: user.password
            }
        })
            .then((response) => {
                toast.success('Login successful!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                localStorage.setItem('access_token', response.data.access_token);
                dispatch(getDapils());
                dispatch(getParpols());
                dispatch(getCalegLogin());
                // localStorage.setItem('status', response.data.status)
                // history.push(`/dashboard`);
                dispatch(setAuth(true))
                navigate('/dashboard', { replace: true })
                // console.log();
            })
            .catch((err) => {
                if(err.response) {
                    // console.log(err.response.data.message);
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
                    toast.error('Internal Server Error', {
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
                                          <h2>LOGIN CALEG</h2>
                                        </div>
                                        <div className="card-body">
                                            <div className="tab-content">
                                                <div className="tab-pane active mx-4" id="sign-in">
                                                    {
                                                        !isEmailFound ? (
                                                            <React.Fragment>
                                                                <div className="form-group mb-2">
                                                                    <label><h4>Email</h4></label>
                                                                    <input onChange={(event) => handleEmailChange(event)} className={`login-input form-control mb-2 text-sm ${isEmailValid ? "" : "is-invalid"}`} name="email" type="text" />
                                                                </div>
                                                                <KPUButton onClick={(event) => findEmail(event)} className="btn mb-3" style={{ width: '100%' }}>Continue</KPUButton>
                                                                <div className="d-flex align-items-center justify-content-between mt-10">
                                                                    <div className="col-lg-6 col-sm-12">
                                                                        <p>Don't have an account?</p>
                                                                    </div>
                                                                    <div className="d-flex col-lg-6 col-sm-12 justify-content-lg-end justify-content-sm-start">
                                                                        <p><Link to="/register" style={{color: '#e78421'}} >Create your Account!</Link></p>
                                                                    </div>
                                                                </div>
                                                                {/* <p>By continuing, you agree to KPU's Conditions of Use and Privacy Notice</p> */}
                                                            </React.Fragment>
                                                        ) : (
                                                            <React.Fragment>
                                                                <div className="form-group mb-2">
                                                                    <label><h5>Email</h5></label>
                                                                    <div className="row">
                                                                        <div className="col-lg-10 col-sm-12">
                                                                            <p className='text-sm'>{user.email}</p>
                                                                            {/* <input type="email" onChange={(event) => handlePasswordChange(event)} className="form-control" name="email" id="email" value={user.email} disabled /> */}
                                                                        </div>
                                                                        <div className="col-lg-2 col-sm-12">
                                                                            {/* eslint-disable-next-line */}
                                                                            <p className="text-sm"><a style={{ cursor: 'pointer' }} onClick={() => handleChangeLoginEmail()} >change</a></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="form-group mb-2">
                                                                    <label><h5>Password</h5></label>
                                                                    <input type="password" onChange={(event) => handlePasswordChange(event)} className="form-control" name="password" id="password" required />
                                                                    <div className="form-control mb-2" onClick={() => handleTogglePasswordVisibility()}>
                                                                        <span className="" id="basic-addon2"><i className={isPasswordVisible ? "fas fa-eye-slash mx-2" : "fas fa-eye mx-2"}></i></span>
                                                                    </div>
                                                                </div> */}
                                                                <div className="form-group mb-2">
                                                                    <label><h6 className="text-secondary fw-normal">Password</h6></label>
                                                                    <div className="input-group">
                                                                        <input onChange={(event) => handlePasswordChange(event)} className="form-control form-default ml-1" name="text" type={isPasswordVisible ? "text" : "password"} placeholder="Password" />
                                                                        <div className="input-group-append mr-1" onClick={() => handleTogglePasswordVisibility()}>
                                                                            <span className="input-group-text" id="inputGroupPrepend"><i className={isPasswordVisible ? "fas fa-eye-slash" : "fas fa-eye"}></i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form-checkbox">
                                                                    <div className="row d-flex align-items-center justify-content-between mb-5">
                                                                        <div className="col-lg-6 col-sm-12">
                                                                            {/* <input type="checkbox" className="custom-checkbox" id="remember1" name="remember1" required="" />
                                                                            <label htmlFor="remember1">Remember me</label> */}
                                                                        </div>
                                                                        <div className="d-flex col-lg-6 col-sm-12 justify-content-lg-end justify-content-sm-start">
                                                                            <p><Link to="/forgot" style={{ color: '#EE3135' }}>Forgot your password?</Link></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <ReCAPTCHA
                                                                        sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_API_KEY}
                                                                        onChange={handleCaptcha}
                                                                    /> */}
                                                                <KPUButton onClick={(event) => handleSubmit(event)} style={{ width: '100%' }} className="btn mb-3">Login</KPUButton>
                                                                <div className="d-flex align-items-center justify-content-between mt-10">
                                                                    <div className="col-lg-6 col-sm-12">
                                                                        <p>Don't have an account?</p>
                                                                    </div>
                                                                    <div className="d-flex col-lg-6 col-sm-12 justify-content-lg-end justify-content-sm-start">
                                                                        <p><Link to="/register" style={{color: '#e78421'}} >Create your Account!</Link></p>
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    {/* <div className="row mt-5">
                                        <div className="col-lg-12 col-sm-12">
                                            <p className="text-center"><Link  to="/">Back to Home</Link></p>
                                        </div>
                                    </div> */}
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

export default Login;