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
const database = firebase.database();
const backBtn = document.getElementById('back-btn');
const nameInput = document.getElementById('Name');
const saveNameBtn = document.getElementById('save-name-btn');
firebase.auth().onAuthStateChanged((user)=> {
    if(user){
        const display_name_of_user = database.ref('users/'+user.uid+'/name');
        display_name_of_user.on('value',(snapshoot)=>{
            const name = snapshoot.val() || user.displayName || "Sparrow";
            document.getElementById('user-display-name').innerText = name;  
            nameInput.value = name;
        });
    } else {
        if (!firebase.auth().currentUser){
                window.location.href = "index.html";
            }
        
    }
});

backBtn.addEventListener('click', ()=>{
    window.location.href= "main.html";
});

const newName = document.getElementById('Name').value;

saveNameBtn.addEventListener('click',()=>{
    database.ref('/users'+user.uid+'/name').set(newName);
});