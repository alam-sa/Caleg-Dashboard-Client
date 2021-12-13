import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SideNav = () => {
  const {caleg} = useSelector((state) => state.caleg)

  function logout() {
        localStorage.clear();
  }
    return (
        <div>
           <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <NavLink className="brand-link" to='#'>
                <img src="logo1.png" alt="KPU Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                <span className="brand-text font-weight-light">KPU KAB GOWA</span>
            </NavLink>
            {/* Sidebar */}
            <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img src={caleg.foto_profil} className="img-circle elevation-2" alt="User Image" />
              </div>
              <div className="info">
                <NavLink to="#" className="d-block" style={{fontSize: "12px"}}>{caleg.nama}</NavLink>
              </div>
            </div>

                {/* Sidebar Menu */}
                <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {/* Add icons to the links using the .nav-icon class
                    with font-awesome or any other icon font library */}
                    <li className="nav-item menu-open">
                    <NavLink className="nav-link" to="/dashboard">
                        <i className="nav-icon fas fa-tachometer-alt" />
                        <p>
                        Dashboard
                        <i className="right" />
                        </p>
                    </NavLink>
                    </li>
                    {/* caleg */}
                    <li className="nav-item">
                    <a className="nav-link" to="/caleg">
                        <i className="nav-icon fas fa-users" />
                        <p>
                        Daftar Calon
                        <i className="fas fa-angle-left right" />
                        </p>
                    </a>
                    <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <div className="ml-3">
                                <NavLink className="nav-link" to="/bacaleg">
                                    <i className="fas fa-user-plus nav-icon" />
                                    <p> Bakal Calon</p>
                                </NavLink>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="ml-3">
                                <NavLink className="nav-link" to="/caleg">
                                    <i className="fas fa-user-tie nav-icon" />
                                    <p>Calon Legislatif</p>
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                    </li>
                    {/* .caleg */}

                    {/* verifikasi */}
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/data">
                          <i className="nav-icon fas fa-user-check" />
                          <p>
                          Pendaftaran
                          </p>
                      </NavLink>
                    </li>
                    {/* .verivikasi */}
                    <li className="nav-header">Pengaturan Akun</li>
                    <li className="nav-item">
                    <NavLink className="nav-link" onClick={(e) => logout(e)} to="/login">
                        <i className="nav-icon fas fa-sign-out-alt nav-icon" />
                        <p className="text">Log Out</p>
                    </NavLink>
                    </li>
                </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
            </aside>

        </div>
    )
}

export default SideNav
