import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { json, useNavigate } from 'react-router-dom';
import { adminLogin } from "../../services/Admin APIs/adminAuthAPI"
import { UserCredentialsContext } from '../../context-API/UserCredentialsContext';
import toast, { Toaster } from 'react-hot-toast';


export const AdminLogin = () => {

  const navigate = useNavigate()
  const {setisAdminLoggedIn} = useContext(UserCredentialsContext)

  const [isLoading, setisLoading] = useState(false)

  const handleAdminLoginApi = async (values) => {
    setisLoading(true)
    const result = await adminLogin(values)
    setisLoading(false)

    if (result.status === 200) {
      const adminCredentials = {
        email: result?.data?.adminEmail,
        token: result?.data?.token
      };
      setisAdminLoggedIn(adminCredentials.email)
      localStorage.setItem('AdminCredentials', JSON.stringify(adminCredentials));
      formik.resetForm()
      navigate("/admin")
    } else {
      toast.error(result.data.msg);
    }
  }

  const formik = useFormik({
    initialValues: {
      adminEmail: '',
      adminPassword: ''
    },
    validationSchema: Yup.object({
      adminEmail: Yup.string().
        matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Enter valid email Address").
        required('Email is Required*'),
      adminPassword: Yup.string().
        min(8, "password must be atleast 8 characters long").
        matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/, "Must contain atleast one Capital letter, small letter, number, special character").
        required("Password is required"),
    }),
    onSubmit: values => {
      handleAdminLoginApi(values)
    },
  });

  return (
    <>
      <div className='mx-auto pt-5' style={{ maxWidth: "30rem" }}>
        <form onSubmit={formik.handleSubmit} className='border rounded p-4' style={{ boxShadow: "-1px 2px 10px 1px rgba(133,128,128,0.44)" }}>
          <h4 className='text-primary'>Login</h4>
          <input
            type="email"
            className="form-control mt-3"
            placeholder="name@example.com"
            {...formik.getFieldProps('adminEmail')}></input>
          {formik.errors.adminEmail && formik.touched.adminEmail ? <p className='m-0 form-text text-danger'>{formik.errors.adminEmail}</p> : ""}

          <input type="text" className="form-control mt-3" placeholder="*********"
            {...formik.getFieldProps('adminPassword')}></input>
          {formik.errors.adminPassword && formik.touched.adminPassword ? <p className='m-0 form-text text-danger'>{formik.errors.adminPassword}</p> : ""}

          <button className='btn btn-success rounded-pill w-100 my-3' type='submit'>Login</button>

          {
            isLoading &&
            (
              <div className='text-center pt-2'>
                <div className="spinner-border text-success" role="status"></div>
              </div>
            )
          }
        </form>
      </div>
    </>
  )
}/*  */
