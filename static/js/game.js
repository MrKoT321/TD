// объект игры
var GAME = {
    width: 1600,
    height: 1000,
    isPlay: false,             // состояние игры идет или нет
}

var notdeadmonsters = []

var page = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

var starttime = 0
var mobamount = lvl1.mobamount - 1

const background = new Image();
background.src = "../static/images/BASE-MAP.png";

background.onload = () => {
    GAME.background = background;
}

function initEventsListeners() {
    window.addEventListener("mousedown", onCanvasMouseDown);
}

function onCanvasMouseDown(event) {
}

function drawBackground() {
    if (GAME.background) {
        canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height)
    }
}

function play() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    let notdeadmonsters = monsters.filter(value => value.hp > 0);
    monsters = notdeadmonsters;
    for (var monster of monsters) {
        drawMonster(monster);
    }
    for (var monster of monsters) {
        updateMonster(monster);
    }
    if (mobamount > 0){
        starttime += 2
        if (starttime > 100){
            addMonster(pa, lvl1);
            starttime = 0;
            mobamount -= 1;
    }
    }
    requestAnimationFrame(play);
}


initEventsListeners();
play();