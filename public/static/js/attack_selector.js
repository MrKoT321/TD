var GAME = {
    width: 1800,
    height: 1000,
    stopwatch: 0,
    milisectimer: 0,
    isPlay: 'wavepause',
    money: 100,
    score: 0,
    lvlCount: 1
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

const background = new Image();
background.src = "../static/images/background_selector.png";

background.onload = () => {
    GAME.background = background;
}

function drawBackground() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    if (GAME.background) {
        canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height)
    }
}

function updateMoney() {
    let moneyInfo = document.querySelector(".count-coin");
    moneyInfo.innerHTML = String(Math.floor(GAME.money));
}

function play() {
    updateMoney();
    drawBackground();

    requestAnimationFrame(play);
}

play();