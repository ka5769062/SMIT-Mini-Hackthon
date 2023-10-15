import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  orderBy,
  query,
  where,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth();
var clientNameGlobal
var clientImageGlobal
 





//  GETTING UserName on nav bar

let currentUser = document.getElementById("currentUser");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    localStorage.setItem("uid", uid);
    
    (async () => {
      const q = query(collection(db, "users"), where("userId", "==", uid));
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        currentUser.innerHTML = `Hi ${doc.data().first}`;
      });
    })();
    
    
    // LOGOUT
    let logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
      if (user) {
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            window.location.href = "index.html";
          })
          .catch((error) => {
            // An error happened.
          });
      }
    });

  } else {
    console.log("User is not signed in.");
  }

  showAllUserData();
});


// SETTING CLIENT NAME and image in blogs collection

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;

    const q = query(collection(db, "users"), where("userId", "==", uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      clientNameGlobal = doc.data().first +" "+ doc.data().last;
      clientImageGlobal = doc.data().profile

    });
  }
});




// MY BLOGS

let blogContainer = document.getElementById("blogContainer");
async function showAllUserData() {
  const user = auth.currentUser;
  const uid = user.uid
  
  if (uid){
  
  blogContainer.innerHTML = null;
  const q = query(collection(db, "blogs"), where ("userId", "==",uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let myData = doc.data();

    let blog = `  
  <div class="container mt-4">
    <div class="card mb-3">
      <div class="row g-0">

        <div class="d-flex kamran">
          <img src="${myData.userImage}" class="myimage img-fluid rounded-circle p-3" alt="..."
            width="100px" height="40px">
          <h4 class="card-title mt-4 userheading fw-bold" id="myTitle"> ${myData.title}</h4>
        </div>

        <div class="col-md-12">
          <div class="card-body ">
            <p class="card-text w-100 fw-semibold" id="desc"> ${myData.mind}</p>
            <p class="card-text userdetails">Posted by: ${myData.userName} -${new Date(myData.date).toLocaleString()}</p>

          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  blogContainer.innerHTML += blog;
});
}
}






