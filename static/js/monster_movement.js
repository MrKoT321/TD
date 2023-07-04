var sf = {
    hp: monster1.hp,
    speed: monster1.speed,
    cost: monster1.cost,
    width: monster1.width,
    height: monster1.height,
    color: monster1.color,
    x: lvl1.start_x,
    y: lvl1.start_y
}

var pa = {
    hp: monster2.hp,
    speed: monster2.speed,
    cost: monster2.cost,
    width: monster2.width,
    height: monster2.height,
    color: monster2.color,
    x: lvl1.start_x,
    y: lvl1.start_y
}

function drawMonster(monster) {
    canvasContext.fillStyle = "rgba(0, 0, 0, 0)";
    canvasContext.fillRect(0, 0, 1000, 1000);
    canvasContext.fillStyle = monster.color;
    canvasContext.fillRect(monster.x, monster.y - monster.height/2, monster.width, monster.height);
    // canvasContext.fill();
    monster.x += monster.speed;
}
