import React, { useContext } from 'react'
import { AdminLogin } from './AdminLogin'
import { UserCredentialsContext } from '../../context-API/UserCredentialsContext';
import { AdminFileHandle } from './AdminFileHandle';
import { Link } from 'react-router-dom';

export const AdminHome = () => {

  const { isAdminLoggedIn } = useContext(UserCredentialsContext)
  return (
    <>
      {
        !isAdminLoggedIn ? <AdminLogin /> : (
          <>
            <AdminFileHandle />
            <div className='mt-3 mx-auto col col-md-8 col-lg-6 border rounded p-3 d-flex justify-content-between gap-3'>
                <Link className='btn btn-success' to={"/admin/questiontable"}>Question Table</Link>
                <Link className='btn btn-warning'>Orders</Link>
            </div>
          </>
        )
      }

    </>
  )
}
