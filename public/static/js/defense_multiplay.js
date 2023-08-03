const popupoverBg = document.querySelector('.popupover__bg');
const popupover = document.querySelector('.popupover');

const popupcompleteBg = document.querySelector('.popupcomplete__bg');
const popupcomplete = document.querySelector('.popupcomplete');

const startWaveBtn = document.getElementById("startwave");
const pauseGameBtn = document.getElementById("pausegame");

const restartgame = document.getElementById("restartgame");
const backToMenuBtn = document.getElementById("back-to-menu");

const nextBtn = document.getElementById("next-lvl-btn");

const currentLvl = document.getElementById("current-lvl");
const totalLvl = document.getElementById("total-lvl");
const currentWave = document.getElementById("current-wave");
const totalWave = document.getElementById("total-wave");

const loading_text = document.querySelector('.loading-text');
const loading_score1 = document.getElementById('load-score1');
const loading_score2 = document.getElementById('load-score2');
const loading_score3 = document.getElementById('load-score3');
const load = document.querySelector('.load');
const loading_bg = document.querySelector('.loading-bg');
const loading_image = document.querySelector('.loading-image');
const loading = document.getElementById('loading');

const waitingOpponentScreen = document.querySelector(".waiting-screen");
const waitingOpponentScreenImg = document.querySelector(".waiting-opponent-screen");

const attackScore = document.querySelector(".count-score__value-attack");
const defenseScore = document.querySelector(".count-score__value-defense");

const timeToStart = document.querySelector(".waiting-screen-timer__value");

const lvls = [lvl1, lvl2, lvl3, lvl4];

