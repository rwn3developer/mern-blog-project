import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();

    //without user logout not enter login page
    useEffect(()=>{
        const userRole = auth?.token?.user?.role;
        if(userRole === "admin"){
            navigate("/admin/dashboard");
        }else if(userRole === "manager"){
            navigate("/manager/dashboard");
        }else if(userRole === "user"){
            navigate("/user/dashboard");
        }
    },[auth?.token])
    //without user logout not enter login page
    
   
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            let res = await fetch(`http://localhost:8000/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    email: email,
                    password: password,
                })
            })
            let data = await res.json()
            
            
            if(data?.success && data?.user?.status === "active"){
                let login = {
                    token:data?.token,
                    user : data?.user
                }
                setAuth({
                    ...auth,
                    token:login
                })
                localStorage.setItem('loginuser',JSON.stringify(login))
                alert("Login Successfull");
                
                //role wise routing
                const userRole = data?.user?.role; 
                if(userRole === 'admin'){
                    setTimeout(()=>{
                        navigate('/admin/dashboard')
                    },3000);
                    
                }
                else if(userRole === 'manager'){
                    navigate('/manager/dashboard')
                }
                else if(userRole === 'user'){
                    navigate('/user/dashboard')
                }
            }else{
                toast.error(data?.message);
                setEmail("")
                setPassword("")
                return false;
            }
        }catch(err){
            console.log(err)
            return false;
        }

        
    }

    return (
        <>
            <Header />
            <div className='container mt-5'>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h4>Login User</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                        <input type="email" onChange={ (e) => setEmail(e.target.value) } value={email} className="form-control" placeholder='Enter your email'/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" className="form-control" onChange={ (e) => setPassword(e.target.value) } value={password}  placeholder='Enter your password'/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
            />
        </>
    )
}

export default Login