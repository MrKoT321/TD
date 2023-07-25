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

const wave_info = document.querySelector('.wave-info');
const info_block1 = document.getElementById('info-block1')
const info_block2 = document.getElementById('info-block2')
const info_block3 = document.getElementById('info-block3')
const info_block4 = document.getElementById('info-block4')
const info_block5 = document.getElementById('info-block5')
const wave_mob1_count = document.getElementById('wave-mob1-count')
const wave_mob2_count = document.getElementById('wave-mob2-count')
const wave_mob3_count = document.getElementById('wave-mob3-count')
const wave_mob4_count = document.getElementById('wave-mob4-count')
const wave_mob5_count = document.getElementById('wave-mob5-count')

const lvls = [lvl1, lvl2, lvl3, lvl4];

var GAME = {
    player: document.getElementById("nick-name").innerHTML,
    width: 1600,
    height: 1000,
    stopwatch: 0,
    milisectimer: 0,
    isPlay: 'wavepause',
    money: 100,
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
    wave_info.style.margin = "-" + String(1000 - lvl.start_y) + "px" + String(1600 - lvl.start_x) + "px";
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
        sendResults(event);
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

function changeWaveInfoPos(lvl){
    let wave_length = lvl.waves[GAME.wave - 1].length
    if(lvl.start_dir == 'r'){
        wave_info.style.margin = "-" + String(1000 - lvl.start_y + 20) + "px " + "5px";
        wave_info.style.flexDirection = "row"
    }
    if(lvl.start_dir == 'l'){
        wave_info.style.margin = "-" + String(1000 - lvl.start_y + 20) + "px " + String(1600 - 72 * wave_length - 5);
        wave_info.style.flexDirection = "row-reverse"
    }
    if(lvl.start_dir == 'u'){
        wave_info.style.margin ="-5px " + String(lvl.start_x + 20) + "px ";
        wave_info.style.flexDirection = "column"
    }
    if(lvl.start_dir == 'd'){
        wave_info.style.margin ="-" + String(1000 - 72 * wave_length - 5) + "px " + String(lvl.start_x + 20) + "px ";
        wave_info.style.flexDirection = "column-reversee"
    }
}

function updateInfoCounts(){
    let monster1_count = 0, monster2_count = 0, monster3_count = 0, monster4_count = 0, monster5_count = 0
    for(let monster of lvl.waves[GAME.wave - 1]){
        if(monster.name == 'monster1'){
            monster1_count += 1
        }
        if(monster.name == 'monster2'){
            monster2_count += 1
        }
        if(monster.name == 'monster3'){
            monster3_count += 1
        }
        if(monster.name == 'monster4'){
            monster4_count += 1
        }
        if(monster.name == 'monster5'){
            monster5_count += 1
        }
    }
    if (monster1_count > 0) {
        wave_mob1_count.innerHTML = String(monster1_count);
        info_block1.style.visibility = 'visible'
    } else {
        info_block1.style.position = 'absolute'
    }
    if (monster2_count > 0) {
        wave_mob2_count.innerHTML = String(monster2_count);
        info_block2.style.visibility = 'visible'
    } else {
        info_block2.style.position = 'absolute'
    }
    if (monster3_count > 0) {
        wave_mob3_count.innerHTML = String(monster3_count);
        info_block3.style.visibility = 'visible'
    } else {
        info_block3.style.position = 'absolute'
    }
    if (monster4_count > 0) {
        wave_mob4_count.innerHTML = String(monster4_count);
        info_block4.style.visibility = 'visible'
    } else {
        info_block4.style.position = 'absolute'
    }
    if (monster5_count > 0) {
        wave_mob5_count.innerHTML = String(monster5_count);
        info_block5.style.visibility = 'visible'
    } else {
        info_block5.style.position = 'absolute'
    }
}

function showWaveInfo() {
    if(GAME.isPlay != 'wavepause'){
        info_block1.style.visibility = 'hidden';
        info_block2.style.visibility = 'hidden';
        info_block3.style.visibility = 'hidden';
        info_block4.style.visibility = 'hidden';
        info_block5.style.visibility = 'hidden';
        info_block1.style.position = 'static';
        info_block2.style.position = 'static';
        info_block3.style.position = 'static';
        info_block4.style.position = 'static';
        info_block5.style.position = 'static';
    }
}

// состояния 'play' - мобы идут, башни ставятся
//           'wavepause' - мобы не идут, башни ставятся
//           'menu' - мобы не идут, башни не ставятся
//           'popuppause' - мобы идут, башни не ставятся
//           'startgame' - ожидание появления первого моба

function play() {
    showWaveInfo();
    updateMoney();
    updateScore();
    updateVisualLvlParams();
    drawBackground();
    drawTiles(GAME, lvls);
    drawExplosion();
    drawStrikes();
    if(GAME.isPlay != 'wavepause'){
        updateMobDataDef();
    }
    moveMonsters(GAME, lvls);
    drawCastle();
    if (GAME.isPlay == 'wavepause') {
        initBullets();
        resetStopwatch();
        updateInfoCounts();
        changeWaveInfoPos(lvl);
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
        initBonuses();
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
