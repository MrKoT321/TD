const popupoverBg = document.querySelector('.popupover__bg');
const popupover = document.querySelector('.popupover');

const popupcompleteBg = document.querySelector('.popupcomplete__bg');
const popupcomplete = document.querySelector('.popupcomplete');

const startWaveBtn = document.getElementById("startwave");
const pauseGameBtn = document.getElementById("pausegame");

const restartgame = document.getElementById("restartgame");
const backToMenuBtn = document.getElementById("back-to-menu");

const nextLvlForm = document.getElementById("form");
// const restartGameForm = document.getElementById("form-restart");

const currentLvl = document.getElementById("current-lvl");
const totalLvl = document.getElementById("total-lvl");
const currentWave = document.getElementById("current-wave");
const totalWave = document.getElementById("total-wave");

const wave1Info = document.getElementById("game-info-wave-1");
const wave2Info = document.getElementById("game-info-wave-2");
const wave3Info = document.getElementById("game-info-wave-3");

const playerIdInfo = document.getElementById("game-info-playerId");
const moneyInitInfo = document.getElementById("game-info-money");
const currLvlInfo = document.getElementById("game-info-currLvl");
const mobsUnlockInfo = document.getElementById("game-info-mobsUnlock");
const attackScore = document.querySelector(".count-score__value-attack");
const defenseScore = document.querySelector(".count-score__value-defense");


const lvls = [lvl1, lvl2, lvl3, lvl4];

var GAME = {
    player: document.title,
    id: document.getElementById("game-info-playerId").innerHTML,
    width: 1600,
    height: 1000,
    stopwatch: 0,
    milisectimer: 0,
    isPlay: 'wavepause',
    money: 0,
    attackScore: 0,
    defenseScore: 0,
    lvlCount: 1,
    wave: 1,
    submit: false,
}

lvls.forEach(lvl => {
    lvl.atk_towers = [];
});
var towers = [];

function sendGameStatus() {
    data = {
        type: 'game_status',
        status: GAME.isPlay
    }
    json = JSON.stringify(data);
    socket.send(json);
}

function connectScore() {
    data = {
        type: 'give_me_score'
    }
    json = JSON.stringify(data);
    socket.send(json);
}

// function sendWaves(waves) {
//     data = {
//         type: 'waves',
//         waves: waves
//     }
//     json = JSON.stringify(data);
//     socket.send(json);
// }

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

const socket = new WebSocket('ws://localhost:8090');

socket.addEventListener('message', function(event) {
    data = JSON.parse(event.data);
    console.log(data)
    switch (data.type) {
        case 'tower_add':
            towers = data.towers;   
            break;
        case 'game_status':
            GAME.isPlay = data.status;
            changeGameStatusButtons();
            break;
        case 'fireball':
            fireball = data.fireball_bonus;
            break;
        case 'freeze':
            freeze = data.freeze_bonus;
            break;
        case 'game_score':
            GAME.attackScore = data.attackScore;
            GAME.defenseScore = data.defenseScore;
            break;
    }
});

socket.addEventListener('open', function(event) {
    console.log('Connected to server.');
    data = {
        type: "add_room_to_new_client",
        roomId: document.getElementById("game-info-roomId").innerHTML
    }
    json = JSON.stringify(data);
    socket.send(json);
    sendGameStatus();
    connectScore();
});

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

function resetButtons() {
    startWaveBtn.classList.remove("active");
    pauseGameBtn.classList.remove("pause");
    pauseGameBtn.classList.add("play");
}

function drawCastle() {
    if (GAME.castle) {
        canvasContext.drawImage(GAME.castle, lvl.castle_x, lvl.castle_y, lvl.castle_w, lvl.castle_h);
    }
}

function gameOver() {
    if ((GAME.castleHP == 0 || (GAME.castleHP > 0 && GAME.wave == lvls[GAME.lvlCount - 1].waves.length && monsters.length == 0))) {
        if(GAME.lvlCount < 4) {
            sendNextLvlParams();
        }
        if(GAME.lvlCount == 4) {
            if (GAME.castleHP == 0) {
                GAME.attackScore += 1
            }
            if(GAME.castleHP > 0 && GAME.wave == lvls[GAME.lvlCount - 1].waves.length && monsters.length == 0){
                GAME.defenseScore += 1
            }
            showFinalPopup(GAME.attackScore, GAME.defenseScore);
            GAME.isPlay = 'popuppause';
        }
    } 
}

function showFinalPopup(myScore, opponentScore) {
    popupoverBg.classList.add('active');
    popupover.classList.add('active');
    if(myScore > opponentScore) {
        document.querySelector('.over').style.color = 'green';
        document.querySelector('.over').innerHTML = 'VICTORY';
    }
    if(myScore < opponentScore) {
        document.querySelector('.over').style.color = 'red';
        document.querySelector('.over').innerHTML = 'YOU LOSE';
    }
    if(myScore == opponentScore) {
        document.querySelector('.over').style.color = 'orange';
        document.querySelector('.over').innerHTML = 'DRAW';
    }
    var endScore = document.querySelector(".score__value");
    endScore.innerHTML = myScore + ':' + opponentScore;
};


