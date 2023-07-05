let popupoverBg = document.querySelector('.popupover__bg');
let popupover = document.querySelector('.popupover');
let popupcompleteBg = document.querySelector('.popupcomplete__bg');
let popupcomplete = document.querySelector('.popupcomplete');  

var lvl = lvl1;

var GAME = {
    width: 1600,
    height: 1000,
    isPlay: false,
    castleHP: lvl.castleHP
}

var mobamount = lvl1.mobamount

var notdeadmonsters = []

var page = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

var starttime = 100

const background = new Image();
const castle = new Image();
castle.src = lvl.castle_src;
background.src = lvl.back_src;

background.onload = () => {
    GAME.background = background;
}

castle.onload = () => {
    GAME.castle = castle;
}

function drawBackground() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    if (GAME.background) {
        canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height)
    }
}

function drawCastle() {
    if (GAME.castle) {
        canvasContext.drawImage(GAME.castle, lvl.castle_x, lvl.castle_y, lvl.castle_w, lvl.castle_h)
    }
}

function gameOver(){ 
    popupoverBg.classList.add('active'); 
    popupover.classList.add('active'); 
} 
 
function lvlComplete(){ 
    popupcompleteBg.classList.add('active'); 
    popupcomplete.classList.add('active'); 
}

function play() {
    drawBackground();
    moveMonsters(GAME);
    drawCastle();
    drawTiles();
    drawTower();
    if(GAME.castleHP == 0){
        gameOver();
    }
    if(GAME.castleHP > 0 && monsters.length == 0){
        lvlComplete();
    }
    requestAnimationFrame(play);
}

console.log(document.querySelector(".game__field").getBoundingClientRect())
play();