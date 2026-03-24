const buyButton = document.getElementById('buyButton');
const inputName = document.getElementById('userName');
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

const database = firebase.database();
const bricksRef = database.ref('bricks');

let bricksCount = 0;

async function generatePDF(name){
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
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], {type: "application/pdf"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Certificate_${name}.pdf`;
    link.click();
}

database.ref().on('value', (snapshot) => {
    const data = snapshot.val|| {};
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

buyButton.addEventListener('click',async function(){
    const name = inputName.value;
    if(name ===""){
        alert("Please fill in your name first.");
        
    } else{
        bricksRef.transaction((currentValue) => {
            return (currentValue || 0)+1;
        });
        try {
        await generatePDF(name);
        inputName.value = "";
    } catch(error) {
        console.error("Pdf generating error", error);
        alert("Pdf generation error");
    }
    }
    
});