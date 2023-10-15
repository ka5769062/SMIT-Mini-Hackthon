
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore,collection,addDoc,getDoc,doc,getDocs, } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-LkuHInzIipj9vAU97FaPfRIikZIi89I",
  authDomain: "smit-hackathon-f914e.firebaseapp.com",
  databaseURL: "https://smit-hackathon-f914e-default-rtdb.firebaseio.com",
  projectId: "smit-hackathon-f914e",
  storageBucket: "smit-hackathon-f914e.appspot.com",
  messagingSenderId: "185121321933",
  appId: "1:185121321933:web:4ddb6a1329c03e2d8c8a84",
  measurementId: "G-7DJS3ZHDEX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);




let signupBtn =  document.getElementById('signupBtn') 
signupBtn.addEventListener("click",function(e) {
  
  e.preventDefault()
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  let fName = document.getElementById('fName').value
  let lName = document.getElementById('lName').value
  let rPassword = document.getElementById('rPassword').value
  
  
  createUserWithEmailAndPassword(auth,email,password,fName,lName,rPassword)
  .then(async(userCredential) => {
  // Signed in 
  const user = userCredential.user;
  const uid = user.uid
  console.log(user,"user register successful")

  try {
    const docRef = await addDoc(collection(db, "users"), {
      
      email: email,
      password:password,
      first: fName,
      last: lName,
      rPassword:rPassword,
      userId:uid
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  swal({
      icon: "success",
      text:"registered sucessfully"
   });

})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(errorMessage,"user register failed")
  swal({
      icon: "error",
      text:errorMessage
   });
});


document.getElementById("myform").reset();



})



