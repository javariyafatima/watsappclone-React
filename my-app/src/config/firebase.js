
import { initializeApp } from "firebase/app";

import { UseState } from "react";
import{getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

import { getFirestore, collection, addDoc ,query, getDocs,where , } from "firebase/firestore";



const firebaseConfig = {

  
  apiKey: "AIzaSyD4rrJEHDMr1PxNzun6yUrisi8PPImCdRE",
  authDomain: "olx-project-a3b3f.firebaseapp.com",
  projectId: "olx-project-a3b3f",
  storageBucket: "olx-project-a3b3f.appspot.com",
  messagingSenderId: "217070893494",
  appId: "1:217070893494:web:c566b352e2cfde7da56917",
  measurementId: "G-YJDPP4R29G"
  
};





 const app = initializeApp(firebaseConfig);

 const auth = getAuth (app);
 const db = getFirestore(app);

 const storage = getStorage(app);


 let currentUid,  currentUserName;

 const Singupform =  async (values)=>{

  const { image,name} = values;

  try

  {

   
  
  
   const respone = await
  
  createUserWithEmailAndPassword(auth,values.email,values.password,)
 
  console.log(respone.user.uid)
  
  let url = "";
  if (image[0]) {
    //For image upload
    const imageName = image[0].name;
    const folderName = "user/";
    const imageRef = await ref(storage, folderName + imageName);
    console.log(imageRef);
    const uploadBytesRes = await uploadBytes(imageRef, image[0]);
    console.log(uploadBytesRes);
    url = await getDownloadURL(uploadBytesRes.ref)
    console.log(url);
  }


  const resDb = await addDoc  ( collection(db,"watsappuser"),{

    
   email: values.email,
    name,
   image: url,
   uid: respone.user.uid

   
 
 })

 console.log(resDb)
 

 return {
  status: "success",
 
};
await addDoc(collection(db,"userchats",respone.user.uid),{

})


}
catch (error) {


  console.log(error.message);

  return {
    status: "error",
    error: error.message,
  };

}



 }
 async function Loginform(values) {
  
  const { email, password } = values;

  try {
    const createUserWithEmailAndPasswordRes = await signInWithEmailAndPassword(
      auth,
    email,
      password
    );

    return {
      status: "success",
      // res,
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
}

const isUserAvailable = (setUserFunc) => {
  onAuthStateChanged(auth, (user) => {
      if (user) {
          currentUid = user.uid
          setUserFunc(user.uid)
         
          return user.uid
      } else {
          console.log("user nh hai")
      }
  });
}

async function postAd(values) {
  const { title, price, image, description, location,producttype, } = values;
  console.log(values);
  try {
    const { uid } = auth.currentUser;
    
    console.log(uid);

    let url = "";
    if (image[0]) {
      //For image upload
      const imageName = image[0].name;
      const folderName = "userPics/";
      const imageRef = await ref(storage, folderName + imageName);
      console.log(imageRef);
      const uploadBytesRes = await uploadBytes(imageRef, image[0]);
      console.log(uploadBytesRes);
      url = await getDownloadURL(uploadBytesRes.ref);
      console.log(url);
    }

    const addDocRes = await addDoc(collection(db,  "ads"), {
      title,
      price,
      image: url,
      description,
      location,
      uid,
      producttype,

    });
  

    


    return {
      status: "success",
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }

}

const getUserName = async (setUserNameState) => {
  try {
      const q = query(collection(db, "Userdetails"), where("uid", "==", currentUid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          currentUserName = doc.data().name
          setUserNameState(doc.data().name)
          console.log("User Name", currentUserName)
          return (doc.data().name)
      })
  }
  catch (error) {
      return (error)
  }
}


async function getAlldatauser() {
  
  try {
    const q = query(collection(db, "watsappuser" ));
    const querySnapshot = await getDocs(q);

    let arr = [];
    let obj = {};
   
    querySnapshot.forEach((doc) => {
     
      obj = { ...doc.data() };
      obj.docId = doc.id;

      arr.push(obj);
    });
    
    console.log(arr);
    return {
      status: "success",
      data: arr,
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
    

}


async function getAllAds() {
  

 
  try {
    const q = query(collection(db, "ads" ));
    const querySnapshot = await getDocs(q);

    let arr = [];
    let obj = {};
   
    querySnapshot.forEach((doc) => {
     
      obj = { ...doc.data() };
      obj.docId = doc.id;

      arr.push(obj);
    });
    
    console.log(arr);
    return {
      status: "success",
      data: arr,
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
}
async function myads  ()  {
  try {

    const  {uid } = auth.currentUser;
      const q = query(collection(db, "ads"), where("uid", "==", uid ));
      const querySnapshot = await getDocs(q);
      let copyArray = []
      querySnapshot.forEach((doc) => {
          copyArray.push(doc.data())
      })
      return {  
        data: copyArray,
        stutus:"sucess",
       }
    
  }
  catch (error) {
      alert("no")
  }
}
async function logoutUser() {
  try {
    await signOut(auth);
    return {
      status: "success",
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
}
export {Singupform,Loginform,postAd,storage, auth,getAllAds,logoutUser,getAlldatauser, db,myads,isUserAvailable,where,getUserName,}
