import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentuser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className={`messageowner ${message.senderId === currentuser.uid }`}
    ref={ref}
    >
      
     <div className='messageinfo'>
     <img  src={
            message.senderId === currentuser.uid
              ? currentuser.photoURL
              : data.user.photoURL
          }/>
     <span>just now</span>
     </div>
     <div className='messagecontant'>
     <p>{message.text}</p>
     {message.img && <img src={message.img} alt="" />}
     </div>
    </div>
  );
}

export default Message;
