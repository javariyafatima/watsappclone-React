
import { Singupform } from "../../config/firebase";


import {useState} from "react"
import Swal from "sweetalert2"
import { useNavigate,} from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,db,storage } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";


function Singup(){

  
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
   
      const res = await createUserWithEmailAndPassword(auth, email, password);

     
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
           
            await setDoc(doc(db, "watsappuser", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

          
            await setDoc(doc(db, "userChats", res.user.uid), {});
             navigate("/login");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };


  return (
    <>
    <div className="singupbac">
    <div className="main-1">
        <div className="singup">
        
 
      <div className="singupdisplay">
      <h1>This is Signup page</h1>
      
  
            

      <form onSubmit={handleSubmit}>
          <input required type="text" id="in"placeholder="display name" />
          <input required type="email" id="in"placeholder="email" />
          <input required type="password"id="in" placeholder="password" />
          <input required  type="file" id="file"/>
         
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>

     </div>

      </div>

      </div>
     </div>
    </>
  );
}

export default Singup;