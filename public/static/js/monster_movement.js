var monsters = [];
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
        maxhp: monster.maxhp,
        finish: false,
        delete: false,
        x: lvl.start_x,
        y: lvl.start_y,
        dir: lvl.start_dir
    })
}

function drawMonster(monster) {
    canvasContext.fillStyle = monster.color;
    canvasContext.fillRect(monster.x, monster.y, monster.width, monster.height);
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
    return 0;
}

function checkFinish(lvl, cell) {
    return contains(lvl.finish_cells, cell);
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
            cell = canvasToGrid(monster.x + monster.width / 2 + 101, monster.y);
            if (checkFinish(lvl, cell)) {
                monster.finish = true;
                break;
            }
            if (!contains(lvl.road, cell) && !monster.finish) {
                if (contains(lvl.road, canvasToGrid(monster.x, monster.y + monster.height / 2 - 110))) {
                    monster.dir = 'u';
                } else {
                    monster.dir = 'd';
                }
            };
            if (monster.finish && checkFinish(lvl, canvasToGrid(monster.x, monster.y))) {
                monster.hp = 0;
                monster.delete = true;
            }
            break;
        case 'u':
            cell = canvasToGrid(monster.x, monster.y + monster.height / 2 - 110);
            if (checkFinish(lvl, cell)) {
                monster.finish = true;
                break;
            }
            if (!contains(lvl.road, cell) && !monster.finish) {
                if (contains(lvl.road, canvasToGrid(monster.x + monster.width / 2 - 110, monster.y))) {
                    monster.dir = 'l';
                } else {
                    monster.dir = 'r';
                }
            }
            if (monster.finish && checkFinish(lvl, canvasToGrid(monster.x, monster.y + monster.height))) {
                monster.hp = 0;
                monster.delete = true;
            }
            break;
        case 'l':
            cell = canvasToGrid(monster.x + monster.width / 2 - 101, monster.y);
            if (checkFinish(lvl, cell)) {
                monster.finish = true;
                break;
            }
            if (!contains(lvl.road, cell) && !monster.finish) {
                if (contains(lvl.road, canvasToGrid(monster.x, monster.y + monster.height / 2 - 110))) {
                    monster.dir = 'u';
                } else {
                    monster.dir = 'd';
                }
            }
            if (monster.finish && checkFinish(lvl, canvasToGrid(monster.x + monster.width, monster.y))) {
                monster.hp = 0;
                monster.delete = true;
            }
            break;
        case 'd':
            cell = canvasToGrid(monster.x, monster.y + monster.height / 2 + 110);
            if (checkFinish(lvl, cell)) {
                monster.finish = true;
                break;
            }
            if (!contains(lvl.road, cell) && !monster.finish) {
                if (contains(lvl.road, canvasToGrid(monster.x + monster.width / 2 - 110, monster.y))) {
                    monster.dir = 'l';
                } else {
                    monster.dir = 'r';
                }
            }
            if (monster.finish && checkFinish(lvl, canvasToGrid(monster.x, monster.y))) {
                monster.hp = 0;
                monster.delete = true;
            }
            break;
    }

}

function addMonster() {
    monsters.push(lvl.monsters[monstercount]);
    monstercount += 1;
    mobamount -= 1;
}

function registerCollision(monster, GAME) {
    if (monster.hp <= 0 && monster.delete) {
        let bar = document.getElementById("hp-bar");
        if (GAME.castleHP > 0) {
            bar.children[GAME.castleHP - 1].classList.add("_hide");
        }
        GAME.castleHP -= 1;
    }
}

function moveMonsters(GAME) {
    payForMonsters();
    monsters = monsters.filter(value => value.hp > 0);
    for (var monster of monsters) {
        drawMonster(monster);
        hpBar(monster);
        monsterMove(monster);
        monsterCorrect(lvl, monster);
        registerCollision(monster, GAME);
    }
    if (mobamount > 0 && (GAME.isPlay == 'popuppause' || GAME.isPlay == 'play')) {
        if (GAME.milisectimer > starttime) {
            addMonster();
            GAME.isPlay = 'play';
            starttime += 900;
        }
    }
}

function hpBar(monster) {
    var percentHP = monster.hp / monster.maxhp;
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(monster.x, monster.y - 10, monster.width, 5);
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(monster.x, monster.y - 10, monster.width * percentHP, 5);
}

function payForMonsters(monster) {
    for (var monster of monsters) {
        if (monster.hp <= 0 && !monster.finish) {
            GAME.money += monster.cost
        }
    }
}

function addMonstersToLvls() {
    pushMonsters(lvl1, monster1);
    pushMonsters(lvl1, monster1);
    pushMonsters(lvl2, monster1);
    pushMonsters(lvl2, monster1);
    pushMonsters(lvl2, monster1);
    pushMonsters(lvl2, monster1);
}

function updateScoreForMob() {
    let scoreInfo = document.querySelector(".count-score__value");
    if (monsters.length != 0) {
        for(var monster of monsters){
            if (monster.delete) {
                GAME.score -= monster.cost;
            } else {
                if (monster.hp <= 0) {
                    GAME.score += monster.cost;
                }
            }
            scoreInfo.innerHTML = String(Math.floor(GAME.score));
        }
    } 
}