import React, { useEffect, useState } from "react";
import DataTable, { memoize } from 'react-data-table-component';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { deleteUser, getUsers, updateActiveUser } from "../store/action";

const Table = () => {
  const {users, loading } = useSelector(state => state.user)
  const [fetchData, setFetchData] = useState([])
  const [tableData, setTableData] = useState([])

  const dispatch = useDispatch()


useEffect(() => {
    dispatch(getUsers())
    setFetchData(users)
    setTableData(users)
}, [])


useEffect(() => {
  setTableData(users)
  setFetchData(users)
},[users])

useEffect(() => {
  setTableData(fetchData)
},[fetchData])

const columns = [
  {
      name: 'Email',
      selector: row => row.email
  },
  
  {
      name: 'Jenis Akun',
      selector: row => row.UserLevel.user_level,
      sortable: true,
  },
  {
    name: 'Status',
    selector: row => row.is_active ? 'Aktif' : "Non Aktif",
    sortable: true,
  },
  {
    name: 'Status',
    cell: (data) =>  <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" checked={data.is_active} id={data.id} onChange={(e) => dispatch(updateActiveUser(data.id, !data.is_active))} />
                      <label className="custom-control-label" htmlFor={data.id}></label>
                    </div> ,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
  {
    cell: (data) => <button className='btn btn-sm btn-danger' onClick={(e) => dispatch(deleteUser(data.id))} ><i className='fas fa-trash mr-1'></i>delete</button> ,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

    function filteredItems(data, filterText) {
        return data.filter((item) => {
            return  item.email && item.email.toLowerCase().includes(filterText.toLowerCase()) || item.UserLevel.user_level && item.UserLevel.user_level.toLowerCase().includes(filterText.toLowerCase())
        })
    }
    function filter(event) {
        if (event === '') {
            setTableData(users)
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
            {
              loading ? <h1>Loading...</h1> :
              <DataTable
                  columns={columns}
                  data={tableData}
                  pagination
                  highlightOnHover
              />
            }
        </React.Fragment>
    );
};

export default Table