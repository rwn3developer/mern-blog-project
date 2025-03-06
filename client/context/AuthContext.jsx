import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState(()=>{
        const storedAuth = JSON.parse(localStorage.getItem('loginuser'))
        return {token:storedAuth || null}
    })

    //Every Time Save token in LocalStorage
    useEffect(()=>{
        if(auth?.token){
            localStorage.setItem('loginuser',JSON.stringify(auth?.token));
        }
    },[auth?.token]);

    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext)
}

export {AuthProvider,useAuth}

