const popupoverBg = document.querySelector('.popupover__bg');
const popupover = document.querySelector('.popupover');
const popupcompleteBg = document.querySelector('.popupcomplete__bg');
const popupcomplete = document.querySelector('.popupcomplete');
const startwave = document.getElementById("startwave");

const lvls = [lvl1, lvl2, lvl3, lvl4, lvl5]

var GAME = {
    width: 1600,
    height: 1000,
    stopwatch: 0,
    msInPause: 0,
    isPlay: 'wavepause',
    lvlCount: 1
}

var startTimer = new Date();
var timeInPause = 0;
var pauseStartTime = new Date();

var lvl = lvls[GAME.lvlCount - 1];
GAME.castleHP = lvl.castleHP;

var mobamount = lvl.mobamount

var notdeadmonsters = []

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

var starttime = 100;

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

function resetStopwatch() {
    startTimer = new Date();
}

function catchTime() {
    if (timeInPause != 0) {
        GAME.msInPause += timeInPause;
    }
    timeInPause = 0;
    GAME.stopwatch = Math.floor((new Date() - startTimer - GAME.msInPause) / 1000);
    pauseStartTime = new Date();
}

function stopTimer() {
    timeInPause = new Date() - pauseStartTime;
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

function gameOver() {
    if (GAME.castleHP == 0) {
        popupoverBg.classList.add('active');
        popupover.classList.add('active');
        GAME.isPlay = 'popuppause';
    }
}

function lvlComplete() {
    if (GAME.castleHP > 0 && monsters.length == 0 && GAME.isPlay == 'play') {
        popupcompleteBg.classList.add('active');
        popupcomplete.classList.add('active');
        GAME.isPlay = 'popuppause';
        let nextBtn = document.getElementById("next-lvl-btn");
        nextBtn.addEventListener("click", () => {
            lvl = changeLvl();
            mobamount = lvl.mobamount;
            GAME.castleHP = lvl.castleHP;
            changeMap();
            updateCastleHP();
            popupClose();
            GAME.isPlay = 'wavepause';
            monstercount = 0;
            starttime = 100;
        });
    }
}

function popupClose() {
    popupcompleteBg.classList.remove('active');
    popupcomplete.classList.remove('active');
    GAME.isPlay = 'startgame';
    startwave.classList.remove("play")
    startwave.classList.add("pause")
}

function changeLvl() {
    GAME.lvlCount += 1;
    return lvls[GAME.lvlCount - 1];
}

function updateCastleHP() {
    let bar = document.getElementById("hp-bar");
    for (let i = 0; i < GAME.castleHP; i++) {
        bar.children[i].classList.remove("_hide");
    }
}

startwave.addEventListener(
    "click",
    () => {
        if (GAME.isPlay == 'wavepause') {
            startwave.classList.remove("pause")
            startwave.classList.add("play")
            GAME.isPlay = 'startgame'
        } else {
            if (GAME.isPlay == 'menu') {
                startwave.classList.remove("pause")
                startwave.classList.add("play")
                GAME.isPlay = 'play'
            } else {
                startwave.classList.remove("play")
                startwave.classList.add("pause")
                GAME.isPlay = 'menu'
            }
        }
    }
)

function changeMap() {
    castle.src = lvl.castle_src;
    background.src = lvl.back_src;

    background.onload = () => {
        GAME.background = background;
    }

    castle.onload = () => {
        GAME.castle = castle;
    }
};

// состояния 'play' - мобы идут, башни ставятся
//           'wavepause' - мобы не идут, башни ставятся
//           'menu' - мобы не идут, башни не ставятся
//           'popuppause' - мобы идут, башни не ставятся
//           'startgame' - ожидание появления первого моба

function play() {
    if (GAME.isPlay == 'wavepause') {
        resetStopwatch();
    }
    if (GAME.isPlay == 'play') {
        catchTime();
    }
    if (GAME.isPlay == 'menu') {
        stopTimer();
    }
    drawBackground();
    moveMonsters(GAME);
    drawCastle();
    drawTiles(GAME, lvls);
    drawTower();
    atackArcher(GAME)
    atackBash(GAME);
    gameOver();
    lvlComplete();
    console.log(GAME.stopwatch, GAME.isPlay)
    requestAnimationFrame(play);
}

play();
