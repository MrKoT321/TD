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

const loading_text = document.querySelector('.loading__text');
const loading_0 = document.querySelector('.loading__0');
const loading_100 = document.querySelector('.loading__100');
const loading_bg = document.querySelector('.loading-bg');
const loading_image = document.querySelector('.loading-image');

const lvls = [lvl3, lvl4];

var GAME = {
    player: document.getElementById("nick-name").innerHTML,
    width: 1600,
    height: 1000,
    stopwatch: 0,
    milisectimer: 0,
    isPlay: 'wavepause',
    money: 50,
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


function resetStopwatch() {
    GAME.stopwatch = 0;
    startTimer = new Date();
    GAME.milisectimer = 0;
    timeInPause = 0;
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
        document.querySelector('.over').style.color = 'red';
        document.querySelector('.over').innerHTML = 'GAME OVER';
        var scoreValue = document.querySelector(".count-score__value").innerHTML;
        var endScore = document.querySelector(".score__value");
        endScore.innerHTML = scoreValue;
        GAME.isPlay = 'popuppause';
    }
}

function updateMoney() {
    let moneyInfo = document.querySelector(".count-coin__value");
    moneyInfo.innerHTML = String(GAME.money);
}

function updateScore() {
    let scoreInfo = document.querySelector(".count-score__value");
    scoreInfo.innerHTML = String(GAME.score);
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
    GAME.money = lvls[GAME.lvlCount - 1].money
    return lvls[GAME.lvlCount - 1];
}

function updateCastleHP() {
    let bar = document.getElementById("hp-bar");
    for (let i = 0; i < GAME.castleHP; i++) {
        bar.children[i].classList.remove("_hide");
    }
}

function nextWave() {
    if (monsters.length == 0 && GAME.wave < lvls[GAME.lvlCount - 1].waves.length) {
        GAME.wave += 1;
        monstercount = 0;
        starttime = 900;
        GAME.isPlay = 'wavepause';
        pushmonstercount = 0;
        steptimer = 0;
        stepcounter = 1;
        explosions = [];
        strikes = [];
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
        explosions = [];
        strikes = [];
    }
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

async function sendResults(event) {
    const score = document.querySelector(".score__value");
    const gameID = document.getElementById("game-id");
    event.preventDefault();
    props = {
        gameId: gameID.innerHTML,
        nickName: GAME.player,
        choisenClass: 'defense',
        score: Math.floor(score.innerHTML)
    }
    console.log(props)
    const json = JSON.stringify(props);
    let response = await fetch('/add_record.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: json
    });
}

const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', function (event) {
    console.log('Connected to server.');
});

socket.addEventListener('message', function (event) {
    data = JSON.parse(event.data);
    switch (data.type) {
        case 'tower_add':
            towers = data.towers;
            GAME.money = data.money;
            break;
        case 'game_status':
            GAME.isPlay = data.status;
            changeGameStatusButtons();
            break;
        case 'fireball':
            fireball = data.fireball_bonus;
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

nextBtn.addEventListener(
    "click",
    () => {
        updateNextLvlParams();
        changeMap();
        updateCastleHP();
        popupCloseComplete();
    }
);

restartgame.addEventListener(
    "click",
    (event) => {
        sendResults(event); s
        updateRestartGameParams();
        changeMap();
        updateCastleHP();
        popupCloseOver();
    }
);

backToMenuBtn.addEventListener(
    "click",
    (event) => {
        sendResults(event);
        window.location.href = '../../';
    }
);

function closeLoading() {
    loading_text.classList.add('hidden');
    loading_0.classList.add('hidden');
    loading_100.classList.add('hidden');
    loading_bg.classList.add('hidden');
    loading_image.classList.add('hidden');
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
    drawTiles(GAME, lvls);
    drawExplosion();
    drawStrikes();
    updateMobDataDef();
    moveMonsters(GAME, lvls);
    drawCastle();
    if (GAME.isPlay == 'wavepause') {
        initBullets();
        resetStopwatch();
    }
    if (GAME.isPlay == 'play') {
        lvlComplete();
        nextWave();
        catchTime();
        updateArrows();
        updateBullets();
        updateExplosions();
        updateStrikes();
    }
    if (GAME.isPlay == 'startgame') {
        addMonster(GAME, lvls);
        GAME.isPlay = 'play';
    }
    if (GAME.isPlay != 'play' && GAME.isPlay != 'wavepause') {
        removeTowerSelectors();
    }
    drawTower();
    drawArrows();
    drawBullets();
    attackTowers(GAME);
    drawBonuses();
    changeGameStatusButtons();
    gameOver();
    if (GAME.isPlay == 'menu') {
        stopTimer();
        drawPauseBackground();
    }
    requestAnimationFrame(play);
}

setTimeout(() => { closeLoading() }, 5000)
setTimeout(() => { play() }, 5000)