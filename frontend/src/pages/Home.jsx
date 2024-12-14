import React from "react";
import "./styles/home.css";
import TeachingSvg from "../assets/Teaching-amico.svg";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { SocialIcon } from "react-social-icons";
import { Navigate } from "react-router-dom";


function Home(){
    return(
        <div className = "home-container">
            <Header />
            <div className = "mid-1">
                <div className = "mid-container">
                    <div className = "home-content">
                        <h1>Imagine IT, Redefining the teaching space through interactive learning</h1>
                        <p className =  "home-msg">Create illustrations that will help your students understand concepts you're teaching</p>
                        <div className = "signup">
                            <div className = "join">
                                <p>create an account</p>
                            </div>
                            <button className = "signup-btn">Sign Up</button>
                        </div>
                        <div className = "social-platforms">
                            <p style =  {{position:"relative", top:"5px"}}>Follow us on:</p>
                            <SocialIcon className= "sc-logo" style={{ width:"30px", height:"30px" }}  url="https://x.com" />
                            <SocialIcon className= "sc-logo" style={{ width:"30px", height:"30px" }}  url="https://facebook.com" />
                            <SocialIcon className= "sc-logo" style={{ width:"30px", height:"30px" }} url="https://linkedin.com" />
                            <SocialIcon className= "sc-logo" style={{ width:"30px", height:"30px" }} url="https://youtube.com" />
                            <SocialIcon className= "sc-logo" style={{ width:"30px", height:"30px" }} url="https://instagram.com" />
                        </div>
                    </div>
                    <div className = "teaching-svg-container">
                        <img src = {TeachingSvg} alt = "teaching svg" className = "teaching-svg"/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Home;