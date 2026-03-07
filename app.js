let btns = ["pink","green","purple","blue"]
let h3 = document.querySelector("h3")
let leaderBoard = document.querySelector(".highScore")

let userSequence = [];
let gameSequence = [];
let level = 0
let highscore = 0
 
start = false;


document.addEventListener("keypress", function(){
    if(start == false){
        start = true;
        leaderBoard.style.display = "none"
        console.log("game started");
        levelUp()
    }
})

function levelUp(){
    userSequence = []
    level++
    h3.innerText = `Level : ${level}`

    let randInd = Math.floor(Math.random() * 4)
    let randClr = btns[randInd]
    let randBtn = document.querySelector(`.${randClr}`)

    gameSequence.push(randClr)
    console.log(gameSequence);

    gameFlash(randBtn)
}

function gameFlash(btn){
    btn.classList.add("gameflash")

    setTimeout(() => {
        btn.classList.remove("gameflash")
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash")
    setTimeout(() => {
        btn.classList.remove("userflash")
    }, 150);
}

function checkAns(idx){
    if(userSequence[idx] === gameSequence[idx]){
        if(userSequence.length === gameSequence.length){
            setTimeout(() => {
                levelUp()
            }, 300);
        }
    }else{
        if(level > highscore){
            highscore = level-1
        }
         h3.innerHTML = `<br> Level :<b>  ${level}</b> <br>Press any key to start again..`;
         leaderBoard.style.display = "block"
         leaderBoard.innerHTML = `Game over! Highest Score :<b> ${highscore}</b> `

    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
    }
}


function btnPress(){
    let btn = this

    userFlash(btn)

    let userClr = btn.getAttribute("id")
    userSequence.push(userClr)

    checkAns(userSequence.length - 1)
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress)
}

function reset(){
    level = 0
    userSequence = []
    gameSequence = []
    start = false
}