import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { generateResetLink, resetPassword } from '../../services/User APIs/authenticationApi';


export const ResetPassword = () => {

    const navigate = useNavigate()
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    const [isLoading, setisLoading] = useState(false)

    const handleChnagePassword = async (values) => {
        const data = {
            ...values,
            email,
            token,
        };

        setisLoading(true)
        const result = await resetPassword(data)
        setisLoading(false)
        console.log(result);

        // if (result.status === 200) {
        //     toast.success("You will receive an email.")
        //     navigate("/login")
        // } else if (result.status === 202) {
        //     toast.error("Email is not Registered.")
        // } else {
        //     toast.error("something went wrong.")
        // }
    }

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: Yup.object({
            newPassword: Yup.string().
                min(8, "password must be atleast 8 characters long").
                matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/, "Must contain atleast one Capital letter, small letter, number, special character").
                required("Password is required"),
            confirmNewPassword: Yup.string().
                oneOf([Yup.ref('newPassword'), null], 'Passwords must match').
                required('Confirm Password is required'),
        }),
        onSubmit: async (values) => {
            await handleChnagePassword(values)
        },
    });



    return (
        <>
            <section className="" style={{ backgroundColor: "#9A616D" }}>
                <div className="container ">
                    <div className="row d-flex justify-content-center align-items-center py-3">
                        <form onSubmit={formik.handleSubmit} className="col col-md-8 col-lg-5 bg-white rounded p-4 ">
                            <h4 className='text-center'>Reset Your Password</h4>
                            <div className="mb-3">
                                <label htmlFor="NewPassword" className="form-label">New Password</label>
                                <input type="password" className="form-control" id="NewPassword" placeholder="******" {...formik.getFieldProps('newPassword')} />
                                {formik.touched.newPassword && formik.errors.newPassword ? (
                                    <div className='text-danger'>{formik.errors.newPassword}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ConfirmNewPassword" className="form-label"  >Confirm New Password</label>
                                <input type="password" className="form-control" id="ConfirmNewPassword" placeholder="*******" {...formik.getFieldProps('confirmNewPassword')} />
                                {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
                                    <div className='text-danger'>{formik.errors.confirmNewPassword}</div>
                                ) : null}
                            </div>

                            {
                                isLoading ? (
                                    <div className="spinner-border text-secondary mt-3" role="status" >
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    <div className='pt-2 text-center'>
                                        <button className='btn btn-dark w-50' type='submit'>Submit</button>
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
