import React from "react";
import TableBalon from "../components/DataTableBalon";
import { NavLink } from "react-router-dom";

const DaftarBacaleg = () => {

  return (
    <React.Fragment>
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1 className="m-0">Bakal Calon Anggota Legislatif</h1>
                    </div>{/* /.col */}
                    <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><NavLink to="/dashboard">Calon</NavLink></li>
                        <li className="breadcrumb-item active">Balon</li>
                    </ol>
                    </div>
                </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <TableBalon />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    </React.Fragment>
  )
}

export default DaftarBacaleg