// объект игры
var GAME = {
    width: 1600,
    height: 1000,
    isPlay: false,             // состояние игры идет или нет
}

var mnstr = [sf];

var page = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

var starttime = 0

const background = new Image();
background.src = "../static/images/BASE-MAP.png";

background.onload = () => {
    GAME.background = background;
}

function initEventsListeners() {
    window.addEventListener("mousedown", onCanvasMouseDown);
}

function onCanvasMouseDown(event) {
        starttime = sf.width/2
}

function drawBackground() {
    if (GAME.background) { 
        canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height)
    }
}

function play() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    if (starttime > 0){
        drawMonster(sf);
        monsterCorrect(lvl1, sf);
        starttime += sf.speed;
    }
    // // console.log(starttime);
    // if (starttime > sf.width + 50){
    //     drawMonster(pa);
    // }
    requestAnimationFrame(play);
}


initEventsListeners();
play();
