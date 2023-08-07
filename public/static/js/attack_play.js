const popupoverBg = document.querySelector('.popupover__bg');
const popupover = document.querySelector('.popupover');

const popupcompleteBg = document.querySelector('.popupcomplete__bg');
const popupcomplete = document.querySelector('.popupcomplete');

const startWaveBtn = document.getElementById("startwave");
const pauseGameBtn = document.getElementById("pausegame");

const restartgame = document.getElementById("restartgame");
const backToMenuBtn = document.getElementById("back-to-menu");
const cancelBtn = document.getElementById("cancel");
const menuBtnAlt = document.getElementById("back-to-menu-alt");

const nextBtn = document.getElementById("next-lvl-btn");
const nextLvlForm = document.getElementById("form");
const restartGameForm = document.getElementById("form-restart");

const currentLvl = document.getElementById("current-lvl");
const totalLvl = document.getElementById("total-lvl");
const currentWave = document.getElementById("current-wave");
const totalWave = document.getElementById("total-wave");

const wave1Info = document.getElementById("game-info-wave-1");
const wave2Info = document.getElementById("game-info-wave-2");
const wave3Info = document.getElementById("game-info-wave-3");

const globalBackground = document.querySelector('.decoration__front');
const gameMenuBtn = document.getElementById('game-menu-btn');

const gameIdInfo = document.getElementById("game-info-gameid");
const moneyInitInfo = document.getElementById("game-info-money");
const scoreInfo = document.getElementById("game-info-score");
const currLvlInfo = document.getElementById("game-info-currLvl");
const mobsUnlockInfo = document.getElementById("game-info-mobsUnlock");

const lvls = [lvl1, lvl2, lvl3, lvl4];

var paycount = 0;

var GAME = {
    player: document.title,
    width: 1600,
    height: 1000,
    stopwatch: 0,
    milisectimer: 0,
    isPlay: 'wavepause',
    money: 0,
    score: 0,
    lvlCount: 1,
    wave: 1
}

var startTimer = new Date();
var timeInPause = 0;
var timeInLastPause = 0;
var pauseStartTime = new Date();

var lvl = lvls[GAME.lvlCount - 1];
GAME.castleHP = lvl.castleHP;

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

function updateVisualLvlParams() {
    currentLvl.innerHTML = GAME.lvlCount;
    totalLvl.innerHTML = lvls.length;
    currentWave.innerHTML = GAME.wave;
    totalWave.innerHTML = lvls[GAME.lvlCount - 1].waves.length;
}

function showMenuPopup() {
    popupoverBg.classList.add('active');
    popupover.classList.add('active');
    document.querySelector('.over').style.color = 'orange';
    document.querySelector('.over').innerHTML = 'BACK TO MENU?';
    var endScore = document.querySelector(".score__value");
    restartgame.classList.add("hidden");
    backToMenuBtn.parentNode.classList.add("hidden");
    backToMenuBtn.classList.add("hidden");
    cancelBtn.classList.remove("hidden");
    menuBtnAlt.classList.remove("hidden");
    menuBtnAlt.parentNode.classList.remove("hidden");
    endScore.innerHTML = GAME.score;
    prevState = GAME.isPlay;
    GAME.isPlay = 'menu';
}

cancelBtn.addEventListener("click", () => {
    popupCloseOver();
    GAME.isPlay = prevState;
    prevState = undefined;
    setTimeout(() => {
        restartgame.classList.remove("hidden");
        backToMenuBtn.classList.remove("hidden");
        cancelBtn.classList.add("hidden");
        backToMenuBtn.parentNode.classList.remove("hidden");
        menuBtnAlt.classList.add("hidden");
        menuBtnAlt.parentNode.classList.add("hidden");
    }, 300);
});

