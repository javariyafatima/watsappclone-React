import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { auth } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {

  const {currentuser}=useContext(AuthContext)
  return (
    <div className='navvbar'>
      <span className='logos'> chats</span>

      <div className='user'>
        <img id="userimg"src={currentuser.photoURL}/>
       
        <span>{currentuser.displayName}</span>
 
<button onClick={()=>signOut(auth)}>Log</button>
      </div>

    </div>
  );
}

export default Navbar;
