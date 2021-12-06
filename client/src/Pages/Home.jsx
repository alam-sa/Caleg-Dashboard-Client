import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Home = () => {
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
                        <li className="breadcrumb-item active">Dashboard KPU</li>
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
                    <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-info">
                        <div className="inner">
                        <h3>14</h3>
                        <p>Total Partai Terdaftar</p>
                        </div>
                        <div className="icon">
                        <i className="ion ion-flag" />
                        </div>
                        <Link to="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                    </div>
                    {/* ./col */}
                    <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-success">
                        <div className="inner">
                        <h3>153</h3>
                        <p>Bakal Calon Legislatif</p>
                        </div>
                        <div className="icon">
                        <i className="ion ion-stats-bars" />
                        </div>
                        <Link to="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                    </div>
                    {/* ./col */}
                    <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-warning">
                        <div className="inner">
                        <h3>44</h3>
                        <p>User Registrasi</p>
                        </div>
                        <div className="icon">
                        <i className="ion ion-person-add" />
                        </div>
                        <Link to="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                    </div>
                    {/* ./col */}
                    <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-danger">
                        <div className="inner">
                        <h3>10</h3>
                        <p>Pengaduan</p>
                        </div>
                        <div className="icon">
                        <i className="ion ion-chatbubbles" />
                        </div>
                        <Link to="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                    </div>
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
