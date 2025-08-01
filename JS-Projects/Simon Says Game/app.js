let gameSeq = [] ;
let userSeq = [] ;

let started = false ;
let level = 0 ;

let btns = ["yellow","red","purple","green"] ;

let h2 = document.querySelector('h2') ;

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game is started") ;
        started = true ;
        levelUp() ;
    }
}) ;

function gameFlash(btn){
    btn.classList.add("flash") ;
    setTimeout(function() {
        btn.classList.remove("flash") ;
    },250)
}

function userFlash(btn){
    btn.classList.add("userflash") ;
    setTimeout(function() {
        btn.classList.remove("userflash") ;
    },250)
}

function levelUp(){
    userSeq = [] ;
    level++ ;
    h2.innerText = `Level ${level}` ;

    let randIdx = Math.floor((Math.random() * 3) )  ;
    let randColor = btns[randIdx] ;
    let randBtn = document.querySelector(`.${randColor}`) ;

    // console.log(randIdx) ;
    console.log(randColor) ;

    gameSeq.push(randColor) ;
    console.log(gameSeq) ;

    gameFlash(randBtn) ;
} 

function checkAns(idx){
    // console.log("current level",level) ;
    
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000) ;      
        }
    }
    else{
        h2.innerHTML = `Game Over ! Your Score was <b> ${level}</b> <br> press any key to start.`;
        document.querySelector('body').style.backgroundColor = "red" ; 
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = "white" ;
        },250) ;
        reset() ;
    }
}

function btnPress() {
    console.log(this) ;
    let btn = this ; 
    userFlash(btn) ;

    userColor = btn.getAttribute("id") ;
    userSeq.push(userColor) ;

    checkAns(userSeq.length - 1) ;
}

let allBtns = document.querySelectorAll(".btn") ;

for(btn of allBtns){
    btn.addEventListener("click",btnPress); 
}

function reset() {
    started = false ;
    gameSeq = [] ;
    userSeq = [] ;
    level = 0 ;
}