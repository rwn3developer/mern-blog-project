import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const Auth = ({allowedRole}) => {
    const [auth,setAuth] = useAuth();
    //user is not login
    if(!auth?.token){ 
        return <Navigate to="/"/>
    }
    //role base authentication check like admin , manager , user etc
    const userRole = auth?.token?.user?.role;

    if(allowedRole && !allowedRole.includes(userRole)){
        return <Navigate to="/"/>
    }
    return <Outlet/>
}
export default Auth
