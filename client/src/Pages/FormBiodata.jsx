import React from 'react'
import { NavLink } from 'react-router-dom'

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
                        <li className="breadcrumb-item active">Biodata & Berkas</li>
                    </ol>
                    </div>{/* /.col */}
                </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            {/* Main content */}
            
            {/* /.content */}
            </div>
     
        </React.Fragment>
    )
}

export default Home
