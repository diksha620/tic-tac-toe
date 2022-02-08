const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgain = document.getElementById("play");
const popup = document.getElementById("pop-container");
const notification = document.getElementById("mssg");
const finalMessage = document.getElementById("message");
const noOfLives = document.getElementById("no-of-lives")
const buttons = document.getElementsByClassName('btnn').value;
const figureParts = document.querySelectorAll(".figures");

const words = [
  "java",
  "python",
  "ruby",
  "c",
  "mongodb",
  "html",
  "javascript",
  "jquery",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correct = [];
const wrong = [];

function func(alpha) {
    // alert(alpha);
 
        // if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = alpha;
        if (selectedWord.includes(letter)) {

            if (!correct.includes(letter)) {
                correct.push(letter);
                display();
            }
            else {
                showNotification();
            }

        } else {
            if (!wrong.includes(letter)) {
                wrong.push(letter);
                updateWrongLetterElement();
            }
            else {
                showNotification();
            }
        }


};

const display = () => {
    wordElement.innerHTML = `${selectedWord
        .split("")
        .map(
          (letter) =>
            `<span class="letter">${correct.includes(letter) ? letter : ""} </span>`
        ).join("")
      }`;
      noOfLives.innerText = `total lives : ${counter}`
      const innerWord = wordElement.innerText.replace(/\n/g,"");

      if(innerWord === selectedWord){
          finalMessage.innerText = "congratulations! You Won";
          popup.style.display = "flex";
      }
      
}
var counter = 5;
function updateWrongLetterElement() {
    counter = counter - 1;
    noOfLives.innerText = `total lives : ${counter}`
    wrongLettersElement.innerHTML = 
    `${wrong.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrong.map((letter) => `<span>${letter}</span>
    `
    )}`
   ;

   figureParts.forEach(function (part, index) {
           const errors = wrong.length;
           if (index < errors) {
               part.style.display = "block";
           } else {
               part.style.display = "none";
           }

       });
    if(wrong.length === figureParts.length)
    {
        finalMessage.innerText = "unfortunately you lost";
        popup.style.display = "flex";
    }
}

const showNotification = () => {
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    },2000);
}
window.addEventListener("keydown",(e) => {
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        if(selectedWord.includes(letter)){

            if(!correct.includes(letter)){
                correct.push(letter);
                display();
            }
            else{
                showNotification();
            }
        }else{
            if(!wrong.includes(letter)){
                wrong.push(letter);
                updateWrongLetterElement();
            }
            else{
                showNotification();
            }
        }

    }
});
playAgain.addEventListener("click",() =>{
    correct.splice(0);
    wrong.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)]
    display();
    updateWrongLetterElement()
    popup.style.display = "none";
    
});
display();
