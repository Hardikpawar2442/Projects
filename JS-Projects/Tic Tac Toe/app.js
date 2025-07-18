console.log("Tic Tac Toe - Game");

let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#resetBtn");
let newgameBtn = document.querySelector(".newBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector(".msg")

let turnO = true; // Players turn - X or O :- 

let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.textContent !== "") {
            return; // Prevent changing the box again
        }

        // 🔊 Play click sound
        clickSound.currentTime = 0; // rewind to start if already playing
        clickSound.play();


        if (turnO) {
            box.textContent = "O";
            turnO = false;
        } else {
            box.textContent = "X";
            turnO = true;
        }

        checkWinner();
    });
});


const gameOverSound = document.getElementById("gameOverSound");

const showWinner = (winner) => {
    msg.textContent = `CONGRATULATIONS WINNER IS ${winner}`;
    msgContainer.classList.remove("hide");
    gameOver = true;
    boxes.forEach((box) => box.classList.add("disabled"));

    // Play game over sound
    gameOverSound.play();
};

const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let posVal1 = boxes[pattern[0]].textContent;
        let posVal2 = boxes[pattern[1]].textContent;
        let posVal3 = boxes[pattern[2]].textContent;

        if (posVal1 !== "" && posVal1 === posVal2 && posVal2 === posVal3) {
            showWinner(posVal1);
            winnerFound = true;
            break;
        }
    }

    // 🔍 Check for tie only if no winner was found
    if (!winnerFound) {
        let allFilled = [...boxes].every((box) => box.textContent !== "");
        if (allFilled) {
            msg.textContent = "Match Tied!";
            msgContainer.classList.remove("hide");
            gameOver = true;

            // Play game over sound (optional)
            gameOverSound.play();
        }
    }
};

const resetGame = () => {
    turnO = true;
    gameOver = false;
    boxes.forEach((box) => {
        box.textContent = "";
        box.classList.remove("disabled");
    });
    msgContainer.classList.add("hide");
};

resetButton.addEventListener("click", resetGame);

newgameBtn.addEventListener("click", resetGame);

const musicToggleBtn = document.getElementById("musicToggle");

const bgMusic = document.getElementById("bgMusic");

musicToggleBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggleBtn.textContent = "Pause Music";
    } else {
        bgMusic.pause();
        musicToggleBtn.textContent = "Play Music";
    }
});

const clickSound = document.getElementById("clickSound");