function updateMoney() {
    let moneyInfo = document.querySelector(".count-coin__value");
    moneyInfo.innerHTML = String(GAME.money);
}

// function lvlComplete() {
//     if (GAME.castleHP == 0) {
//         GAME.score += GAME.lvlCount * 100;
//         GAME.isPlay = 'popuppause';
//         // resetBonuses();
//         if (GAME.lvlCount + 1 > lvls.length) {
//             popupoverBg.classList.add('active');
//             popupover.classList.add('active');
//             document.querySelector('.over').style.color = 'green';
//             document.querySelector('.over').innerHTML = 'VICTORY';
//             var endScore = document.querySelector(".score__value");
//             endScore.innerHTML = GAME.score ;
//         } else {
//             popupcompleteBg.classList.add('active');
//             popupcomplete.classList.add('active');
//             GAME.money += 100;
//         }
//     } 
    
// }

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
    if(!GAME.submit) {
        let playerId = nextLvlForm.elements.playerId;
        let money = nextLvlForm.elements.money;
        let score = nextLvlForm.elements.score;
        let currLvl = nextLvlForm.elements.currentLvl;
        let mobsUnlock = nextLvlForm.elements.mobsUnlock;
        playerId.value = String(GAME.playerId);
        money.value = String(GAME.money);
        score.value = String(GAME.score);
        currLvl.value = String(GAME.lvlCount + 1);
        mobsUnlock.value = String(GAME.mobsUnlock);
        // console.log(playerId.value, money.value, score.value, currLvl.value, mobsUnlock.value);
        $('#form').attr('action', '../make_waves_multiplay.php');
        $('#form').trigger('submit');
        GAME.submit = true;
    }
}

function sendBaseLvlParams() {
    let playerId = restartGameForm.elements.playerId;
    let money = restartGameForm.elements.money;
    let score = restartGameForm.elements.score;
    let currLvl = restartGameForm.elements.currentLvl;
    let mobsUnlock = restartGameForm.elements.mobsUnlock;
    playerId.value = String(GAME.id);
    money.value = String(100);
    score.value = String(0);
    currLvl.value = String(0);
    mobsUnlock.value = String('monster1,monster2');
    $('#form-restart').attr('action', '../make_waves_multiplay.php');
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

// async function sendResults(event) {
//     const score = document.querySelector(".score__value");
//     event.preventDefault();
//     props = {
//         gameId: playerIdInfo.innerHTML,
//         nickName: GAME.player,
//         choisenClass: 'attack',
//         score: Math.floor(score.innerHTML)
//     }
//     const json = JSON.stringify(props);
//     let response = await fetch('/add_record.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: json
//     });
// }

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
    switch(event.code) {
        case 'Space':
            pauseGame();
            break;
        case 'Enter':
            startWave();
            break;
    }
})

// restartgame.addEventListener(
//     "click",
//     () => {
//         // sendResults(event);
//         sendBaseLvlParams();
//         // updateRestartGameParams();
//         // changeMap();
//         // updateCastleHP();
//         // popupCloseOver();
//     }
// );

backToMenuBtn.addEventListener(
    "click", 
    (event) => { 
        sendResults(event);
        window.location.href = '../../';
    }
);

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
    GAME.playerId = parseInt(playerIdInfo.innerHTML);
    GAME.money = parseInt(moneyInitInfo.innerHTML);
    GAME.mobsUnlock = mobsUnlockInfo.innerHTML;
    changeMap();
}

function updateScore() {
    attackScore.innerHTML = String(GAME.attackScore)
    defenseScore.innerHTML = String(GAME.defenseScore)
}

// состояния 'play' - мобы идут, башни ставятся
//           'wavepause' - мобы не идут, башни ставятся
//           'menu' - мобы не идут, башни не ставятся
//           'popuppause' - мобы идут, башни не ставятся
//           'startgame' - ожидание появления первого моба

function play() {
    updateScore()
    updateMoney();
    updateVisualLvlParams();
    drawBackground();
    drawExplosion();
    drawStrikes();
    updateMobDataAtk();
    moveMonsters(GAME, lvls);
    drawCastle();
    drawBonuses();
    if (GAME.isPlay == 'wavepause') {
        resetStopwatch();
    }
    if (GAME.isPlay == 'play') {
        gameOver();
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
    drawTower();
    drawArrows();
    drawBullets();
    attackTowers(GAME);
    changeGameStatusButtons(); 
    if (GAME.isPlay == 'menu') {
        stopTimer();
        drawPauseBackground();
    }
    requestAnimationFrame(play);
}

initGameParams();
play();