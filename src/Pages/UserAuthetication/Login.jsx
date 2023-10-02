import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { login } from '../../services/User APIs/authenticationApi';
import { UserCredentialsContext } from '../../context-API/UserCredentialsContext';


export const Login = () => {

    // Check if there's a success message in the location state
    if (location.state && location.state.successMessage) {
        toast.success(location.state.successMessage);
    }

    const navigate = useNavigate()

    const {userCredential, setCredential } = useContext(UserCredentialsContext)



    const handleLoginApi = async (values) => {
        const result = await login(values)

        if (result.status === 200) {
            const userCredentials = {
                email: result?.data?.email,
                token: result?.data?.token
            };
        
            localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
            
            setCredential(userCredentials);
            formik.resetForm()
            toast.success("Successfully logged In")
            navigate("/")
        } else {
            toast.error(result.data.msg);
        }
    }


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().
                matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Enter valid email Address").
                required('Email is Required*'),
            password: Yup.string().
                min(8, "password must be atleast 8 characters long").
                matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/, "Must contain atleast one Capital letter, small letter, number, special character").
                required("Password is required"),
        }),
        onSubmit: values => {
            handleLoginApi(values)
        },
    });

    return (
        <>
            <section className="" style={{ backgroundColor: "#9A616D" }}>
                <Toaster />
                <div className="container ">
                    <div className="row d-flex justify-content-center align-items-center ">
                        <div className="col col-xl-10 py-3">
                            <div className="card" style={{ borderRadius: " 1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            <form onSubmit={formik.handleSubmit}>

                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                                    <span className="h1 fw-bold mb-0">Logo</span>
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>

                                                {/* Email Address */}

                                                <div className="form-outline mb-4">
                                                    <input type="email" id="loginEmail" className="form-control form-control-lg" {...formik.getFieldProps('email')} />
                                                    <label className="form-label" htmlFor="loginEmail">Email address</label>
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <div className='text-danger'>{formik.errors.email}</div>
                                                    ) : null}
                                                </div>

                                                {/* Password */}

                                                <div className="form-outline mb-4">
                                                    <input type="password" id="LoginPassword" className="form-control form-control-lg" {...formik.getFieldProps('password')} />
                                                    <label className="form-label" htmlFor="LoginPassword">Password</label>
                                                    {formik.touched.password && formik.errors.password ? (
                                                        <div className='text-danger'>{formik.errors.password}</div>
                                                    ) : null}
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                                                </div>

                                                <Link className="small text-muted" to={"/forgotPassword"}>Forgot password?</Link>
                                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account? <Link to={"/signup"}
                                                    style={{ color: "#393f81" }}>Register here</Link></p>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
