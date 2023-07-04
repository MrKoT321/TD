// объект игры
var GAME = {
    width: 1600,
    height: 1000,
    isPlay: false,             // состояние игры идет или нет
}


var monsters = [{x: lvl1.start_x, y: start_y}, {x: 0, y: 0}]

var page = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var ctx = canvas.getContext("2d");

function drawMonster() {
    ctx.fillStyle = monster1.color;
    ctx.fillRect(monsters[0].x, monsters[0].y, )
}

function drawFrame() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawMonster();
}

function update() {
    
}

function play() {
    drawFrame();
    update();
    requestAnimationFrame(play);
}

play();