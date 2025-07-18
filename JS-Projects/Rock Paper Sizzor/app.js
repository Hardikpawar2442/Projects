// let userScore = 0 ; 
// let compScore = 0 ;

const choices = document.querySelectorAll(".gameImg") ;
const btn = document.querySelector(".btn") ;
const userNumber = document.getElementById("userNum") ;
const compNumber = document.getElementById("compNum") ;

const generateCompChoice = () => {
    // Rock Paper Scrissor
    const options = ["rock","paper","scissor"] ;
    const getrandIdx = Math.floor(Math.random() * 3) ;
    console.log("Computer choice is ",options[getrandIdx]) ;
    return (options[getrandIdx]) ;
}

const drawGame = () => {
    console.log("Game was draw") ;
    btn.textContent = "Match Draw ! play again" ;
    btn.style.backgroundColor = "yellow" ;
    btn.style.color = "black" ;
}

const showWinner = (userWin,userChoice,compChoice) => {
    if(userWin) {
        console.log("Victory !") ;
        btn.textContent = `${userChoice} wins against ${compChoice} ! victory`;
        btn.style.backgroundColor = "green" ;
        btn.style.color = "white" ;
        (userNumber.textContent)++ ;
    }
    else{
        console.log("Loose !") ;
        btn.textContent = `${compChoice} wins against ${userChoice} ! loose` ;
        btn.style.backgroundColor = "red" ;
        btn.style.color = "white" ;
        (compNumber.textContent)++ ;
    }
}

const playGame = (userChoice) => {
    console.log("User choice is ",userChoice) ;
    // Computer choice :- 
    const compChoice = generateCompChoice() ;

    if(userChoice === compChoice){
        drawGame() ;
    }
    else{
        let userWin = true ;
        if(userChoice === "rock"){
            userWin = compChoice === "paper" ? false : true ;
        }
        else if(userChoice === "paper"){
            userWin =  compChoice === "scissor" ? false : true ;
        }
        else{
            userWin = compChoice === "rock" ? false : true ;
        }
        showWinner(userWin,userChoice,compChoice) ;
    }
}

const clickSound = new Audio("ting.mp3");

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        clickSound.currentTime = 0; // Reset to start so it plays every time
        clickSound.play();

        const userChoice = choice.alt;
        playGame(userChoice);
    });
});

const resetBtn = document.querySelector(".resetBtn");

resetBtn.addEventListener("click", () => {
    userNumber.textContent = 0;
    compNumber.textContent = 0;

    btn.textContent = "Game Reset ! Start playing";
    btn.style.backgroundColor = "#007bff"; // back to default blue
    btn.style.color = "white";
    
    console.log("Game scores have been reset");
});