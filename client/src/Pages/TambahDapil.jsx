import React from "react";
import ListDapil from "../components/TableDapil";
import FormDapil from "../components/FormDapil";
import { NavLink } from "react-router-dom";

const TambahDapil = () => {

  return (
    <React.Fragment>
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1 className="m-0">Daftar Daerah Pemilihan</h1>
                    </div>{/* /.col */}
                    <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><NavLink to="/dapil">Master Data</NavLink></li>
                        <li className="breadcrumb-item active">Dapil</li>
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
                            <div className="card-header">
                            <div>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Daftar Dapil</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="documents-tab" data-toggle="tab" href="#documents" role="tab" aria-controls="documents" aria-selected="false">Tambah Dapil</a>
                                    </li>
                                </ul>
                            </div>

                            </div>
                            <div className="card-body">
                            <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                      <ListDapil />
                                    </div>
                                    <div className="tab-pane fade" id="documents" role="tabpanel" aria-labelledby="documents-tab">
                                      <FormDapil />
                                    </div>
                                </div>

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

export default TambahDapil