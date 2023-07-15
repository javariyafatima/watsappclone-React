import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
const Serchbar = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentuser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "watsappuser"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
   
    const combinedId =
      currentuser.uid > user.uid
        ? currentuser.uid + user.uid
        : user.uid + currentuser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentuser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentuser.uid,
            displayName: currentuser.displayName,
            photoURL: currentuser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  return (
    <div className='serch'>
      <div className='input'>
        <input placeholder='user serch' type='text'onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)}/>
      </div>
      {err && <span>User not found!</span>}
      {user && (
<div className='userchat' onClick={handleSelect}>
    <img src={user.photoURL}/>
    <div className='userchatinfo'>
        <span> {user.displayName}</span>

    </div>

</div>

      )}

    </div>
  );
}

export default Serchbar;
