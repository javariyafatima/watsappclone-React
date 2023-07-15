import Singup from "./views/Signup";
import {useState,useEffect, useContext, } from "react"

import Login from "../src/views/Login";
import Users from "../src/views/Users";

import Dashboard from "../src/views/Dashboard";

import "./App.css"

import Layout from "../src/views/Layout";
import ErrorPage from"../src/views/ErrorPage";




import {  Routes,Route, Navigate } from "react-router";
import {    useNavigate} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";


function App (){
  const navigate = useNavigate();
const{currentuser}=useContext(AuthContext);
 

  return(
    <>
 

   
   
   <div className="App">

   

    <Routes>
            <Route path="/" element={ <Layout />}>
            
              <Route path="/login" element={<Login />} />
         
              <Route path="/signup" element={<Singup />} />
              <Route path="/Dashboard" element={currentuser?<Dashboard />:<Login/>} />
              <Route path="/users" element={<Users />} />

             
             
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
          </div>

         
    </>
  )
}
export default App;


