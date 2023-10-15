
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore,collection,addDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

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



let loginBtn = document.getElementById('loginBtn')
loginBtn.addEventListener("click",function(e) {
    
 e.preventDefault();

 let email = document.getElementById('emaail').value
 let password = document.getElementById('passwoord').value

 signInWithEmailAndPassword(auth, email, password)
 .then((userCredential) => {
   // Signed in 
   const user = userCredential.user;
   setTimeout(() => {
    window.location.href = 'Dashboard.html'
    
   }, 2000);
 
   console.log(user,"user succesfull")
  
   swal({
    icon: "success",
    text:"Login sucessfull"
 });
 
 

  })
 .catch((error) => {
   const errorCode = error.code;
   const errorMessage = error.message;
   console.log(errorMessage,"failed")
 
   swal({
    icon: "error",
    text:"registeration failed"
 });
 
 
  });


  document.getElementById("myData").reset();

})





