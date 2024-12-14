import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();


const AuthProvider = ({children})=>{
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(()=>localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')):null);
    const [user, setUser] = useState(()=> localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')): null);
    let [loading, setLoading] = useState(true);
    
    const userLogin = async(data)=>{
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log(response.status);

        if(response.status === 200){
            console.log("fetch returned success");
            let decoded = jwtDecode(res.access);
            console.log(decoded);
            setUser(decoded.username);
            setAuthToken(res);
            localStorage.setItem('authToken', JSON.stringify(res));

            navigate("/designs");
            return;
        }
    }

    const logout = ()=>{
        setUser(null);
        setAuthToken("");
        localStorage.removeItem('authToken');
        navigate("/login");
        return;
    }

    const refreshToken = async()=>{
        console.log("refresh token was called");
        const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({"refresh": authToken.refresh})
            
        });
        let data = await response.json();
        console.log("refresh token status: "+response.status);
        if(response.status === 200){
            setAuthToken(data);
            setUser(jwtDecode(data.access).username);
            localStorage.setItem('authToken', JSON.stringify(data));
        }
    }

    useEffect(()=>{
        let mins = 1000*60*4;
        let interval = setInterval(()=>{
            if(authToken){
                refreshToken();
            }
        }, mins);
        return ()=>clearInterval(interval);
    }, [authToken, loading]);

    const context = {
        user:user,
        authToken: authToken,
        userLogin:userLogin
    };

    return(
    <AuthContext.Provider value ={context}>
        {children}
    </AuthContext.Provider>
    )




}

export default AuthProvider;

export const useAuth = ()=>{
    return useContext(AuthContext);
}