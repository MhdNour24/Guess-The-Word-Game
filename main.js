// setting game name
let gameName ="Guess The World";
document.title=gameName;
document.querySelector("h1").innerHTML=gameName;
document.querySelector("footer").innerHTML=`${gameName} game created successfully by MHD NOUR`

// setting game options
let numberTries = 6;
let numberLetters = 6;
let currentTry=1;
let numberOfHints =2

// manage words
let wordToGuess = "";
const words = ["create","update","delete","master","branch","mainly","elzero","school"]
wordToGuess = words[Math.floor(Math.random()*words.length)].toLowerCase();
let messageArea = document.querySelector(".message")

// manage hints
document.querySelector(".hint span").innerHTML=numberOfHints
const getHintButton =document.querySelector(".hint");
getHintButton.addEventListener("click",getHint);

function generateInput() {
    const inputsContainer = document.querySelector(".inputs");
    // create main try div
    for (let i = 1; i <= numberTries; i++) {
        const tryDiv =document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML=`<span>Try ${i}</span>`;
        if (i != 1) {
            tryDiv.classList.add("disabled-inputs");
        }
        // create inputs
        for (let j = 1; j <=numberLetters; j++) {
            const input =document.createElement("input");
            input.type="text";
            input.id=`guess-${i}-letter-${j}`;
            input.setAttribute("maxLength","1");
            tryDiv.appendChild(input);
        }
        inputsContainer.appendChild(tryDiv);
    }
    // focus on the first input in first try element 
    inputsContainer.children[0].children[1].focus();
    // disable all inputs except first one
    const inputsInDisabledDiv =document.querySelectorAll(".disabled-inputs input")
    inputsInDisabledDiv.forEach((input)=> (input.disabled=true));
    
    const inputs=document.querySelectorAll("input")
    inputs.forEach((input,index)=> {
        // convet input to uppercase
        input.addEventListener("input",function(){
            this.value=this.value.toUpperCase();
            const nextInput =inputs[index + 1]
            if (nextInput) {
                nextInput.focus();
            }
        })
        input.addEventListener("keydown",function (event) {
            // console.log(event)
            currentIndex=Array.from(inputs).indexOf(event.target)
            // console.log(currentIndex); 
            if (event.key=="ArrowLeft"){
                if (currentIndex>0){
                    const prevInput =inputs[currentIndex-1]
                    prevInput.focus();
                }
            }
            if(event.key=="ArrowRight"){
                if (currentIndex<inputs.length){
                    const nextInput=inputs[currentIndex+1]
                    nextInput.focus();
                }
            }
        })

    })
}
const guessButton=document.querySelector(".check");
guessButton.addEventListener("click",handleGuesses);

console.log(wordToGuess)

function handleGuesses() {
    let successGuess = true;
    console.log(wordToGuess);
    for (let i =1 ;i<= numberLetters;i++){
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i-1];
        // game logic
        if (letter === actualLetter) {
            // letter is correct and in place
            inputField.classList.add("yes-in-place");
        }
        else if (wordToGuess.includes(letter) && letter!=="") {
            // letter is correct but not in place
            inputField.classList.add("not-in-place");
            successGuess=false;
        }
        else {
            // letter is wrong
            inputField.classList.add("no");
            successGuess=false
        }
    }
    // check whether the user won or lost
    if (successGuess){
        messageArea.innerHTML = `you won the actual word is <span>${wordToGuess}</span>`
        // add disabled class on all try divs
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv)=> tryDiv.classList.add("disabled-inputs"))

        // disable the button
        guessButton.disabled=true;
        getHintButton.disabled=true;
    }else {
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentTryInput = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInput.forEach((input)=> (input.disabled=true));
        currentTry++;
        
        const nextTryInput =document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInput.forEach((input)=> (input.disabled=false));
        
        let el = document.querySelector(`.try-${currentTry}`)
        if (el){
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
            nextTryInput[0].focus();
        }else {
            guessButton.disabled=true;
            getHintButton.disabled=true;
            messageArea.innerHTML = `you lost the word <span>${wordToGuess}</span>`
        }
        
    }

}

function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML =numberOfHints
    }
    if (numberOfHints===0) {
        document.querySelector(".hint").disabled=true;
    }
    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    const emptyEnabledInputs =Array.from(enabledInputs).filter((input) => input.value === "");
    if (emptyEnabledInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length); 
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        // emptyEnabledInputs[randomIndex].value=wordToGuess[]
        if (indexToFill !== -1) {
            randomInput.value=wordToGuess[indexToFill].toUpperCase()
        }
    }
}
// function handleBackSpace(event) {
//     if (event.key === "Backspace") {
//         const inputs = document.querySelectorAll("input:not([disabled])");
//         const currentIndex = Array.from(inputs).indexOf(document.activeElement);
//         console.log(currentIndex);
//         if (currentIndex > 0) {
//             const currentInput = inputs[currentIndex];
//             const prevInput=inputs[currentIndex-1];
//             currentInput.value=""
//             prevInput.value=""
//             prevInput.focus();
//         } 
//     }
// }
// document.addEventListener("keydown", handleBackSpace)

window.onload =function () {
    generateInput()
}


