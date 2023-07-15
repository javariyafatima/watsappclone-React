import React, { useContext } from "react";

import Messages from './Messages';
import Unput from './Unput';
import { ChatContext } from "../context/ChatContext";
import { HiPhone,HiMicrophone,HiVideoCamera } from "react-icons/hi2";


const Chat = () => {

  const { data } = useContext(ChatContext);
  return (
    <div className='chat'>
     <div className='chatinfo'>
      <span>chat user name:</span>
      <span>{data.user?.displayName}</span>
  

   
     <div className='chaticon'>

    < HiVideoCamera/>
<HiPhone/>
<HiMicrophone/>




</div>
</div>
<Messages/>
<Unput/>
  
    
    </div>
 

  );
}

export default Chat;
