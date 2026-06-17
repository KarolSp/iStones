const firebaseConfig = {

  apiKey: "AIzaSyAo_1kOFD6am4HQZsOnTxi6H3-oOP7pW-o",

  authDomain: "church-reconstruction.firebaseapp.com",

  databaseURL: "https://church-reconstruction-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "church-reconstruction",

  storageBucket: "church-reconstruction.firebasestorage.app",

  messagingSenderId: "213009310319",

  appId: "1:213009310319:web:179e7ed73156830049639a"

};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const emailInput = document.getElementById('email-bar');
const passwordInput = document.getElementById('password-bar');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('sign-up-btn');
const googleBtn = document.getElementById("login-google");

signupBtn.addEventListener('click', ()=> {
    window.location.href = "signup.html";
});

loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential)=> {
            if(userCredential.user.emailVerified){
                window.location.href="main.html";
            } else {
                alert("Your account is not verified. Please chceck your inbox");
                auth.signOut();
            }
    })
        .catch((error)=> {
        alert('Login failed');
    });
});

googleBtn.addEventListener('click',()=>{
    const google_popup_provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(google_popup_provider).then((userCredential)=>{
        const user = userCredential.user;
        return firebase.database().ref('users/'+user.uid+'/name').set(user.displayName);
    })
    .then((result)=>{
        window.location.href="main.html";
    })
    .catch((error)=>{
        alert("Google registration failed"+ error.message);
    });
    
});