var GAME = {
    player: document.getElementById("nick-name").innerHTML,
    width: 1600,
    height: 1000,
    stopwatch: 0,
    milisectimer: 0,
    isPlay: 'waitopponent',
    money: 100,
    attackScore: 0,
    defenseScore: 0,
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

function resetStopwatch() {
    GAME.stopwatch = 0;
    startTimer = new Date();
    GAME.milisectimer = 0;
    timeInPause = 0;
    steptimer = 0;
    stepcounter = 1;
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
    } else {
        if (GAME.isPlay == 'menu') {
            pauseGameBtn.classList.add("pause");
            pauseGameBtn.classList.remove("play");
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

function closeLoading() {
    load.classList.add('hidden');
    loading_text.classList.add('hidden');
    loading_score1.classList.add('hidden');
    loading_score2.classList.add('hidden');
    loading_score3.classList.add('hidden');
    loading_bg.classList.add('hidden');
    loading_image.classList.add('hidden');
    loading.classList.remove('loading')
    GAME.isPlay = 'waitopponent';
}

function openLoading() {
    GAME.isPlay = 'loading';
    loading.classList.add('loading')
    load.classList.remove('hidden');
    loading_text.classList.remove('hidden');
    loading_score1.classList.remove('hidden');
    loading_score2.classList.remove('hidden');
    loading_score3.classList.remove('hidden');
    loading_bg.classList.remove('hidden');
    loading_image.classList.remove('hidden');
}

function gameOver() {
    if ((GAME.castleHP == 0 || (GAME.castleHP > 0 && GAME.wave == lvls[GAME.lvlCount - 1].waves.length && monsters.length == 0))) {
        if (GAME.castleHP == 0) {
            GAME.attackScore += 1
        }
        if (GAME.castleHP > 0 && GAME.wave == lvls[GAME.lvlCount - 1].waves.length && monsters.length == 0) {
            GAME.defenseScore += 1
        }
        if (GAME.lvlCount < 4) {
            openLoading();
            updateNextLvlParams();
            setTimeout(() => {
                closeLoading();
                showOpponentScreen();
            }, 5000);
            changeMap();
            updateCastleHP();
        }
        if (GAME.lvlCount == 4 && GAME.isPlay == 'play') {
            showFinalPopup(GAME.defenseScore, GAME.attackScore);
            GAME.isPlay = 'popuppause';
        }
    }
}

function showFinalPopup(myScore, opponentScore) {
    popupoverBg.classList.add('active');
    popupover.classList.add('active');
    if (myScore > opponentScore) {
        document.querySelector('.over').style.color = 'green';
        document.querySelector('.over').innerHTML = 'VICTORY';
    }
    if (myScore < opponentScore) {
        document.querySelector('.over').style.color = 'red';
        document.querySelector('.over').innerHTML = 'YOU LOSE';
    }
    if (myScore == opponentScore) {
        document.querySelector('.over').style.color = 'orange';
        document.querySelector('.over').innerHTML = 'DRAW';
    }
    var endScore = document.querySelector(".score__value");
    endScore.innerHTML = String(myScore) + ':' + String(opponentScore);
};

function showOpponentScreen() {
    waitingOpponentScreen.classList.remove("hidden");
    waitingOpponentScreen.style.height = '1004px';
    waitingOpponentScreenImg.classList.remove("hidden");
}

function hideOpponentScreen() {
    if (GAME.isPlay != 'waitopponent') {
        waitingOpponentScreen.classList.add("hidden");
        waitingOpponentScreen.style.height = '0';
        waitingOpponentScreenImg.classList.add("hidden");
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

let animationId;
function spendMoneyError() {
    let moneyInfo = document.querySelector(".count-coin__value");
    clearTimeout(animationId);
    moneyInfo.classList.add("error");
    animationId = setTimeout(() => { moneyInfo.classList.remove("error"); }, 800)
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
    if (GAME.castleHP > 0 && GAME.wave == lvls[GAME.lvlCount - 1].waves.length && monsters.length == 0) {
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
        bar.children[i].classList.remove("_hide");
    }
}

function nextWave() {
    if (monsters.length == 0 && GAME.wave < lvls[GAME.lvlCount - 1].waves.length && GAME.isPlay != 'loading') {
        GAME.wave += 1;
        monstercount = 0;
        starttime = 900;
        GAME.isPlay = 'wavepause';
        pushmonstercount = 0;
        steptimer = 0;
        stepcounter = 1;
        explosions = [];
        pushmobs = 0;
        strikes = [];
    }
}

function updateNextLvlParams() {
    lvl = changeLvl();
    GAME.castleHP = lvl.castleHP;
    GAME.wave = 1;
    starttime = 900;
    monsters = [];
    pushmonstercount = 0;
    steptimer = 0;
    stepcounter = 1;
    explosions = [];
    bonuses = [];
    strikes = [];
    pushmobs = 0;
}

function updateRestartGameParams() {
    GAME.lvlCount = 1;
    lvl = lvls[GAME.lvlCount - 1];
    GAME.castleHP = lvl.castleHP;
    GAME.wave = 1;
    monstercount = 0;
    monsters = [];
    starttime = 900;
    GAME.money = 100;
    GAME.score = 0;
    towerTiles = [];
    towers = [];
    arrows = [];
    bullets = [];
    strikes = [];
    compareWithGameLvlTiles = 0;
    GAME.isPlay = 'wavepause';
    startTimer = 0;
    timeInPause = 0;
    timeInLastPause = 0;
    pauseStartTime = 0;
    pushmonstercount = 0;
    steptimer = 0;
    stepcounter = 1;
    explosions = [];
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

function sendGameStatus() {
    data = {
        type: 'game_status',
        status: GAME.isPlay
    }
    json = JSON.stringify(data);
    socket.send(json);
}

function convertStrToArray(waveStr) {
    let resWave = []
    waveStr.forEach(monsterStr => {
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

function createWaves(waves) {
    lvl.waves = [];
    waves.forEach(wave => {
        lvl.waves.splice(-1, 0, ...lvl.waves.splice(-1, 1, convertStrToArray(wave)));
    });
}

const socket = new WebSocket('ws://localhost:8090');

socket.addEventListener('open', function (event) {
    console.log('Connected to server.');
    data = {
        type: "add_room_to_new_client",
        roomId: document.getElementById("game-info-roomId").innerHTML
    }
    json = JSON.stringify(data);
    socket.send(json)
});

socket.addEventListener('message', function (event) {
    data = JSON.parse(event.data);
    switch (data.type) {
        case 'game_status':
            GAME.isPlay = data.status;
            changeGameStatusButtons();
            break;
        case 'waves':
            hideOpponentScreen();
            createWaves(data.waves);
            break;
        case 'healing':
            healing = data.healing_bonus;
            break;
        case 'invisible':
            invisible = data.invisible_bonus;
            break;
        case 'give_me_score':
            sendScoreToAttack();
            break;
        case 'time_to_choose':
            timeToStart.innerHTML = data.time;
            break;
    }
});

function startWave() {
    if (GAME.isPlay == 'wavepause') {
        startWaveBtn.classList.add("active");
        GAME.isPlay = 'startgame';
        sendGameStatus();
    }
}

function pauseGame() {
    if (GAME.isPlay == 'play') {
        pauseGameBtn.classList.remove("play");
        pauseGameBtn.classList.add("pause");
        GAME.isPlay = 'menu';
        sendGameStatus();
    } else {
        if (GAME.isPlay == 'menu') {
            pauseGameBtn.classList.remove("pause");
            pauseGameBtn.classList.add("play");
            GAME.isPlay = 'play';
            sendGameStatus();
        }
    }
}

startWaveBtn.addEventListener("click", () => { startWave() });
pauseGameBtn.addEventListener("click", () => { pauseGame() });
document.addEventListener("keydown", (event) => {
    switch (event.code) {
        case 'Space':
            pauseGame();
            break;
        case 'Enter':
            startWave();
            break;
    }
})

// nextBtn.addEventListener(
//     "click",
//     () => {
//         popupCloseComplete();
//         openLoading();
//         setTimeout(() => { closeLoading() }, 5000);
//         showOpponentScreen();
//         updateNextLvlParams();
//         changeMap();
//         updateCastleHP();
//     }
// );

backToMenuBtn.addEventListener(
    "click",
    (event) => {
        // sendResults(event);
        window.location.href = '../../';
    }
);

function sendScoreToAttack() {
    data = {
        type: 'game_score',
        attackScore: GAME.attackScore,
        defenseScore: GAME.defenseScore
    }
    json = JSON.stringify(data);
    socket.send(json);
}

function updateScore() {
    loading_score3.innerHTML = String(GAME.attackScore)
    loading_score1.innerHTML = String(GAME.defenseScore)
    attackScore.innerHTML = String(GAME.attackScore)
    defenseScore.innerHTML = String(GAME.defenseScore)
}

// document.addEventListener(
//     "DOMContentLoaded",
//     () => {
//         data = {
//             type: "add_room_to_new_client",
//             roomId: document.getElementById("game-info-roomId").innerHTML
//         }
//         json = JSON.stringify(data);
//         socket.send(json)
//     } 
// );

// состояния 'play' - мобы идут, башни ставятся
//           'wavepause' - мобы не идут, башни ставятся
//           'menu' - мобы не идут, башни не ставятся
//           'popuppause' - мобы идут, башни не ставятся
//           'startgame' - ожидание появления первого моба
//           'waitopponent' - ожидание оппонента

function play() {
    updateScore();
    hideOpponentScreen()
    updateMoney();
    updateVisualLvlParams();
    drawBackground();
    drawTiles(GAME, lvls);
    drawStrikes();
    updateMobDataDef();
    drawBonusesBottom();
    moveMonsters(GAME, lvls);
    drawExplosion();
    drawBonusesTop();
    updateBonuses();
    drawCastle();
    if (GAME.isPlay == 'waitooponent' || GAME.isPlay == 'wavepause') {
        resetBonusesReload();
        initBullets();
        resetStopwatch();
    }
    if (GAME.isPlay == 'play') {
        gameOver();
        nextWave();
        catchTime();
        drawBonusesReload();
        updateArrows();
        updateBullets();
        updateExplosions();
        updateStrikes();
    }
    if (GAME.isPlay == 'startgame') {
        addMonster(GAME, lvls);
        initBonuses("defense");
        GAME.isPlay = 'play';
    }
    if (GAME.isPlay != 'play' && GAME.isPlay != 'wavepause') {
        removeTowerSelectors();
    }
    drawTower();
    drawArrows();
    drawBullets();
    attackTowers(GAME);
    changeGameStatusButtons();
    if (GAME.isPlay == 'menu') {
        resetBonuses();
        resetBonusesReload();
        stopTimer();
        drawPauseBackground();
    }
    requestAnimationFrame(play);
}

setTimeout(() => { closeLoading() }, 5000)
setTimeout(() => { play() }, 5000)