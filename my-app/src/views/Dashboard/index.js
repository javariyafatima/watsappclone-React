import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Chat from "../../component/Chat";
import Slidebar from "../../component/Slidebar";
function Dashboard() {
   return (
  <>
   
  <div className="home">





   
  
    <div className="container">
<Slidebar/>
<Chat/>
</div>
    </div>
     
    
</>

  );
}

export default Dashboard;