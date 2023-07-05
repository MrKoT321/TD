var monsters = [];

var sf = {
    hp: monster1.hp,
    speed: monster1.speed,
    cost: monster1.cost,
    width: monster1.width,
    height: monster1.height,
    color: monster1.color,
    x: lvl1.start_x,
    y: lvl1.start_y,
    dir: lvl1.start_dir,
    finish: false
}

var pa = {
    hp: monster2.hp,
    speed: monster2.speed,
    cost: monster2.cost,
    width: monster2.width,
    height: monster2.height,
    color: monster2.color,
    x: lvl1.start_x,
    y: lvl1.start_y,
    dir: lvl1.start_dir,
    finish: false
}

// function updateMonster(monster){
//     monster.x += monster.speed;
// }

function drawMonster(monster) {
    canvasContext.fillStyle = "rgba(0, 0, 0, 0)";
    canvasContext.fillRect(0, 0, 1000, 1000);
    canvasContext.fillStyle = monster.color;
    canvasContext.fillRect(monster.x, monster.y - monster.height/2, monster.width, monster.height);
    // canvasContext.fill();
}

function checkFinish(lvl, cell) {
    if(contains(lvl.finish_cells, cell)) {
        return true;
    }
    return false;
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
    if (x < 1600 && x > 0 && y < 1000 && y > 0) {
        return Math.floor(y / 100) * 16 + Math.floor(x / 100) + 1;
    } 
    return 0
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
    let cell;
    switch(monster.dir) {
        case 'r':
            cell = canvasToGrid(monster.x + monster.width/2 + 100, monster.y);
            if(checkFinish(lvl, cell)) {
                monster.finish = true;
                break;
            }
            if(!contains(lvl.road, cell)) {
                if(contains(lvl.road, canvasToGrid(monster.x, monster.y - 110))) {
                    monster.dir = 'u';
                } else {
                    monster.dir = 'd';
                }
            };
            if(monster.finish && checkFinish(lvl, canvasToGrid(monster.x, monster.y))) {
                console.log('hp = 0')
            }
            break;
        case 'u':
            cell = canvasToGrid(monster.x, monster.y - 100);
            if(checkFinish(lvl, cell)) {
                monster.finish = true;
                break;
            }
            if(!contains(lvl.road, cell) && !monster.finish) {
                if(contains(lvl.road, canvasToGrid(monster.x - 100, monster.y))) {
                    monster.dir = 'l';
                } else {
                    monster.dir = 'r';
                }
            }
            if(monster.finish && checkFinish(lvl, canvasToGrid(monster.x, monster.y + monster.height))) {
                console.log('hp = 0')
            }
            break;
        case 'l':
            cell = canvasToGrid(monster.x - monster.width/2 - 100, monster.y);
            if(checkFinish(lvl, cell)) {
                monster.finish = true;
                break;
            }
            if(!contains(lvl.road, cell)) {
                if(contains(lvl.road, canvasToGrid(monster.x + 100, monster.y + 110))) {
                    monster.dir = 'u';
                } else {
                    monster.dir = 'd';
                }
            }
            if(monster.finish && checkFinish(lvl, canvasToGrid(monster.x + monster.width, monster.y))) {
                console.log('hp = 0')
            }
            break;
        case 'd':
            cell = canvasToGrid(monster.x, monster.y + 100);
            if(checkFinish(lvl, cell)) {
                monster.finish = true;
                break;
            }
            if(!contains(lvl.road, cell)) {
                if(contains(lvl.road, canvasToGrid(monster.x - 100, monster.y))) {
                    monster.dir = 'l';
                } else {
                    monster.dir = 'r';
                }
            }
            if(monster.finish && checkFinish(lvl, canvasToGrid(monster.x, monster.y))) {
                console.log('hp = 0')
            }
            break;
    }
    
}

function addMonster(monster, lvl){
    monsters.push ({
        hp: monster.hp,
        speed: monster.speed,
        cost: monster.cost,
        width: monster.width,
        height: monster.height,
        color: monster.color,
        x: lvl.start_x - 50,
        y: lvl.start_y,
        dir: lvl1.start_dir,
        finish: false
    })
}
addMonster(sf, lvl1)
