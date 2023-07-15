import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()
export  const AuthContextProvider = ({children})=>{
    const [currentuser,setCurrentUser]= useState({})

useEffect(()=>{
 const unsub = onAuthStateChanged(auth,(user)=>{
      setCurrentUser(user)
      console.log(user)
});

return()=>{
unsub();
}
},[]);
return(
<AuthContext.Provider value={{currentuser}}>
{children}
</AuthContext.Provider>
)
}