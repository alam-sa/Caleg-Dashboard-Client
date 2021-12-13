import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { getCalegLogin, getDapils, getParpols, getUserRegistered, getUsers, getUserVerified } from '../store/action';

const Home = () => {
  const { dapils } = useSelector((state) => state.dapil)
  const { parpols } = useSelector((state) => state.parpol)
  const { register, verified } = useSelector((state) => state.user)

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCalegLogin());
    dispatch(getParpols());
    dispatch(getDapils());
    dispatch(getUsers());
    dispatch(getUserRegistered());
    dispatch(getUserVerified());
  },[])
    return (
        <React.Fragment>
             <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1 className="m-0">Dashboard</h1>
                    </div>{/* /.col */}
                    <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><NavLink to="/dashboard">Home</NavLink></li>
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                    </div>{/* /.col */}
                </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                {/* Small boxes (Stat box) */}
                <div className="row">
                    <div className="col-lg-4 col-6">
                    {/* small box */}
                    <div className="small-box bg-info">
                        <div className="inner">
                        <h3>{parpols.length}</h3>
                        <p>Total Partai Terdaftar</p>
                        </div>
                        <div className="icon">
                        <i className="ion ion-flag" />
                        </div>
                        <Link to="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                    </div>
                    {/* ./col */}
                    <div className="col-lg-4 col-6">
                    {/* small box */}
                    <div className="small-box bg-success">
                        <div className="inner">
                        <h3>{verified.length}</h3>
                        <p>Bakal Calon Legislatif</p>
                        </div>
                        <div className="icon">
                        <i className="ion ion-person" />
                        </div>
                        <Link to="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                    </div>
                    {/* ./col */}
                    <div className="col-lg-4 col-6">
                    {/* small box */}
                    <div className="small-box bg-danger">
                        <div className="inner">
                        <h3>{register.length}</h3>
                        <p>User Registrasi</p>
                        </div>
                        <div className="icon">
                        <i className="ion ion-person-add" />
                        </div>
                        <Link to="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                    </div>
                    {/* ./col */}
                   
                    {/* ./col */}
                </div>
                {/* /.row */}
                {/* Main row */}
                </div>{/* /.container-fluid */}
            </section>
            {/* /.content */}
            </div>
     
        </React.Fragment>
    )
}

export default Home
