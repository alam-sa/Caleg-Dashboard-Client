import React, { useEffect, useState } from "react";
import DataTable, { memoize } from 'react-data-table-component';
import { Link, useLocation } from "react-router-dom";

const columns = [
    {
        name: 'Foto',
        selector: row => row.year
    },
    {
        name: 'Tanggal Daftar',
        selector: row => row.year,
        sortable: true,
    },
    {
        name: 'NIK',
        selector: row => row.year,
        sortable: true,
    },
    {
        name: 'Nama Calon',
        selector: row => row.title,
        sortable: true,
    },
    {
      name: 'Asal Partai',
      selector: row => row.partai,
      sortable: true,
    },
    {
        name: 'Validasi',
        selector: row => row.year,
        sortable: true,
    },
    {
        cell: (data) => <button className='btn btn-sm btn-info'><i className='fas fa-info mr-1'></i><Link to="/detail" state={{data: data}} style={{color: '#fff'}} className="link-success">Detail</Link></button> ,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
    {
        cell: (data) => <button className='btn btn-sm btn-success'><i className='fas fa-edit mr-1'></i><Link to={{pathname: `/verifikasi/${data.id}`, state: data}} style={{color: '#fff'}} className="link-success">Verifikasi</Link></button> ,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        partai: 'PDI Perjuangan',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        partai: 'Gerindra',
        year: '1984',
    },
]

const Table = () => {
    const [fetchData, setFetchData] = useState(data)
    const [tableData, setTableData] = useState([])

    const location = useLocation()


useEffect(() => {
    setTableData(fetchData)
}, [])

useEffect(() => {

},[tableData])

    function filteredItems(data, filterText) {
        return data.filter((item) => {
            return  item.title && item.title.toLowerCase().includes(filterText.toLowerCase()) || item.partai && item.partai.toLowerCase().includes(filterText.toLowerCase())
        })
    }
    function filter(event) {
        if (event === '') {
            setTableData(fetchData)
        } else {
            setTableData(filteredItems(fetchData, event))
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

export default Table