import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getAlldatauser } from "../../config/firebase";


function Users() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  
  const getData = async () => {
   
    const res = await getAlldatauser();
    setData(res.data);
  
  };

  useEffect(() => {
    getData();
  }, []);







  


       return (
  <>

 
  

<div  className="Dashboard">


        
        


    
<h2>All Users Data</h2>
<div className= "disply-card">
{data.map((user) => {
        return (

          
          
  
               
   
          
          <div className="main">
                  
                <div class="box-1">
                  
            
                    
                    <p class="p-1"> Email: {user.email}
                       
                      
                    </p>
                    <p class="p-1"> Name: {user.name}
                       
                      
                       </p>
                
                  <button>Chat</button>
                    
                    
                
        
                
          
            
            </div>

            </div>
                    
            

            
        

          
           
          
         

           
);
})}

</div>
</div>



   
  
     
    
</>

  );
}

export default Users;