var GAME = {
    width: 1600,
    height: 1000,
    isPlay: false,    
}

var notdeadmonsters = []

var page = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

var starttime = 0
var mobamount = lvl1.mobamount - 1
var lvl = lvl1;
var towerTiles = [];
var towerTilesActive = [];

lvl.towers.forEach(towerPos => {
    towerTiles.push([(towerPos % 16 - 1) * 100, Math.floor(towerPos / 16) * 100])
})

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

function drawTiles() {
        towerTiles.forEach(tile => {
            if (
                mouse.x > tile[0] && mouse.x < tile[0] + 100 && mouse.y > tile[1] && mouse.y < tile[1] + 100
            ) {
                canvasContext.fillStyle = "rgba(0, 0, 0, 0.3)";
                canvasContext.fillRect(tile[0], tile[1], 100, 100);
            }
        })        
}

function MakeTower() {
    towerTiles.forEach(tile => {
        if (
            mouseClick.x > tile[0] && mouseClick.x < tile[0] + 100 && mouseClick.y > tile[1] && mouseClick.y < tile[1] + 100
        ) {
            let isBusy = false;
            towerTilesActive.forEach(activeTile => {
                if(activeTile[0] == tile[0] && activeTile[1] == tile[1]) {
                    isBusy = true;
                }
            })
            if (!isBusy){
                towerTilesActive.push([tile[0], tile[1]]);
            }
        }
    })
}

function drawTower() {
    towerTilesActive.forEach(tile => {
        canvasContext.fillStyle = "blue";
        canvasContext.fillRect(tile[0], tile[1], 100, 100);
    })
}

var mouse = {
    x: undefined,
    y: undefined
}

var mouseClick = {
    x: undefined,
    y: undefined
}

window.addEventListener(
    'mousemove',
    (event) => {
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight
        mouse.x = event.clientX - ((windowWidth - GAME.width) / 2) + 100;
        mouse.y = event.clientY - ((windowHeight - GAME.height) / 2) + 100;
    }
)

window.addEventListener (
    'click',
    (event) => {
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight
        mouseClick.x = event.clientX - ((windowWidth - GAME.width) / 2) + 100;
        mouseClick.y = event.clientY - ((windowHeight - GAME.height) / 2) + 100;
        MakeTower();
    }
)

function play() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    //for (var monster of monsters) {
        //let notdeadmonsters = monsters.filter(value => value.health > 0);
    //}
    //убираем мобов, которые умерли
    for (var monster of monsters) {//поменять monsters на notdeadmonsters
        drawMonster(monster);
    }
    for (var monster of monsters) {//поменять monsters на notdeadmonsters
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
    drawTiles();
    drawTower();
    requestAnimationFrame(play);
}

play();