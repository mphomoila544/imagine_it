import React from "react";
import "../../src/styles.css";
import { Navigate, useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate();
    return(
        <div className = "nav-bar">
            <div className = "logo">
                <h2 onClick = {()=>{navigate("/")}}>Imagine IT</h2>
            </div>
            <div className = "links">
                <ul className = "nav-ul">
                    <li>
                        <a href = "#">Home</a>
                        <a href = "#">Illustrations</a>
                        <a href = "#">Ask AI</a>
                    </li>
                </ul>
            </div>
            <div className = "nav-btn">
                <button className = "sign-btn" onClick = {()=>{navigate("/login")}} >Sign In</button>
            </div>
        </div>
    )
}
export default Header;