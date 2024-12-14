import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./Authcontext";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Design from "./pages/Design";

function App(){
  return(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path = "/" element = {<Home />}/>
          <Route path = "/register" element = {<Register />} />
          <Route path = "/login" element = {<Login />} />
          <Route element={<PrivateRoute/>}>
            <Route path = "/designs" element = {<Design />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;