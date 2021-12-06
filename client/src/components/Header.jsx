import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
  const {status} = useSelector((state) => state.status)

  useEffect(() => {

  },[status])
    return (
        <div>
           {/* Navbar */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                <Link to="/dashboard" className="nav-link">Dashboard KPU</Link>
                </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                
                {/* Notifications Dropdown Menu */}
                <li className="nav-item dropdown">
                
                
                </li>
                <li className="nav-item">
                  <div className={`alert ${status.id === 1 ? `alert-danger`: status.id === 2 ? `alert-warning`: status.id === 3 ? `alert-warning`: `alert-success`} mb-0`} style={{marginRight: "10rem", color: "white"}} role="alert">
                    {status.nama_status}
                  </div>
                </li>
                <li className="nav-item">
                <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                    <i className="fas fa-expand-arrows-alt" />
                </a>
                </li>
            </ul>
            </nav>
            {/* /.navbar */}

        </div>
    )
}

export default Header
