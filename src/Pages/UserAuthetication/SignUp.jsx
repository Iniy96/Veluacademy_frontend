import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registration } from '../../services/User APIs/authenticationApi';
import toast, { Toaster } from 'react-hot-toast';

export const SignUp = () => {

    const navigate = useNavigate()

    const handleRegistrationapi = async (values) => {
        const result = await registration(values)

        if (result.status === 200) {    
            formik.resetForm()
            navigate("/login", { state: { successMessage: 'Successfully Registered! Please Login.' } });
        } else {
            toast.error(result.data.msg);
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(15, 'Must be 20 characters or less'),
            email: Yup.string().
                matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Enter valid email Address").
                required('Email is Required*'),
            phoneNumber: Yup.string().
                length(10, "Enter 10-digit Mobile number"),
            password: Yup.string().
                min(8, "password must be atleast 8 characters long").
                matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/, "Must contain atleast one Capital letter, small letter, number, special character").
                required("Password is required"),
            confirmPassword: Yup.string().
                oneOf([Yup.ref('password'), null], 'Passwords must match').
                required('Confirm Password is required'),
        }),
        onSubmit: values => {
            handleRegistrationapi(values)
        },
    });

    return (
        <>
            <div className='w-100 py-3' style={{ backgroundColor: "#9A616D" }}>
                <Toaster />
                <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 px-5 py-3 mx-auto bg-white rounded" >
                    <form className="form-horizontal " onSubmit={formik.handleSubmit}>
                        <h2 className='text-center '>Registration</h2>
                        {/* First name Latsname */}
                        <div className='d-flex flex-column flex-md-row gap-lg-3'>
                            <div className="form-group py-1 w-100 ">
                                <label htmlFor="firstName" className="col control-label">First Name*</label>
                                <div className="col">
                                    <input type="text" id="firstName" placeholder="First Name" className="form-control w-100" autoFocus
                                        {...formik.getFieldProps('firstName')} />
                                </div>
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <div className='text-danger'>{formik.errors.firstName}</div>
                                ) : null}
                            </div>
                            <div className="form-group py-1 w-100">
                                <label htmlFor="lastName" className="col control-label">Last Name</label>
                                <div className="col">
                                    <input type="text" id="lastName" placeholder="Last Name" className="form-control w-100" autoFocus
                                        {...formik.getFieldProps('lastName')} />
                                </div>
                            </div>
                        </div>
                        {/* Email Password */}
                        <div className='d-flex flex-column flex-md-row gap-lg-3'>
                            <div className="form-group py-1 w-100 ">
                                <label htmlFor="email" className="col control-label">Email* </label>
                                <div className="col">
                                    <input type="email" id="email" placeholder="Email" className="form-control" name="email" {...formik.getFieldProps('email')} />
                                </div>
                                {formik.touched.email && formik.errors.email ? (
                                    <div className='text-danger'>{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="form-group py-1 w-100">
                                <label htmlFor="phoneNumber" className="col control-label">Phone number </label>
                                <div className="col">
                                    <input type="phoneNumber" id="phoneNumber" placeholder="Phone number" className="form-control" />
                                </div>
                            </div>
                        </div>
                        {/* Password Confirm Password */}
                        <div className='d-flex flex-column flex-md-row gap-lg-3'>
                            <div className="form-group py-1 w-100 ">
                                <label htmlFor="password" className="col control-label">Password*</label>
                                <div className="col">
                                    <input type="password" id="password" placeholder="Password" className="form-control"
                                        {...formik.getFieldProps('password')} />
                                </div>
                                {formik.touched.password && formik.errors.password ? (
                                    <div className='text-danger'>{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <div className="form-group py-1 w-100">
                                <label htmlFor="confirmPassword" className="col control-label">Confirm Password*</label>
                                <div className="col">
                                    <input type="password" id="confirmPassword" placeholder="confirmPassword" className="form-control"
                                        {...formik.getFieldProps('confirmPassword')} />
                                </div>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className='text-danger'>{formik.errors.confirmPassword}</div>
                                ) : null}
                            </div>
                        </div>
                        {/* DOB & Gender */}
                        {/* <div className='d-flex flex-column flex-md-row gap-lg-3'>
                            <div className="form-group py-1 w-100 ">
                                <label htmlFor="birthDate" className="col control-label">Date of Birth*</label>
                                <div className="col">
                                    <input type="date" id="birthDate" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group py-1 w-100">
                                <label className="control-label col">Gender*</label>
                                <div className="col">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <input type="radio" id="femaleRadio" name='gender' value="Female" />
                                            <label className="radio-inline ps-1" htmlhtmlFor='femaleRadio'>
                                                Female
                                            </label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="radio" id="maleRadio" name='gender' value="Male" />
                                            <label className="radio-inline ps-1" htmlhtmlFor='maleRadio'>
                                                Male
                                            </label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="radio" id="othersRadio" name='gender' value="Others" />
                                            <label className="radio-inline ps-1" htmlhtmlFor='othersRadio'>
                                                Others
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* Address*/}
                        {/* <div className='d-flex '>
                            <div className="form-group py-1 w-100 ">
                                <label htmlFor="address" className="col control-label">Address</label>
                                <div className="col">
                                    <input type="text" id="address" placeholder="Address" className="form-control" />
                                </div>
                            </div>

                        </div> */}
                        {/* District and pincode */}
                        {/* <div className='d-flex flex-column flex-md-row gap-lg-3'>
                            <div className="form-group py-1 w-100 ">
                                <label htmlFor="district" className="col control-label">District</label>
                                <div className="col">
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Select your District</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group py-1 w-100">
                                <label htmlFor="pincode" className="col control-label">Pincode*</label>
                                <div className="col">
                                    <input type="number" id="pincode" placeholder="Pincode" className="form-control" />
                                </div>
                            </div>
                        </div> */}


                        <div className="form-group pt-3 text-center">
                            <button type="submit" className="btn btn-primary w-50 ">Register</button>
                        </div>
                        <div>
                            <p className='text-center'>Already Have an account <Link to={"/login"}>Login Here</Link> </p>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}
