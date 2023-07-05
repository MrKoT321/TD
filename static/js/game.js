var GAME = {
    width: 1600,
    height: 1000,
    isPlay: false,    
}

var lvl = lvl1;

var notdeadmonsters = []

var page = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

var starttime = 0;
var mobamount = lvl.mobamount - 1

const background = new Image();
background.src = lvl.background;

background.onload = () => {
    GAME.background = background;
}

function drawBackground() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    if (GAME.background) {
        canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height)
    }
}

function play() {
    drawBackground();
    //for (var monster of monsters) {
        //let notdeadmonsters = monsters.filter(value => value.health > 0);
    //}
    //убираем мобов, которые умерли
    for (var monster of monsters) {//поменять monsters на notdeadmonsters
        drawMonster(monster);
    }
    for (var monster of monsters) {//поменять monsters на notdeadmonsters
        monsterMove(monster);
        monsterCorrect(lvl, monster);
    }
    if (mobamount > 0){
        starttime += 2
        if (starttime > 100) {
            addMonster(pa, lvl);
            starttime = 0;
            mobamount -= 1;
        }
    }
    drawTiles();
    drawTower();
    requestAnimationFrame(play);
}

play();
