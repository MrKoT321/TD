// объект игры
var GAME = {
    width: 1600,
    height: 1000,
    isPlay: false,             // состояние игры идет или нет
}

var page = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

const background = new Image();
background.src = "../static/images/BASE-MAP.png";

background.onload = () => {
    GAME.background = background;
}

function drawBackground() {
    if (GAME.background) { 
        canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height)
    }
}

function play() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawMonster(monster);
    requestAnimationFrame(play);
}
play();