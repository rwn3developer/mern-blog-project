import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';

const Usersdetails = () => {
    const [auth, setAuth] = useAuth();
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [city, setCity] = useState("");
        const [gender,setGender] = useState("");
        const [contact,setContact] = useState("");
        const [image,setImage] = useState("");

        useEffect(()=>{
            setName(auth?.token?.user?.name)
            setEmail(auth?.token?.user?.email)
            setPassword(auth?.token?.user?.password) 
            setGender(auth?.token?.user?.gender)
            setCity(auth?.token?.user?.city)
            setContact(auth?.token?.user?.contact) 

        },[auth?.token]) 

    const changeProfile = async () => {
        try {
            console.log(name);
            console.log(email);
            console.log(password);
            console.log(gender);
            console.log(city);
            console.log(contact);
            console.log(image);
        
            
            const formData = new FormData();
            formData.append('userid',auth?.token?.user?._id);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('city', city);
            formData.append('gender', gender);
            formData.append('contact', contact);
            formData.append('userimage', image);
            const response = await fetch('http://localhost:8000/userprofile', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);
            
            if(data.success){
                toast.success("Profile successfully updated");
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <div className="card">
            <div className="card-header">Admin Dashboard</div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <h6 className="card-title">Name :- {auth?.token?.user?.name}</h6>
                        <h6 className="card-title">Email :- {auth?.token?.user?.email}</h6>
                        <h6 className="card-title">Password :- {auth?.token?.user?.password}</h6>
                        <h6 className="card-title">Gender :- {auth?.token?.user?.gender}</h6>
                        <h6 className="card-title">City :- {auth?.token?.user?.city}</h6>
                        <h6 className="card-title">Contact :- {auth?.token?.user?.contact}</h6>
                        <h6 className="card-title">Role :- {auth?.token?.user?.role}</h6>
                        <img width="200" src={auth?.token?.user?.image} class="img-thumbnail" alt="..." />
                        <br></br><br></br>
                        <button  className='btn btn-success' data-bs-toggle="modal" data-bs-target="#changeProfile">Change Profile</button>
                    </div>
                </div>
            </div>

          
            <div className="modal fade" id="changeProfile" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Change Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                        <div className="row">
                                        <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder='Enter your name' />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                                    <input type="text" disabled onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder='Enter your email' />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" placeholder='Enter your password' />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputPassword1" className="form-label">City</label>
                                                    <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" placeholder='Enter your city' />
                                                </div>
                                               
                                            
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Gender</label>
                                                    <br/>
                                                    Male :- <input 
                                                        type="radio" 
                                                        name="gender" 
                                                        value={gender} 
                                                        checked={auth?.token?.user?.gender === 'male'} 
                                                        onChange={(e) => setGender(e.target.value)} 
                                                        />
                                                    &nbsp;
                                                    Female :- <input 
                                                        type="radio" 
                                                        name="gender" 
                                                        value={gender} 
                                                        checked={auth?.token?.user?.gender === 'female'} 
                                                        onChange={(e) => setGender(e.target.value)} 
                                                        />
                                            </div>
                                            <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Contact</label>
                                                    <input type="text" onChange={(e) => setContact(e.target.value)} value={contact} className="form-control" placeholder='Enter your contact' />
                                            </div>
                                            <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                                                    <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control"/>

                                                    <img src={auth?.token?.user?.image} width="100" alt="" />
                                            </div>
                                        </div>
                                    </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={() => changeProfile()} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Usersdetails
