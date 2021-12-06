import React, { useEffect, useState } from "react";
import DataTable, { memoize } from 'react-data-table-component';
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCaleg } from "../store/action";

var idLocale = require('moment/locale/id'); 
moment.locale('id', idLocale);


const columns = [
    {
        name: 'Foto',
        selector: row => row.nama
    },
    {
        name: 'Tanggal Daftar',
        selector: row => `${moment(row.createdAt).format("dddd")}, ${moment(row.createdAt).format("DD/MM/YYYY")}`,
        sortable: true,
    },
    {
        name: 'NIK',
        selector: row => row.NIK,
        sortable: true,
    },
    {
        name: 'Nama Calon',
        selector: row => row.nama,
        sortable: true,
    },
    {
      name: 'Asal Partai',
      selector: row => row.Partai.nama_partai,
      sortable: true,
    },
    {
        name: 'Status',
        selector: row => row.StatusCaleg.nama_status,
        sortable: true,
    },
    {
        cell: (data) => <button className='btn btn-sm btn-info'><i className='fas fa-info mr-1'></i><Link to="/detail" state={{data: data}} ProfilCalon style={{color: '#fff'}} className="link-success">Detail</Link></button> ,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }
];


const TableBalon = () => {
    const [tableData, setTableData] = useState([])

    const { calegs, loading } = useSelector(state => state.caleg)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCaleg(1))
    }, [])

    useEffect(() => {
       setTableData(calegs)
    }, [calegs])

    useEffect(() => {

},[tableData])

console.log(tableData);

    function filteredItems(data, filterText) {
        return data.filter((item) => {
            return  item.title && item.title.toLowerCase().includes(filterText.toLowerCase()) || item.partai && item.partai.toLowerCase().includes(filterText.toLowerCase())
        })
    }
    function filter(event) {
        if (event === '') {
            setTableData(calegs)
        } else {
            setTableData(filteredItems(calegs, event))
        }
    }
    

    return (
        <React.Fragment>
            <div className="col-md-4">
                <div className="input-group ">
                    <input type="text" className="form-control" placeholder='Cari Data' onChange={(e) => filter(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" ><i className="fas fa-search" ></i></span>
                    </div>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={tableData}
                pagination
                highlightOnHover
            />
        </React.Fragment>
    );
};

export default TableBalon