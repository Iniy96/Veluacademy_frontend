import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { generateResetLink } from '../../services/User APIs/authenticationApi';

export const ForgotPassword = () => {

    const [spinnerDisplay, setspinnerDisplay] = useState(false)

    const navigate = useNavigate()

    const handleGenerateResetLink = async (values) => {

        setspinnerDisplay(true)
        const result = await generateResetLink(values)

        setspinnerDisplay(false)

        if (result.status === 200) {
            toast.success("You will receive an email.")
            navigate("/login")
        } else if (result.status === 202) {
            toast.error("Email is not Registered.")
        } else {
            toast.error("something went wrong.")
        }



    }

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().
                matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Enter valid email Address").
                required('Email is Required*'),
        }),
        onSubmit: values => {
            handleGenerateResetLink(values)
        },
    });


    return (
        <>
            <Toaster />
            <section className="" style={{ backgroundColor: "#9A616D" }}>
                <div className="container ">
                    <div className="row d-flex justify-content-center align-items-center p-3">
                        <form onSubmit={formik.handleSubmit} className="col col-md-10 col-lg-6 bg-white rounded p-4 text-center">
                            <h4>Forgot Password?</h4>
                            <p className='col-10 py-2 mx-auto'>Enter your email address and we'll send you an email with instructions to reset your password.</p>
                            <div className='col col-md-10 col-lg-8 mx-auto'>
                                <input type="email" className="form-control" placeholder="name@example.com" {...formik.getFieldProps('email')}></input>
                                {formik.touched.email && formik.errors.email ? (
                                    <div className='text-danger'>{formik.errors.email}</div>
                                ) : null}
                            </div>
                            {
                                !spinnerDisplay ? (
                                    <div className='pt-4 d-flex gap-3 justify-content-center'>
                                        <button className='btn btn-primary' type='submit'>Submit</button>
                                        <Link to={"/login"} className='btn btn-dark'>Cancel</Link>
                                    </div>
                                ) : (
                                    <div className="spinner-border text-secondary mt-3" role="status" >
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    
                                )

                            }


                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
