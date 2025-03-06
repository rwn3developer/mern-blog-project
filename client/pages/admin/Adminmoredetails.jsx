import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Adminsidebar from '../../components/Adminsidebar';
import Admindetails from '../../components/Usersdetails';
import { useLocation } from 'react-router-dom';

const Adminmoredetails = () => {

    const location = useLocation();

    const formatDateTime = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = String(d.getFullYear()).slice(-2); // Last two digits of the year

        let hours = d.getHours();
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12; // Convert 24-hour time to 12-hour format
        hours = hours ? String(hours).padStart(2, '0') : '12'; // Hour 0 should be 12 for AM

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
      };
    


    return (
        <>
            <Header />
            <div className="container mt-5">


                <div className="row mt-5">
                    {/* Sidebar Column */}
                    <div className="col-sm-12 col-md-3 col-lg-3">
                        <Adminsidebar />
                    </div>

                    <div className='col-md-9'>
                        <div className="card">
                            <div className="card-header">
                                More Details
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="card-title">Name :- {location?.state?.name}</h6>
                                        <hr />
                                        <h6 className="card-title">Email :- {location?.state?.email}</h6>
                                        <hr />
                                        <h6 className="card-title">Password :- {location?.state?.password}</h6>
                                        <hr />
                                        <h6 className="card-title">Gender :- {location?.state?.gender}</h6>
                                        <hr />
                                        <h6 className="card-title">City :- {location?.state?.city}</h6>
                                        <hr />
                                        <h6 className="card-title">Contact :- {location?.state?.contact}</h6>
                                        <hr />
                                        <h6 className="card-title">Role :- {location?.state?.role}</h6>
                                        <hr />
                                    </div>
                                    <div className="col-md-6">

                                        <h6 className="card-title">Image :- </h6>
                                        <hr />
                                        <img width="100" src={location?.state?.image} class="img-thumbnail" alt="..."></img>
                                        <hr/>

                                        
                                        <h6 className="card-title">Status</h6>&nbsp;
                                        {
                                            location?.state?.status == "active" ? (
                                                <button className='btn btn-success btn-sm'>Active</button>
                                            ):(
                                                <button className='btn btn-danger btn-sm'>Deactive</button>
                                            )
                                        }
                                        
                                   
                                        <hr />
                                        
                                        <h6 className="card-title">Create At :- {formatDateTime(location?.state?.createdAt)}</h6>
                                        <hr />
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Adminmoredetails;
