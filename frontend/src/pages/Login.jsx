import React, {useState, useEffect} from "react";
import { useAuth } from "../Authcontext";
import Header from "../Components/Header";
import "./styles/login.css";
import Hello from "../assets/Notebook-amico.svg";

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const user = useAuth();
    const handleLogin = async(e)=>{
        e.preventDefault();
        if(username !=="" && password !== ""){
            user.userLogin({username:username, password:password})
            console.log(username, password);
        }else{
            alert("Make sure you have filled all the fields");
        }
        
    }
    return(
        <div className="main-log-container">
            <Header />
            <div className = "login-container">
                
                <div className = "logform-container">
                    <div className = "log-form">
                        <form className = "form" onSubmit = {handleLogin}>
                            <div className = "wc-msg">
                                <h1>Welcome Back</h1>
                            </div>
                            <div className = "input-box box1">
                                <input type = "text" placeholder = "Username" onChange = {event=>setUsername(event.target.value)}/>
                            </div>
                            <div className = "input-box box2">
                                <input type = "password" placeholder = "Password" onChange = {event=>setPassword(event.target.value)}/>
                            </div>
                            <button type = "submit" className = "sn-btn">Sign In</button>
                            <p className = "reg">Don't have an account? <span className = "reg-log">register</span></p>
                        </form>
                    </div>
                    <div className = "log-pic">
                        <img src = {Hello} alt = "login pic"/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default Login;