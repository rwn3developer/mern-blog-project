import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import Adminsidebar from '../../components/Adminsidebar';
import Usersdetails from '../../components/Usersdetails';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Adminedituser = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const location = useLocation();
    

    // State variables to hold form data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState(null);
     // Ref to access the file input
     const imageInputRef = useRef(null);
     
    useEffect(() => {
        if (location?.state) {
            const { name, email, password, gender, city, contact, role, status, image } = location.state;
            setName(name);
            setEmail(email);
            setPassword(password);
            setGender(gender);
            setCity(city);
            setContact(contact);
            setRole(role);
            setStatus(status);
        }
    }, [location?.state]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const formdata = new FormData();
            formdata.append('userid', location?.state?._id);
            formdata.append('name', name);
            formdata.append('email', email);
            formdata.append('password', password);
            formdata.append('gender', gender);
            formdata.append('city', city);
            formdata.append('contact', contact);
            formdata.append('role', role);
            formdata.append('status', status);
            formdata.append('userimage', image);
            let res = await fetch(`http://localhost:8000/admin/updateuser`,{
                method: 'PUT',
                headers:{
                    'Authorization': `Bearer ${auth.token?.token}`
                },
                body: formdata  //not required json stringyfy because data with file upload
            })
            let data = await res.json();
            console.log(data);
            
            if(data.success){
                toast.success("User update successfully");
                setTimeout(()=>{
                    navigate('/admin/user')
                })
            }
            //after submission all field is null
            setName("");
            setEmail("");
            setPassword("");
            setGender("");
            setCity("");
            setContact("");
            setRole("");
            setStatus("");
            setImage("");
            if (imageInputRef.current) {
                imageInputRef.current.value = null; // Clear the file input field
            }
        }catch(err){
            console.log(err);
            return false
        }
    };

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
                                Admin Edit User
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>

                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* Name Field */}
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                    id="name"
                                                    placeholder="Enter your name"
                                                />
                                            </div>

                                            {/* Email Field */}
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                    id="email"
                                                    placeholder="Enter your email"
                                                />
                                            </div>

                                            {/* Password Field */}
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    value={password}
                                                    id="password"
                                                    placeholder="Enter your password"
                                                />
                                            </div>

                                            {/* Gender Field */}
                                            <div className="mb-3">
                                                <label htmlFor="gender" className="form-label">Gender</label>
                                                <select
                                                    className="form-control"
                                                    id="gender"
                                                    onChange={(e) => setGender(e.target.value)}
                                                    value={gender}
                                                >
                                                    <option value="">Select your gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                    
                                                </select>
                                            </div>

                                            {/* City Field */}
                                            <div className="mb-3">
                                                <label htmlFor="city" className="form-label">City</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    onChange={(e) => setCity(e.target.value)}
                                                    value={city}
                                                    id="city"
                                                    placeholder="Enter your city"
                                                />
                                            </div>

                                            {/* Contact Field */}
                                            <div className="mb-3">
                                                <label htmlFor="contact" className="form-label">Contact</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    onChange={(e) => setContact(e.target.value)}
                                                    value={contact}
                                                    id="contact"
                                                    placeholder="Enter your contact number"
                                                />
                                            </div>

                                        </div>

                                        <div className="col-md-6">
                                            {/* Role Field */}
                                            <div className="mb-3">
                                                <label htmlFor="role" className="form-label">Role</label>
                                                <select
                                                    className="form-control"
                                                    id="role"
                                                    onChange={(e) => setRole(e.target.value)}
                                                    value={role}
                                                >
                                                    <option value="">Select your role</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="manager">Manager</option>
                                                    <option value="user">User</option>
                                                </select>
                                            </div>

                                            {/* Image Field */}
                                            <div className="mb-3">
                                                <label htmlFor="image" className="form-label">Profile Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="image"
                                                    ref={imageInputRef}
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                />
                                                {image && (
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt="Preview"
                                                        style={{ maxWidth: '150px', marginTop: '10px' }}
                                                    />
                                                )}
                                            </div>

                                            {/* Status Field */}
                                            <div className="mb-3">
                                                <label htmlFor="status" className="form-label">Status</label>
                                                <select
                                                    className="form-control"
                                                    id="status"
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    value={status}
                                                >
                                                    <option value="">Select your status</option>
                                                    <option value="active">Active</option>
                                                    <option value="deactive">Deactive</option>
                                                </select>
                                            </div>

                                            <button type="submit" className="btn btn-primary">Submit</button>

                                        </div>
                                    </div>

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
};

export default Adminedituser;
