import React, { useContext } from 'react'
import { BsFillCartCheckFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link';
import { ShopContext } from '../context-API/ShopContext';
import { UserCredentialsContext } from '../context-API/UserCredentialsContext';

const Navbar = () => {

    const { totalProductCalc } = useContext(ShopContext)
    const {userCredential, setcredential } = useContext(UserCredentialsContext)

    const handleLogout =()=>{
        localStorage.removeItem('userCredentials');
        setcredential(null)
    }
    

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand px-3 rounded bg-white" to={"/"}>TNPSC Academy</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={"/"} >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/test"}>Test</Link>
                            </li>
                            <li className="nav-item">
                                <HashLink className="nav-link" to={"/#shop"}>Shop</HashLink>
                            </li>
                        </ul>
                        <div className="d-flex" >
                            <Link className='btn py-0 position-relative' to={"/cartPage"}>
                                <BsFillCartCheckFill size={25} />
                                <span className="position-absolute top-0 start-25 translate-middle badge rounded-pill bg-danger">
                                    {totalProductCalc()}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </Link>
                            {
                                !userCredential ? (
                                    <Link className='btn btn-primary' to={"/login"}>Login/Register</Link>
                                ) : (
                                    <Link className='btn btn-primary' to={"/"} onClick={handleLogout}>Logout</Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar