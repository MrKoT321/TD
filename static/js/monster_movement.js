var monsters = [];
var notdeadmonsters = [];

var sf = monster1;
sf.x = lvl1.start_x - 50;
sf.y = lvl1.start_y;
sf.dir = lvl1.start_dir;

var pa = monster2;
pa.x = lvl1.start_x - 50;
pa.y = lvl1.start_y;
pa.dir = lvl1.start_dir;

// function updateMonster(monster){
//     monster.x += monster.speed;
// }

function drawMonster(monster) {
    canvasContext.fillStyle = "rgba(0, 0, 0, 0)";
    canvasContext.fillRect(0, 0, 1000, 1000);
    canvasContext.fillStyle = monster.color;
    canvasContext.fillRect(monster.x, monster.y - monster.height / 2, monster.width, monster.height);
}

function checkFinish(lvl, cell) {
    if(contains(lvl.finish_cells, cell)) {
        return true;
    }
    return false;
}

function monsterMove(monster) {
    switch (monster.dir) {
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
                monster.hp = 0;
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
                monster.hp = 0;
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
                monster.hp = 0;
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
                monster.hp = 0;
            }
            break;
    }

}

function addMonster(monster) {
    monsters.push({
        hp: monster.hp,
        speed: monster.speed,
        cost: monster.cost,
        width: monster.width,
        height: monster.height,
        color: monster.color,
        x: monster.x,
        y: monster.y,
        dir: monster.dir,
        finish: false
    })
}

addMonster(sf)

function moveMonsters() {
    let notdeadmonsters = monsters.filter(value => value.hp > 0);
    monsters = notdeadmonsters;
    for (var monster of monsters) {
        drawMonster(monster);
    }
    for (var monster of monsters) {
        monsterMove(monster);
        monsterCorrect(lvl, monster);
    }
    if (mobamount > 0) {
        starttime += 2
        if (starttime > 100) {
            addMonster(pa);
            starttime = 0;
            mobamount -= 1;
        }
    }
}