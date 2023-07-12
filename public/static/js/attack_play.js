var GAME = {
    width: 1600,
    height: 1000,
    stopwatch: 0,
    milisectimer: 0,
    isPlay: 'play',
    money: 100,
    score: 0,
    lvlCount: 1
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

const lvls = [lvl1, lvl2, lvl3, lvl4, lvl5];

var lvl = lvls[GAME.lvlCount - 1];
GAME.castleHP = lvl.castleHP;

var startTimer = new Date();
var timeInPause = 0;
var timeInLastPause = 0;
var pauseStartTime = new Date();

var starttime = 900;

var mobamount = lvl.mobamount;

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

startwave.addEventListener(
    "click",
    () => {
        if (GAME.isPlay == 'wavepause') {
            startwave.classList.remove("pause");
            startwave.classList.add("play");
            GAME.isPlay = 'startgame';
        } else {
            if (GAME.isPlay == 'menu') {
                startwave.classList.remove("pause");
                startwave.classList.add("play");
                GAME.isPlay = 'play';
            } else {
                startwave.classList.remove("play");
                startwave.classList.add("pause");
                GAME.isPlay = 'menu';
            }
        }
    }
)

function resetStopwatch() {
    GAME.stopwatch = 0;
    startTimer = new Date();
    GAME.milisectimer = 0;
}

function catchTime() {
    if (timeInLastPause != 0) {
        timeInPause += timeInLastPause;
    }
    timeInLastPause = 0;
    GAME.stopwatch = Math.floor((new Date() - startTimer - timeInPause) / 1000);
    GAME.milisectimer = Math.floor(new Date() - startTimer - timeInPause);
    pauseStartTime = new Date();
}

function stopTimer() {
    timeInLastPause = new Date() - pauseStartTime;
}

function play(){
    drawBackground();
    if (GAME.isPlay == 'wavepause') {
        resetStopwatch();
    }
    if (GAME.isPlay === 'play') {
        // lvlComplete();
        catchTime();
        updateScoreForMob();
    }
    if (GAME.isPlay == 'menu') {
        stopTimer();
    }
    if (GAME.isPlay == 'startgame') {
        addMonster();
        GAME.isPlay = 'play';
    }
    moveMonsters(GAME);
    drawCastle();
    requestAnimationFrame(play);
}

// setupTowers();
addMonstersToLvls();
play();