const buyButton = document.getElementById('buyButton');
const generateButton = document.getElementById('generateButton');
const counterDisplay = document.getElementById('totalBricks');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

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

//function getAuthUser(){
//    return new Promise((resolve)=> {
//        const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
//            unsubscribe();
//            resolve(user);
//        });
//    });
//}
//firebase.auth().onAuthStateChanged((user)=>{
    //if(!user){
    //    window.location.href = "index.html";
    //}
//});

//function identify(){
//    const user = getAuthUser();
//    if(!user){
//        window.location.href = "index.html";
//        return;
//    }
//}
//identify();
const database = firebase.database();
const bricksRef = database.ref('bricks');


let bricksCount = 0;

async function generatePDF(name, bricksCount){
    const existingPDFbytes = await fetch('./probny.pdf').then(res => res.arrayBuffer());
    const pdfDoc = await PDFLib.PDFDocument.load(existingPDFbytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    
    firstPage.drawText(name, {
        x:150,
        y:450,
        size: 30,
        color: PDFLib.rgb(0,0,0.8),
    });
    firstPage.drawText(bricksCount, {
        x:250,
        y:450,
        size: 30,
        color: PDFLib.rgb(0,0,0),
    });
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], {type: "application/pdf"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Certificate_${name}.pdf`;
    link.click();
}

database.ref().on('value', (snapshot) => {
    const data = snapshot.val() || {};
    const bricks = data.bricks || 0;
    const goal = data.goal || 1000;
    counterDisplay.innerText = bricks;
    let percentage = (bricks/goal)*100;
    if(percentage > 100){
        percentage = 100;
    }
    progressBar.style.width = percentage + "%";
    progressText.innerText = Math.floor(percentage) + "% of our goal";
});

generateButton.addEventListener('click',async function(){
    const user = firebase.auth().currentUser;
    const name = document.getElementById('user-display-name').innerText || user.displayName || "Sparrow";
    const bricksCount = document.getElementById('user-bricks-count').innerText || "0";
    if(!user){
        alert("Please log in first to purchase.");
        return;
    }
    
    
    try {
        await generatePDF(name, bricksCount);
    } catch(error) {
        console.error("Pdf generating error", error);
        alert("Pdf generation error");
    }
    
    
});

buyButton.addEventListener('click',async function(){
    const user = firebase.auth().currentUser;
    const name = document.getElementById('user-display-name').innerText || user.displayName || "Sparrow";
    
    if(!user){
        alert("Please log in first to purchase.");
        return;
    }
    if(name ===""){
        alert("Please fill in your name first.");
        
    } else{
        bricksRef.transaction((currentValue)=>(currentValue||0)+1);
        const userBricksVal= firebase.database().ref('users/'+user.uid+'/myBricks');
        userBricksVal.transaction((currentValue)=> (currentValue || 0)+1);
    }
    
});

firebase.auth().onAuthStateChanged((user)=> {
    if(user){
        const userBricksVal = firebase.database().ref('users/'+ user.uid+'/myBricks');
        userBricksVal.on('value',(snapshot)=> {
            const count = snapshot.val()||0;
            document.getElementById('user-bricks-count').innerText = count;
        });
        const display_name_of_user = database.ref('users/'+user.uid+'/name');
        display_name_of_user.on('value',(snapshoot)=>{
            const name = snapshoot.val() || user.displayName || "Sparrow";
            document.getElementById('user-display-name').innerText = name;  
        });
    } else {
        if (!firebase.auth().currentUser){
                window.location.href = "index.html";
            }
        document.getElementById('user-bricks-count').innerText = "0";
        
    }
});

const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById("side-menu");
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-btn');

function toogleMenu(){
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

menuBtn.addEventListener('click', toogleMenu);
closeBtn.addEventListener('click', toogleMenu);
overlay.addEventListener('click', toogleMenu);