import { Loginform } from "../../config/firebase";

import {    useNavigate,} from "react-router-dom";
import {useState} from "react"
import Swal from "sweetalert2"

function Login(){

   const navigate = useNavigate();
  const [values, setvalues] = useState({
  
    email:"",
    password: "",
 
  
  });
 

  const setState = (key, value) => {
    setvalues({ ...values, [key]: value });
  };




  return (
    <>
        <div className="singupbac">
    <div className="main-1">
    <div className="singup">
       
        
 
      <div className="singupdisplay">
      <h1>This is Login page</h1>
      
      <input id="in"
        placeholder="email"
        onChange={(e) => setState("email", e.target.value)}
        value={values.email}
      />
     
      <input id="in"
        placeholder="password"
        onChange={(e) => setState("password", e.target.value)}
        value={values.password}
      />
      
      <button
        onClick={async () => {
          const response = await Loginform(values);
          
          if (response.status === "error") {
            Swal.fire({
            title: response.error,
           
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',

           

            
        })
        
          } else {
            Swal.fire({
              title: "sucess",
               
              icon: 'sucess',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
  
             
  
              
          })
            

            navigate("/Dashboard")
        
          
          
           

          }
        }}
      >
        Login
      </button>

     
     
      </div>
      </div>

      </div>
</div>
      
    </>
  );
}

export default Login;