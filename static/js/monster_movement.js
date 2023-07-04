var sf = {
    hp: monster1.hp,
    speed: monster1.speed,
    cost: monster1.cost,
    width: monster1.width,
    height: monster1.height,
    color: monster1.color,
    x: lvl1.start_x,
    y: lvl1.start_y,
    dir: lvl1.start_dir
}

var pa = {
    hp: monster2.hp,
    speed: monster2.speed,
    cost: monster2.cost,
    width: monster2.width,
    height: monster2.height,
    color: monster2.color,
    x: lvl1.start_x - 50,
    y: lvl1.start_y,
    dir: lvl1.start_dir
}

function drawMonster(monster) {
    canvasContext.fillStyle = "rgba(0, 0, 0, 0)";
    canvasContext.fillRect(0, 0, 1000, 1000);
    canvasContext.fillStyle = monster.color;
    canvasContext.fillRect(monster.x, monster.y - monster.height/2, monster.width, monster.height);
    // canvasContext.fill();
    monsterMove(monster);
}

function monsterMove(monster) {
    switch(monster.dir) {
        case 'r': 
            monster.x += monster.speed;
            break;
        case 'u':
            monster.y -= monster.speed;
            break;
        case 'l':
            monster.x -= monster.speed;
            break;
        case 'd':
            monster.y += monster.speed;
            break;
    }
}

function canvasToGrid(x, y) {
    let temp = Math.floor(y / 100) * 16 + Math.floor(x / 100) + 1;
    return temp;
}

function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}

function monsterCorrect(lvl, monster) {
    switch(monster.dir) {
        case 'r':
            if(!contains(lvl.road, canvasToGrid(monster.x + monster.width/2 + 100, monster.y))) {
                if(contains(lvl.road, canvasToGrid(monster.x, monster.y - 110))) {
                    console.log('клетка:', canvasToGrid(monster.x + monster.width/2 + 100, monster.y));
                    monster.dir = 'u';
                } else {
                    monster.dir = 'd';
                }
            }
            break;
        case 'u':
            if(!contains(lvl.road, canvasToGrid(monster.x, monster.y + monster.height/2 - 100))) {
                if(contains(lvl.road, canvasToGrid(monster.x - 110, monster.y))) {
                    monster.dir = 'l';
                } else {
                    monster.dir = 'r';
                }
            }
            break;
        case 'l':
            if(!contains(lvl.road,canvasToGrid(monster.x, monster.y))) {
                if(contains(lvl.road, canvasToGrid(monster.x + 110, monster.y + 110))) {
                    monster.dir = 'u';
                } else {
                    monster.dir = 'd';
                }
            }
            break;
        case 'd':
            if(!contains(lvl.road, canvasToGrid(monster.x, monster.y + monster.height))) {
                if(contains(lvl.road, canvasToGrid(monster.x - 110, monster.y))) {
                    monster.dir = 'l';
                } else {
                    monster.dir = 'r';
                }
            }
            break;
    }
    
}
