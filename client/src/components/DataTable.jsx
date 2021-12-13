import React, { useEffect, useState } from "react";
import DataTable, { memoize } from 'react-data-table-component';
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserVerified } from "../store/action";

var idLocale = require('moment/locale/id'); 
moment.locale('id', idLocale);


const columns = [
    {
        name: 'FOTO',
        width: '12rem',
        cell: (data) => <React.Fragment>
        {data.foto_profil ?
            <img className='mx-1' src={data.foto_profil} width="50" height="50" alt="" />
        : 
            <img className='mx-1' src={'avatar.jpg'} width="50" height="50" alt="Foto" />
        }
        </React.Fragment> ,
        ignoreRowClick: false,
        allowOverflow: true,
        button: true,
    },
    {
        name: 'TANGGAL DAFTAR',
        selector: row => `${moment(row.createdAt).format("dddd")}, ${moment(row.createdAt).format("DD/MM/YYYY")}`,
        sortable: true,
    },
    {
        name: 'DAPIL',
        selector: row => row.Dapil.nama_dapil,
        sortable: true,
    },
    {
        name: 'NAMA CALON',
        selector: row => row.nama,
        sortable: true,
    },
    {
      name: 'ASAL PARTAI',
      width: '20rem',
      selector: row => row.Partai.nama_partai,
      sortable: true,
    },
    {
        name: 'STATUS',
        selector: row => row.StatusCaleg.nama_status,
        sortable: true,
    }
];


const TableCaleg = () => {
    const [tableData, setTableData] = useState([])

    const { verified, loading } = useSelector(state => state.user)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserVerified())
    }, [])

    useEffect(() => {
       setTableData(verified)
    }, [verified])

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
            setTableData(verified)
        } else {
            setTableData(filteredItems(verified, event))
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
            {/* {
              verified ? */}
              <DataTable
                  columns={columns}
                  data={tableData}
                  pagination
                  highlightOnHover
                  persistTableHead={true}
                  dense={true}
              /> 
               {/* :
               <div>
                 <p>No Data</p>
               </div>
             } */}
        </React.Fragment>
    );
};

export default TableCaleg