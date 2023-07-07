var monsters = [];
var notdeadmonsters = [];
var monstercount = 0;

// function updateMonster(monster){
//     monster.x += monster.speed;
// }

function pushMonsters(lvl, monster) {  
    (lvl.monsters).push({
        hp: monster.hp,
        speed: monster.speed,
        cost: monster.cost,
        width: monster.width,
        height: monster.height,
        color: monster.color,
        x: monster.x,
        y: monster.y,
        dir: monster.dir,
        maxhp: monster.maxhp,
        finish: false,
        x: lvl.start_x,
        y: lvl.start_y,
        dir: lvl.start_dir
    })
}

pushMonsters(lvl1, monster1)
pushMonsters(lvl1, monster1)

pushMonsters(lvl2, monster1)
pushMonsters(lvl2, monster1)
pushMonsters(lvl2, monster1)
pushMonsters(lvl2, monster1)

function drawMonster(monster) {
    canvasContext.fillStyle = monster.color;
    canvasContext.fillRect(monster.x, monster.y - monster.height / 2, monster.width, monster.height);
}

function checkFinish(lvl, cell) {   // FIXME
    if (contains(lvl.finish_cells, cell)) {
        return true;
    }
    return false;
}

function monsterMove(monster) {
    var speed = monster.speed
    if (GAME.isPlay == 'play' || GAME.isPlay == 'popuppause') {
        speed = monster.speed
    } else {
        speed = 0
    }
    switch (monster.dir) {
        case 'r':
            monster.x += speed;
            break;
        case 'u':
            monster.y -= speed;
            break;
        case 'l':
            monster.x -= speed;
            break;
        case 'd':
            monster.y += speed;
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
    switch (monster.dir) {
        case 'r':
            cell = canvasToGrid(monster.x + monster.width / 2 + 100, monster.y);
            if (checkFinish(lvl, cell)) {
                monster.finish = true;
                break;
            }
            if (!contains(lvl.road, cell)) {
                if (contains(lvl.road, canvasToGrid(monster.x, monster.y - 110))) {
                    monster.dir = 'u';
                } else {
                    monster.dir = 'd';
                }
            };
            if (monster.finish && checkFinish(lvl, canvasToGrid(monster.x, monster.y))) {
                monster.hp = 0;
            }
            break;
        case 'u':
            cell = canvasToGrid(monster.x, monster.y - 100);
            if (checkFinish(lvl, cell)) {
                monster.finish = true;
                break;
            }
            if (!contains(lvl.road, cell) && !monster.finish) {
                if (contains(lvl.road, canvasToGrid(monster.x - 100, monster.y))) {
                    monster.dir = 'l';
                } else {
                    monster.dir = 'r';
                }
            }
            if (monster.finish && checkFinish(lvl, canvasToGrid(monster.x, monster.y + monster.height))) {
                monster.hp = 0;
            }
            break;
        case 'l':
            cell = canvasToGrid(monster.x + monster.width/2 - 100, monster.y);
            if(checkFinish(lvl, cell)) {
                monster.finish = true;
                break;
            }
            if(!contains(lvl.road, cell)) {
                if(contains(lvl.road, canvasToGrid(monster.x, monster.y - monster.height/2 - 100))) {
                    monster.dir = 'u';
                } else {
                    monster.dir = 'd';
                }
            }
            if (monster.finish && checkFinish(lvl, canvasToGrid(monster.x + monster.width, monster.y))) {
                monster.hp = 0;
            }
            break;
        case 'd':
            cell = canvasToGrid(monster.x, monster.y + 100);
            if (checkFinish(lvl, cell)) {
                monster.finish = true;
                break;
            }
            if (!contains(lvl.road, cell)) {
                if (contains(lvl.road, canvasToGrid(monster.x - 100, monster.y))) {
                    monster.dir = 'l';
                } else {
                    monster.dir = 'r';
                }
            }
            if (monster.finish && checkFinish(lvl, canvasToGrid(monster.x, monster.y))) {
                monster.hp = 0;
            }
            break;
    }

}

function addMonster() {
    monsters.push(lvl.monsters[monstercount])
}

function registerCollision(monster, GAME) {
    if (monster.hp == 0 && monster.finish == true) {
        let bar = document.getElementById("hp-bar");
        if (GAME.castleHP > 0) {
            bar.children[GAME.castleHP - 1].classList.add("_hide");
        }
        GAME.castleHP -= 1;
        monster.hp -= 1;
    }
}

function moveMonsters(GAME) {
    let notdeadmonsters = monsters.filter(value => value.hp > 0);
    monsters = notdeadmonsters;
    for (var monster of monsters) {
        drawMonster(monster);

        hpBar(monster);
    }
    for (var monster of monsters) {
        monsterMove(monster);

        monsterCorrect(lvl, monster);
        registerCollision(monster, GAME);
    }
    if (mobamount > 0 && (GAME.isPlay == 'popuppause' || GAME.isPlay == 'play' || GAME.isPlay == 'startgame')) {
        starttime += 2
        if (starttime >= 100) {
            addMonster();
            GAME.isPlay = 'play'
            monstercount += 1;
            starttime = 0;
            mobamount -= 1;
        }
    }
}

function hpBar(monster) {
    var percentHP = monster.hp / monster.maxhp;
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(monster.x, monster.y - monster.height/2 - 10, monster.width, 5);
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(monster.x, monster.y - monster.height/2 - 10, monster.width * percentHP, 5);
    // canvasContext.strokeStyle = "black";
    // canvasContext.strokeRect(monster.x, monster.y - monster.height/2 - 10, monster.width, 5);
}