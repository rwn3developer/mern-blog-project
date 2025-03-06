import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [gender,setGender] = useState("");
    const [contact,setContact] = useState("");
    const [image,setImage] = useState("");
    const imageInputRef = useRef(null);
    const navigate = useNavigate()



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("city", city);
        formData.append("gender", gender);
        formData.append("contact", contact);
        formData.append("userimage", image);
  
        
        try {
            if (!name || !email || !password) {
                toast.error("All field is required");
                return false;
            }
            let res = await fetch(`http://localhost:8000/register`, {
                method: 'POST',
                body: formData
            })
            let user = await res.json();
            if (user?.success) {
                toast.success(user?.message);
                navigate('/admin/user');
                //after submit button press , clear the form fields with image fields
                setName("")
                setEmail("")
                setPassword("")
                setCity("")
                setGender("");
                setContact("");
                imageInputRef.current.value = ""
            } else {
                toast.error(user?.error)
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }


    
    return (
        <>
            <Header />
            <div className='container mt-5'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Register User</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder='Enter your name' />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder='Enter your email' />
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
                                            <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Contact</label>
                                                    <input type="text" onChange={(e) => setContact(e.target.value)} value={contact} className="form-control" placeholder='Enter your contact' />
                                            </div>
                                            <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                                                    <input type="file" ref={imageInputRef} onChange={(e) => setImage(e.target.files[0])} className="form-control"/>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </form>
                                

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer
                autoClose={1000}
            />
        </>
    )
}

export default Register