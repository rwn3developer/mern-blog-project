import React, { useEffect, useState } from 'react';
import Header from './Header';
import Adminsidebar from './Adminsidebar';
import Usersdetails from './Usersdetails';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';





const Changepassword = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");



    const handleSubmit = (e) => {
        e.preventDefault();

        let oldpass = auth?.token?.user?.password;

        if (oldpass == oldpassword) {

        } else {

        }




    }





    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="row mt-5">
                    {/* Sidebar Column */}
                    <div className="col-md-3">
                        <Adminsidebar />
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Change Password
                            </div>
                            <div className="card-body">

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Oldpassword</label>
                                        <input type="password" onChange={(e) => setOldPassword(e.target.value)} value={oldpassword} className="form-control" placeholder='Enter your old password' />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" onChange={(e) => setNewPassword(e.target.value)} value={newpassword} className="form-control" placeholder='Enter your new password' />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>


                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <Usersdetails />
                    </div>

                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Changepassword;
