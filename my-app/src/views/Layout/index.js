import { Link, Outlet,useNavigate } from "react-router-dom";
import { CiVideoOn } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import capture from "../../asset/images/wat.png"
import logo from "../../asset/images/5.png"
import { useEffect, useState } from "react";
import { HiPhone } from "react-icons/hi2";


export default function Layout({ product }) {
  const navigate = useNavigate();

  


  return (

    <>
    
   
    <nav>


  
        
     
        <ul>

           

        <div className='chaticon2'>
   
      </div>
       

            

            
          <li id="home">
            <Link id="link" to="/">Home</Link>

          </li>
         

          
          <li>
            <Link id="link" to="/login">Login</Link>
          </li>
          <li>
            <Link id="link" to="/signup">Signup</Link>

          </li>
           
          <li>
            <Link id="link" to="/Dashboard">Dashboard</Link>

          </li>
        
          
          
        </ul>
    </nav>
 
    <Outlet />
    <div className="singupbac1">
      
      <div className='chaticon1'>
     <HiPhone/>
      </div>
 
      <h1>WatsApp App</h1>
       </div>
 


     

 
     
  
      
    
        <div className= "disply-card">
          




          
    
</div>

         
           
       
        


  

     

      {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
     

 </>
  );
}
