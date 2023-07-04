var canvas = document.getElementById("canvas");
canvas.width = 1600;
canvas.height = 1000;
var canvasContext = canvas.getContext("2d");


var monster = {
    hp: monster1.hp,
    speed: monster1.speed,
    cost: monster1.cost,
    width: monster1.width,
    height: monster1.height,
    color: monster1.color,
    x: lvl1.start_x,
    y: lvl1.start_y
}

function drawMonster(monster) {
    canvasContext.clearRect(0, 0, 1000, 1000);
    canvasContext.fillStyle = "yellow";
    canvasContext.fillRect(0, 0, 1000, 1000);
    canvasContext.fillStyle = monster.color;
    canvasContext.fillRect(monster.x, monster.y, monster.width, monster.height);
    // canvasContext.fill();
    monster.x += monster.speed;
}

function play() {
    drawMonster(monster);
    requestAnimationFrame(play);
}
play();
