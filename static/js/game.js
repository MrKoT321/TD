const popupoverBg = document.querySelector('.popupover__bg');
const popupover = document.querySelector('.popupover');
const popupcompleteBg = document.querySelector('.popupcomplete__bg');
const popupcomplete = document.querySelector('.popupcomplete');  

const lvls = [lvl1, lvl2, lvl3, lvl4, lvl5]

var GAME = {
    width: 1600,
    height: 1000,
    isPlay: 'play',
    lvlCount: 1
}

var lvl = lvls[GAME.lvlCount - 1];
GAME.castleHP = lvl.castleHP;

var mobamount = lvl.mobamount

var notdeadmonsters = []

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

var starttime = 100

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

function gameOver(){
    popupoverBg.classList.add('active');
    popupover.classList.add('active');
}

function lvlComplete(){
    popupcompleteBg.classList.add('active');
    popupcomplete.classList.add('active');
}

function popupClose(){
    popupcompleteBg.classList.remove('active');
    popupcomplete.classList.remove('active');
    popupcompleteBg.classList.remove('active');
    popupcomplete.classList.remove('active');
}

function changeLvl() {

    GAME.lvlCount += 1;
    return lvls[GAME.lvlCount - 1];
}

function updateCastleHP() {
    let bar = document.getElementById("hp-bar");
    for(let i = 0; i < GAME.castleHP; i++) {
        bar.children[i].classList.remove("_hide");
    }
}

// состояния 'play' - мобы идут, башни ставятся
//           'pause' - мобы не идут, башни ставятся
//           'menu' - мобы не идут, башни не ставятся

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

function play() {
    drawBackground();
    moveMonsters(GAME);
    drawCastle();
    drawTiles(GAME);
    drawTower();
    if(GAME.castleHP == 0){
        gameOver();
        GAME.isPlay = 'pause';
    }
    if(GAME.castleHP > 0 && monsters.length == 0 && GAME.isPlay == 'play'){
        lvlComplete();
        GAME.isPlay = 'pause';
        let nextBtn = document.getElementById("next-lvl-btn");
        nextBtn.addEventListener("click", () => {
            lvl = changeLvl();
            mobamount = lvl.mobamount;
            GAME.castleHP = lvl.castleHP;
            changeMap();
            pa.x = lvl.start_x;
            pa.y = lvl.start_y - 50;
            pa.dir = lvl.start_dir;
            updateCastleHP();
            popupClose();
        });
    }
    requestAnimationFrame(play);
}

play();