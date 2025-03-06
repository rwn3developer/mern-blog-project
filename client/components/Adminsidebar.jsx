import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GrUserManager } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaBlogger } from "react-icons/fa";
import { MdPassword } from "react-icons/md";


const Adminsidebar = () => {
    const location = useLocation();


    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12">
                    <div className="list-group">
                        <Link to={`/admin/dashboard`} className={`list-group-item list-group-item-action ${location?.pathname === '/admin/dashboard' ? 'active' : ''}`} aria-current="true">
                            <MdDashboard />&nbsp;Dashboard
                        </Link>
                        <Link to={`/admin/user`} className={`list-group-item list-group-item-action ${location?.pathname === '/admin/user' ? 'active' : ''}`} aria-current="true">
                            <FaUser />&nbsp;User
                        </Link>
                        <Link className="list-group-item list-group-item-action" aria-current="true">
                            <GrUserManager />&nbsp;Manager
                        </Link>
                        <Link className="list-group-item list-group-item-action" aria-current="true">
                            <FaBlogger />&nbsp;Blog
                        </Link>
                        <Link to={`/user/changepassword`} className={`list-group-item list-group-item-action ${location?.pathname === '/user/changepassword' ? 'active' : ''}`}>
                            <MdPassword /> Change Password
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Adminsidebar
