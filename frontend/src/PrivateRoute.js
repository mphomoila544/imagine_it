import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Authcontext";


const PrivateRoute =()=>{
    const user = useAuth();
    if(user.token === ""){
        console.log("Token not found");
        return <Navigate to ="/login"/>
    }
    console.log("Token was found");
    return <Outlet/>
}
export default PrivateRoute;