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
        return firebase.database().ref('users/'+user.uid).set({
            name : user.displayName,
            date_of_creation : new Date().toISOString()
        });
    })
    .then((result)=>{
        window.location.href="main.html";
    })
    .catch((error)=>{
        alert("Google registration failed"+ error.message);
    });
    
});

const overlay = document.getElementById('overlay');
const forgotBtn = document.getElementById("forgot-password");
const forgotMenu = document.getElementById("forgot-menu");
const resetBtn = document.getElementById("reset");

function bottomMenu() {
    forgotMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}



forgotBtn.addEventListener('click', bottomMenu);
overlay.addEventListener('click',bottomMenu);

resetBtn.addEventListener('click',()=>{
    const email_to_reset = document.getElementById("reset-email").value.trim();
    if(email_to_reset ===""){
        alert("Please fill in your email in order to reset password.");
    }else{
        auth.sendPasswordResetEmail(email_to_reset)
        .then(()=>{
            alert("Please check your inbox.");
            bottomMenu();
        })
        .catch((Error)=>{
            alert("Error: "+ error.message);
        });
    }
});
