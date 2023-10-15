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


//if user is not signed in 



// onAuthStateChanged(auth, (user) => {
//    else {
//     // User is signed out
//     // ...
//   }
// });

 // LOGOUT
const user = auth.currentUser;


// SETTING CLIENT NAME and image in blogs collection

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
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
      else {
        window.location.href ='./register.html'   
    
      }
    });
    
    const q = query(collection(db, "users"), where("userId", "==", uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      clientNameGlobal = doc.data().first +" "+ doc.data().last;
      clientImageGlobal = doc.data().profile 

    });
  }

});

// SETTING DATA IN FIREBASE

let mypost = document.getElementById("post");
mypost.addEventListener("click", async (e) => {
  e.preventDefault();

  let title = document.getElementById("tittle").value;
  let mind = document.getElementById("mind").value;

   if( title === '' || mind === ''){

    alert("input field can not be empty")

   }
   else{

    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        title: title,
        mind: mind,
        date: new Date().getTime(),
        userId: localStorage.getItem("uid"),
        userName: clientNameGlobal,
        userImage: clientImageGlobal?clientImageGlobal:''
     
      });

      swal({
        title: "Posted!",
        icon: "success",
        button: "OK",
      });


      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
      document.getElementById("ourForm").reset();
   }

 
});

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
  } else {
    console.log("User is not signed in.");
  }

  showAllUserData();
});

// ALL BLOGS



let blogContainer = document.getElementById("blogContainer");
async function showAllUserData() {
  blogContainer.innerHTML = null;
  const q = query(collection(db, "blogs") , orderBy("date", "desc"));
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
            <button onclick="deleteBlog('${doc.id}')"> Delete</button>
            <button>Edit</button>

          </div>
        </div>
      </div>
    </div>


  </div>
  `;
    blogContainer.innerHTML += blog;
  });
}

let post = document.getElementById("post");
post.addEventListener("click", async (e) => {
  
  showAllUserData();

  document.getElementById("ourForm").reset();
});


// Delete POST onclick

const deleteBlog = async (userId) => {
   
  await deleteDoc(doc(db, "blogs", userId));
  swal({
    title: "Deleted!",
    icon: "success",
    button: "OK",
  });
  setTimeout(() => {
    
  window.location.reload()
 
  }, 2000);
  
 
}
window.deleteBlog = deleteBlog;


