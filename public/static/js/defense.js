const popupoverBg = document.querySelector('.popupover__bg');
const popupover = document.querySelector('.popupover');
const popupcompleteBg = document.querySelector('.popupcomplete__bg');
const popupcomplete = document.querySelector('.popupcomplete');
const startwave = document.getElementById("startwave");
const restartgame = document.getElementById("restartgame");
const nextBtn = document.getElementById("next-lvl-btn");

const lvls = [lvl1, lvl2, lvl3, lvl4, lvl5];

var GAME = {
    width: 1600,
    height: 1000,
    stopwatch: 0,
    milisectimer: 0,
    isPlay: 'wavepause',
    money: 100,
    score: 0,
    lvlCount: 1
}

var startTimer = new Date();
var timeInPause = 0;
var timeInLastPause = 0;
var pauseStartTime = new Date();

var lvl = lvls[GAME.lvlCount - 1];
GAME.castleHP = lvl.castleHP;

var mobamount = lvl.mobamount;

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

var starttime = 900;

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

function drawBackground() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    if (GAME.background) {
        canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height);
    }
}

function drawCastle() {
    if (GAME.castle) {
        canvasContext.drawImage(GAME.castle, lvl.castle_x, lvl.castle_y, lvl.castle_w, lvl.castle_h);
    }
}

function gameOver() {
    if (GAME.castleHP == 0) {
        popupoverBg.classList.add('active');
        popupover.classList.add('active');
        GAME.isPlay = 'popuppause';
    }
}

function updateMoney() {
    let moneyInfo = document.querySelector(".count-coin__value");
    moneyInfo.innerHTML = String(Math.floor(GAME.money));
}

function updateScore() {
    let scoreInfo = document.querySelector(".count-score__value");
    scoreInfo.innerHTML = String(Math.floor(GAME.score));
}

function lvlComplete() {
    if (GAME.castleHP > 0 && monsters.length == 0) {
        console.log(1)
        GAME.score += GAME.lvlCount * 100;
        popupcompleteBg.classList.add('active');
        popupcomplete.classList.add('active');
        GAME.isPlay = 'popuppause';
        GAME.money += 100;
    }
}

function popupCloseComplete() {
    popupcompleteBg.classList.remove('active');
    popupcomplete.classList.remove('active');
    startwave.classList.remove("play");
    startwave.classList.add("pause");
}

function popupCloseOver() {
    popupoverBg.classList.remove('active');
    popupover.classList.remove('active');
    GAME.isPlay = 'wavepause';
    startwave.classList.remove("play");
    startwave.classList.add("pause");
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

function updateNextLvlParams() {
    lvl = changeLvl();
    mobamount = lvl.mobamount;
    GAME.castleHP = lvl.castleHP;
    monstercount = 0;
    starttime = 900;
    GAME.isPlay = 'wavepause';
}

function updateRestartGameParams() {
    GAME.lvlCount = 1;
    lvl = lvls[GAME.lvlCount - 1];
    mobamount = lvl.mobamount;
    GAME.castleHP = lvl.castleHP;
    monstercount = 0;
    starttime = 900;
    for (var lvl of lvls) {
        lvl.monsters = []
    }
    GAME.money = 0;
    GAME.score = 100;
}

nextBtn.addEventListener("click", () => {
    updateNextLvlParams();
    changeMap();
    updateCastleHP();
    popupCloseComplete();
}
);

restartgame.addEventListener(
    "click",
    () => {
        updateRestartGameParams();
        changeMap();
        updateCastleHP();
        popupCloseOver();
        addMonstersToLvls();
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
    updateMoney();
    updateScore();
    drawBackground();
    console.log(GAME.isPlay)
    if (GAME.isPlay == 'wavepause') {
        resetStopwatch();
    }
    if (GAME.isPlay === 'play') {
        lvlComplete();
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
    drawTiles(GAME, lvls);
    drawTower();
    attackTowers(GAME)
    drawArrow();
    updateArrow();
    drawBullet();
    updateBullet();
    gameOver();

    requestAnimationFrame(play);
}

addMonstersToLvls();
play();