var monsters = [];
var monstercount = 0;
var pushmonstercount = 0;
var steptimer = 0;
var stepcounter = 1;

function pushMonsters(lvl, monster) {
    monsters.push({
        hp: monster.hp,
        speed: monster.speed,
        cost: monster.cost,
        width: monster.width,
        height: monster.height,
        step1: monster.step1,
        step2: monster.step2,
        step3: monster.step3,
        step4: monster.step4,
        step1_rev: monster.step1_rev,
        step2_rev: monster.step2_rev,
        step3_rev: monster.step3_rev,
        step4_rev: monster.step4_rev,
        image: monster.step1,
        maxhp: monster.maxhp,
        finish: false,
        delete: false,
        x: lvl.start_x,
        y: lvl.start_y - monster.height / 2,
        dir: lvl.start_dir
    })
    if (lvl.start_x < 0 || lvl.start_x > 1600) {
        monsters[pushmonstercount].x = lvl.start_x;
        monsters[pushmonstercount].y = lvl.start_y - monster.height / 2;
    } else {
        monsters[pushmonstercount].y = lvl.start_y;
        monsters[pushmonstercount].x = lvl.start_x - monster.width / 2;
    }
    pushmonstercount += 1;
}

function drawMonster(monster) {
    if (monster.image) {
        canvasContext.drawImage(monster.image, monster.x, monster.y, monster.width, monster.height);
    }
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

function addMonster(GAME, lvls) {
    pushMonsters(lvls[GAME.lvlCount - 1], lvls[GAME.lvlCount - 1].waves[GAME.wave - 1][monstercount]);
    monstercount += 1;
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

function moveMonsters(GAME, lvls) {
    payForMonsters();
    updateScoreForMob();
    monsters = monsters.filter(value => value.hp > 0);
    updateMonstersStep();
    for (var monster of monsters) {
        drawMonster(monster);
        hpBar(monster);
        monsterMove(monster);
        monsterCorrect(lvl, monster);
        registerCollision(monster, GAME);
    }
    if (monstercount < lvls[GAME.lvlCount - 1].waves[GAME.wave - 1].length && (GAME.isPlay == 'popuppause' || GAME.isPlay == 'play')) {
        if (GAME.milisectimer > starttime) {
            addMonster(GAME, lvls);
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

function updateScoreForMob() {
    if (monsters.length != 0 && GAME.isPlay != 'popuppause') {
        for (var monster of monsters) {
            if (monster.delete) {
                GAME.score -= monster.cost;
            } else {
                if (monster.hp <= 0) {
                    GAME.score += monster.cost;
                }
            }
        }
    }
}

function updateMonstersStep() {
    if (GAME.milisectimer > steptimer) {
        for (let monster of monsters) {
            if (monster.dir == 'r' || monster.dir == 'u') {
                if (stepcounter == 1) {
                    monster.image = monster.step1
                }
                if (stepcounter == 2) {
                    monster.image = monster.step2
                }
                if (stepcounter == 3) {
                    monster.image = monster.step3
                }
                if (stepcounter == 4) {
                    monster.image = monster.step4
                }
            } else {
                if (stepcounter == 1) {
                    monster.image = monster.step1_rev
                }
                if (stepcounter == 2) {
                    monster.image = monster.step2_rev
                }
                if (stepcounter == 3) {
                    monster.image = monster.step3_rev
                }
                if (stepcounter == 4) {
                    monster.image = monster.step4_rev
                }
            }
        }
        steptimer += 200;
        stepcounter += 1;
    }
    if (steptimer % 800 == 0) {
        stepcounter = 1
    }
}