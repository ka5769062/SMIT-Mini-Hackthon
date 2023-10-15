import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  query,
  where, updateDoc
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";


import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";




const firebaseConfig = {
  apiKey: "AIzaSyC-LkuHInzIipj9vAU97FaPfRIikZIi89I",
  authDomain: "smit-hackathon-f914e.firebaseapp.com",
  databaseURL: "https://smit-hackathon-f914e-default-rtdb.firebaseio.com",
  projectId: "smit-hackathon-f914e",
  storageBucket: "smit-hackathon-f914e.appspot.com",
  messagingSenderId: "185121321933",
  appId: "1:185121321933:web:4ddb6a1329c03e2d8c8a84",
  measurementId: "G-7DJS3ZHDEX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();



//LOGOUT

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const myLogout = document.getElementById("myLogout")
    myLogout.addEventListener("click",()=>{

   window.location.href = "register.html"

    }) 

  } else {
    // User is signed out
    // ...
  }
});











// let spinner = document.getElementById("spinner")
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    showDetails(uid);

    // console.log(uid)
  } else {
  }
});
const user = auth.currentUser;

if (user) {
  const uid = user.uid;
  showDetails(uid);
} else {
}

async function showDetails(myId) {
  console.log(myId);
  const userName = document.getElementById("userName");
  const userPass = document.getElementById("userPass");
  const documentId_ = document.getElementById("documentId_");

  // spinner.style.display = "block"

  const q = query(collection(db, "users"), where("userId", "==", myId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const fieldValue1 = doc.data().first;
    const fieldValue = doc.data().password;
    const fieldValue2 = doc.id;
    const fieldValue3 = doc.data().profile

    userName.value = fieldValue1;
    userPass.value = fieldValue;
    documentId_.value = fieldValue2;
    let myImage = document.getElementById("myImage")
 
  if(fieldValue3){
    
    myImage.src = fieldValue3

  }

   
  });
}

async function myProfile(e) {
  e.preventDefault()

  swal({
    title: "Updated!",
    icon: "success",
    button: "OK",
  });

  const fileInput = document.getElementById("fileInput")
  const userName = document.getElementById("userName");
  const userPass = document.getElementById("userPass");
  let profileUrl = await uploadFiles(fileInput.files[0])
  console.log(fileInput.files[0])
 
  

}

let btn = document.getElementById("updateBtn")
btn.addEventListener("click", myProfile)


//  PROFILE IMAGE SETTING  


fileInput.addEventListener("change", (e) => {

  let myImage = document.getElementById("myImage")
  myImage.src = URL.createObjectURL(e.target.files[0])
 
  
})


const uploadFiles = async (file) => {

  return new Promise((resolve, reject) => {

    const mountainImagesRef = ref(storage, `images/${file}`)


    const uploadTask = uploadBytesResumable
      (mountainImagesRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('upload is ' + progress + '% done')

        switch (snapshot.state) {

          case 'paused':
            console.log('upload is paused')
            break;

          case 'running':
            console.log('upload is running')
            break;

        }
      },
      (error) => {

        // handle unseuccesful error
      },

      () => {

        // handle succesful uploads on complete 
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...

       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        (async()=>{
          const documentId_ = document.getElementById("documentId_");
          const UserRef = doc(db, "users", documentId_.value);
          await updateDoc(UserRef, {
          
            first: userName.value,
            profile: downloadURL
          });
          // swal({
          //   title: "Updated!",
          //   icon: "success",
          //   button: "OK",
          // });
        })()
          
          console.log('File available at', );

        });

      })

  });


}