function resetStopwatch() {
    GAME.stopwatch = 0;
    startTimer = new Date();
    GAME.milisectimer = 0;
    timeInPause = 0;
    timeInLastPause = 0;
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

function drawPauseBackground() {
    canvasContext.fillStyle = "rgba(0, 0, 0, 0.5)";
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function changeGameStatusButtons() {
    startWaveBtn.classList.add("active");
    pauseGameBtn.classList.remove("pause");
    pauseGameBtn.classList.add("play");
    if (GAME.isPlay == 'play') {
        pauseGameBtn.classList.add("play");
        pauseGameBtn.classList.remove("pause");
        globalBackground.classList.remove("_pause");
    } else {
        if (GAME.isPlay == 'menu') {
            pauseGameBtn.classList.add("pause");
            pauseGameBtn.classList.remove("play");
            globalBackground.classList.add("_pause");
        }
    }
    if (GAME.isPlay == 'wavepause') {
        startWaveBtn.classList.remove("active");
        pauseGameBtn.classList.add("pause");
        pauseGameBtn.classList.remove("play");
    }
}
function drawCastle() {
    if (GAME.castle) {
        canvasContext.drawImage(GAME.castle, lvl.castle_x, lvl.castle_y, lvl.castle_w, lvl.castle_h);
    }
}

function gameOver() {
    if (GAME.castleHP > 0 && GAME.wave == 3 && monsters.length == 0 && starttime == 0) {
        popupoverBg.classList.add('active');
        popupover.classList.add('active');
        document.querySelector('.over').style.color = 'red';
        document.querySelector('.over').innerHTML = 'GAME OVER';
        var scoreValue = document.querySelector(".count-score__value").innerHTML;
        var endScore = document.querySelector(".score__value");
        endScore.innerHTML = GAME.score;
        GAME.isPlay = 'popuppause';
    }
}

function updateMoney() {
    let moneyInfo = document.querySelector(".count-coin__value");
    let moneyNow = parseInt(moneyInfo.innerHTML);
    if (moneyNow <= GAME.money) {
        if (moneyNow < GAME.money)
            moneyInfo.innerHTML = String(moneyNow + 1);
    } else {
        moneyInfo.innerHTML = String(moneyNow - 1);
    }
    // moneyInfo.innerHTML = String(GAME.money);
}

function updateScore() {
    let scoreInfo = document.querySelector(".count-score__value");
    let scoreNow = parseInt(scoreInfo.innerHTML);
    if (scoreNow <= GAME.score) {
        if (scoreNow < GAME.score) {
            scoreInfo.innerHTML = String(scoreNow + 1);
        }
    } else {
        scoreInfo.innerHTML = String(scoreNow - 1);
    }
    // scoreInfo.innerHTML = String(GAME.score);
}

function lvlComplete() {
    if (GAME.castleHP == 0) {
        payForLastWaves();
        GAME.score += GAME.lvlCount * 100;
        GAME.isPlay = 'popuppause';
        resetBonuses();
        if (GAME.lvlCount + 1 > lvls.length) {
            popupoverBg.classList.add('active');
            popupover.classList.add('active');
            document.querySelector('.over').style.color = 'green';
            document.querySelector('.over').innerHTML = 'VICTORY';
            var endScore = document.querySelector(".score__value");
            endScore.innerHTML = GAME.score;
        } else {
            popupcompleteBg.classList.add('active');
            popupcomplete.classList.add('active');
            GAME.money += 100;
        }
    }

}

// async function sendNextlvlParams(event) {
//     const data = {
//         money: GAME.money,
//         score: GAME.score,
//         currLvl: GAME.lvlCount,
//         nickname: GAME.player,
//     }
//     event.preventDefault();
//     const json = JSON.stringify(data);
//     let response = await fetch('/make_waves.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: json
//     });
// }

function sendNextLvlParams() {
    let gameId = nextLvlForm.elements.gameId;
    let money = nextLvlForm.elements.money;
    let score = nextLvlForm.elements.score;
    let currLvl = nextLvlForm.elements.currentLvl;
    let mobsUnlock = nextLvlForm.elements.mobsUnlock;
    gameId.value = String(GAME.id);
    money.value = String(GAME.money);
    score.value = String(GAME.score);
    currLvl.value = String(GAME.lvlCount + 1);
    mobsUnlock.value = String(GAME.mobsUnlock);
    $('#form').attr('action', '../make_waves.php');
}

function sendBaseLvlParams() {
    let gameId = restartGameForm.elements.gameId;
    let money = restartGameForm.elements.money;
    let score = restartGameForm.elements.score;
    let currLvl = restartGameForm.elements.currentLvl;
    let mobsUnlock = restartGameForm.elements.mobsUnlock;
    gameId.value = String(GAME.id);
    money.value = String(100);
    score.value = String(0);
    currLvl.value = String(0);
    mobsUnlock.value = String('monster1,monster2');
    $('#form-restart').attr('action', '../make_waves.php');
}

function popupCloseComplete() {
    popupcompleteBg.classList.remove('active');
    popupcomplete.classList.remove('active');
}

function popupCloseOver() {
    popupoverBg.classList.remove('active');
    popupover.classList.remove('active');
}

function changeLvl() {
    GAME.lvlCount += 1;
    return lvls[GAME.lvlCount - 1];
}

function updateCastleHP() {
    let bar = document.getElementById("hp-bar");
    for (let i = 0; i < GAME.castleHP; i++) {
        bar.children[i].src = "../static/images/hp.png";
        bar.children[i].classList.remove("_hide");
    }
}

function nextWave() {
    if (monsters.length == 0 && GAME.wave < 3) {
        GAME.wave += 1;
        monstercount = 0;
        starttime = 900;
        GAME.isPlay = 'wavepause';
        pushmonstercount = 0;
        steptimer = 0;
        stepcounter = 1;
        strikes = [];
        explosions = [];
        pushmobs = 0;
    }
    if (monsters.length == 0 && GAME.wave == 3 && GAME.isPlay == 'play') {
        starttime = 0;
    }
}

function updateNextLvlParams() {
    if (GAME.lvlCount + 1 <= lvls.length) {
        lvl = changeLvl();
        GAME.castleHP = lvl.castleHP;
        GAME.wave = 1;
        monstercount = 0;
        starttime = 900;
        GAME.isPlay = 'wavepause';
        pushmonstercount = 0;
        steptimer = 0;
        stepcounter = 1;
        strikes = [];
        explosions = [];
    }
}

function updateRestartGameParams() {
    GAME.lvlCount = 1;
    lvl = lvls[GAME.lvlCount - 1];
    GAME.castleHP = lvl.castleHP;
    GAME.wave = 1;
    monstercount = 0;
    starttime = 900;
    GAME.money = 100;
    GAME.score = 0;
    towers = [];
    monsters = [];
    arrows = [];
    bullets = [];
    strikes = [];
    compareWithGameLvl = 0;
    startTimer = 0;
    timeInPause = 0;
    timeInLastPause = 0;
    pauseStartTime = 0;
    pushmonstercount = 0;
    steptimer = 0;
    stepcounter = 1;
    GAME.isPlay = 'wavepause';
}

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

async function sendResults(event) {
    event.preventDefault();
    props = {
        gameId: gameIdInfo.innerHTML,
        nickName: GAME.player,
        choisenClass: 'attack',
        score: GAME.score
    }
    const json = JSON.stringify(props);
    let response = await fetch('/add_record.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: json
    });
}

function startWave() {
    if (GAME.isPlay == 'wavepause') {
        startWaveBtn.classList.add("active");
        GAME.isPlay = 'startgame';
    }
}

function pauseGame() {
    if (GAME.isPlay == 'play') {
        pauseGameBtn.classList.remove("play");
        pauseGameBtn.classList.add("pause");
        GAME.isPlay = 'menu';
    } else {
        if (GAME.isPlay == 'menu') {
            pauseGameBtn.classList.remove("pause");
            pauseGameBtn.classList.add("play");
            GAME.isPlay = 'play';
        }
    }
}

startWaveBtn.addEventListener("click", () => { startWave() });
pauseGameBtn.addEventListener("click", () => { pauseGame() });
gameMenuBtn.addEventListener("click", () => { showMenuPopup() });

var isClick = false;
document.addEventListener("keydown", (event) => {
    if (!isClick) {
        switch (event.code) {
            case 'Space':
                pauseGame();
                isClick = true;
                break;
            case 'Enter':
                startWave();
                isClick = true;
                break;
        }
    }
})
document.addEventListener("keyup", (event) => {
    isClick = false;
})

nextBtn.addEventListener(
    "click",
    () => {
        sendNextLvlParams();
        // updateNextLvlParams();
        // changeMap();
        // updateCastleHP();
        // popupCloseComplete();
    }
);

restartgame.addEventListener(
    "click",
    (event) => {
        sendResults(event);
        sendBaseLvlParams();
        // updateRestartGameParams();
        // changeMap();
        // updateCastleHP();
        // popupCloseOver();
    }
);

backToMenuBtn.addEventListener(
    "click",
    (event) => {
        sendResults(event);
        window.location.href = '../../';
    }
);

menuBtnAlt.addEventListener(
    "click",
    (event) => {
        sendResults(event);
        window.location.href = '../../';
    }
)

function convertStrToArray(waveStr) {
    let resWave = []
    let monstersStrArr = waveStr.split(',');
    monstersStrArr.forEach(monsterStr => {
        switch (monsterStr) {
            case "monster1":
                resWave.push(monster1);
                break;
            case "monster2":
                resWave.push(monster2);
                break;
            case "monster3":
                resWave.push(monster3);
                break;
            case "monster4":
                resWave.push(monster4);
                break;
            case "monster5":
                resWave.push(monster5);
                break;
        }
    });
    return resWave;
}

function createWaves() {
    let waveStrs = [wave1Info.innerHTML, wave2Info.innerHTML, wave3Info.innerHTML];
    lvl.waves = [];
    waveStrs.forEach(waveStr => {
        lvl.waves.splice(-1, 0, ...lvl.waves.splice(-1, 1, convertStrToArray(waveStr)));
    });
}

function initGameParams() {
    GAME.lvlCount = parseInt(currLvlInfo.innerHTML);
    lvl = lvls[GAME.lvlCount - 1];
    createWaves();
    GAME.id = parseInt(gameIdInfo.innerHTML);
    GAME.money = parseInt(moneyInitInfo.innerHTML);
    GAME.score = parseInt(scoreInfo.innerHTML);
    let scoreValue = document.querySelector(".count-score__value");
    scoreValue.innerHTML = GAME.score;
    GAME.mobsUnlock = mobsUnlockInfo.innerHTML;
    changeMap();
}


function payForLastWaves() {
    if (paycount == 0) {
        for (i = GAME.wave; i < 3; i++) {
            for (monster of lvl.waves[i]) {
                GAME.money += Math.floor(monster.cost / 2);
                GAME.score += monster.cost;
            }
        }
        for (monster of monsters) {
            GAME.money += Math.floor(monster.cost / 2);
            monster.hp = 0;
        }
        paycount += 1

    }
}

// состояния 'play' - мобы идут, башни ставятся
//           'wavepause' - мобы не идут, башни ставятся
//           'menu' - мобы не идут, башни не ставятся
//           'popuppause' - мобы идут, башни не ставятся
//           'startgame' - ожидание появления первого моба

function play() {
    updateMoney();
    updateScore();
    updateVisualLvlParams();
    drawBackground();
    drawBonusesBottom();
    moveMonsters(GAME, lvls);
    drawExplosion();
    updateBonuses();
    drawCastle();
    changeGameStatusButtons();
    if (GAME.isPlay == 'wavepause') {
        resetBonuses();
        resetBonusesReload();
        setTowers(GAME, lvl);
        resetStopwatch();
    }
    if (GAME.isPlay == 'play') {
        drawBonusesReload();
        lvlComplete();
        nextWave();
        catchTime();
        updateArrows();
        updateBullets();
        updateStrikes();
        updateExplosions();
        updateMobDataAtk();
    }
    if (GAME.isPlay == 'startgame') {
        addMonster(GAME, lvls);
        GAME.isPlay = 'play';
        initBonuses("attack");
    }
    drawTower();
    drawStrikes();
    drawArrows();
    drawBullets();
    drawBonusesTop();
    attackTowers(GAME);
    gameOver();
    if (GAME.isPlay == 'menu') {
        stopTimer();
        drawPauseBackground();
        resetBonusesReload();
    }
    requestAnimationFrame(play);
}

setTimeout(() => { initGameParams(); }, 500)
setTimeout(() => { play(); }, 700)
