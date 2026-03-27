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

signupBtn.addEventListener('click', ()=> {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential)=> {
            userCredential.user.sendEmailVerification().then(() => {
                alert("Account created. Please chceck your inbox to verify it");
            });
        })
        .catch((error) =>{
        alert('Error');
    });
    emailInput.value = "";
    passwordInput.value = "";
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

