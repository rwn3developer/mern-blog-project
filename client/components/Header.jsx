import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const logoutUser = () => {
        setAuth({
            ...auth,
            token: null
        })
        localStorage.removeItem('loginuser');
        setTimeout(() => {
            navigate('/');
        }, 3000)
    }

    return (
        <div className='bg-info'>
            <div className='container'>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link className="navbar-brand">Blog</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">


                                {
                                    auth?.token ? (
                                        <li className="nav-item">
                                            <button onClick={() => logoutUser()} className='btn btn-warning btn-sm'>Logout</button>
                                        </li>
                                    ) : (
                                        <>
                                            <li className="nav-item">
                                                <Link to={`/`} className="nav-link active" aria-current="page">Login</Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link to={`/register`} className="nav-link active" aria-current="page">Register</Link>
                                            </li>
                                        </>
                                    )
                                }


                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
            <ToastContainer/>
        </div>
    )
}

export default Header