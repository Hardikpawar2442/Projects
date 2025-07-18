let btns = document.querySelector(".btn") ;
let input = document.querySelector(".samay") ;

btns.addEventListener("click",afterClick) ;

function afterClick(){
    let samayName = input.value ;
    const endDate = new Date(samayName).getTime() ; // Time calculation upto this date
    const startDate = new Date().getTime() ;  // Current Time


    let x = setInterval(function updateTimer() {
    const currDate = new Date().getTime() ;

    const distaceCovered = currDate - startDate ;
    const distancePending = endDate - currDate ;

    // Calculate day, min, hour, sec 

    const days = Math.floor(distancePending / (24 * 60 * 60 * 1000) );
    const hrs = Math.floor((distancePending % (24 * 60 * 60 * 1000))/((60 * 60 * 1000))) ;
    const mins = Math.floor((distancePending % (60 * 60 * 1000)) / (60 * 1000)) ;
    const secs = Math.floor((distancePending % (60 * 1000))/1000) ;

    document.getElementById("days").innerHTML = days ;
    document.getElementById("hours").innerHTML = hrs ;
    document.getElementById("minutes").innerHTML = mins ;
    document.getElementById("seconds").innerHTML = secs ;

    const totalDistance = endDate - startDate ;
    const percentageDistance = ((distaceCovered/totalDistance) * 100) ;

    document.querySelector(".progressBar").style.width = percentageDistance + "%" ;

    if(distancePending < 0){
        clearInterval(x) ;
        document.getElementById("Countdown").innerHTML = "Expired" ;
        document.getElementsByClassName("progressBar").style.width = "100%" ;
    }
},1000) ;

input.value = "" ;
}


