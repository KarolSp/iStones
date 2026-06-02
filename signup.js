const firebaseConfig = {

  apiKey: "AIzaSyAo_1kOFD6am4HQZsOnTxi6H3-oOP7pW-o",

  authDomain: "church-reconstruction.firebaseapp.com",

  databaseURL: "https://church-reconstruction-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "church-reconstruction",

  storageBucket: "church-reconstruction.firebasestorage.app",

  messagingSenderId: "213009310319",

  appId: "1:213009310319:web:179e7ed73156830049639a"

};

const nameInput = document.getElementById("Name");
const emailInput = document.getElementById("Email");
const passwordInput = document.getElementById("Password");
const signupBtn = document.getElementById("signup-btn");
const backBtn = document.getElementById("back-btn");
const googleBtn = document.getElementById("google-pop-btn");

backBtn.addEventListener('click', ()=>{
    window.location.href= "index.html";
});

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

signupBtn.addEventListener('click',()=>{
    const email = emailInput.value;
    const name = nameInput.value;
    const password = passwordInput.value;
    if(email==""||name==""||password==""){
        alert("Fill in all fields!");
        return;
    }
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential)=>{
            alert("Success!");
            window.location.href="main.html";
    })
        .catch((error)=>{
        alert("Registration error");
    });
});

googleBtn.addEventListener('click',()=>{
    const google_popup_provider = auth.GoogleAuthProvider();
    auth.signInWithPopup(google_popup_provider)
        .then((result)=>{
            const user = result.user;
            window.location.href="main.html";
    })
        .catch((error)=>{
            alert("Google registration failed");
    });
    
});

