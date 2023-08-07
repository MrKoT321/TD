var monsters = [];
var monstersSpawnIndex = 0
var monstercount = 0;
var pushmonstercount = 0;
var steptimer = 0;
var steptimertank = 0;
var stepcounter = 1;
var stepcountertank = 1;
var pushmobs = 0;
var deathmonsters = [];

function pushMonsters(GAME, lvl, monster) {
    monsters.push({
        hp: monster.hp,
        speed: monster.speed,
        cost: monster.cost,
        width: monster.width,
        height: monster.height,
        type: monster.type,
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
        dir: lvl.start_dir,
        shield: monster.shield,
        bornTime: GAME.stopwatch,
        baseTime: monster.baseTime,
        hit: false,
        name: monster.name,
        maxShield: monster.maxShield,
        distance: 0,
        invisibleScale: 1,
        index: monstersSpawnIndex,
        invisiblePriority: monster.invisiblePriority,
    })
    if (monster.name == 'monster5') {
        monsters[pushmonstercount].giveShield = monster.giveShield
    } else {
        if (pushmonstercount < monsters.length) {
            monsters[pushmonstercount].countShield = monster.countShield;
        }
    }
    if (lvl.start_x < 0 || lvl.start_x > 1600) {
        monsters[pushmonstercount].x = lvl.start_x;
        monsters[pushmonstercount].y = lvl.start_y - monster.height / 2;
    } else {
        monsters[pushmonstercount].y = lvl.start_y;
        monsters[pushmonstercount].x = lvl.start_x - monster.width / 2;
    }
    pushmonstercount += 1;
    monstersSpawnIndex += 1;
}

function drawMonster(monster) {
    if (monster.image) {
        if (monster.invisible) {
            canvasContext.globalAlpha = monster.invisibleScale;
            if (GAME.stopwatch - monster.invisibleStartTime < Math.floor(lvl.invisible_max_time / 5) && monster.invisibleScale > 0.2) {
                monster.invisibleScale -= 0.05;
            }
            if (GAME.stopwatch - monster.invisibleStartTime > Math.floor(lvl.invisible_max_time - lvl.invisible_max_time / 5) && monster.invisibleScale < 1) {
                monster.invisibleScale += 0.05;
            }
        }
        canvasContext.drawImage(monster.image, monster.x, monster.y, monster.width, monster.height);
        canvasContext.globalAlpha = 1;
    }
}

function drawDeath() {
    for (let deathmob of deathmonsters) {
        canvasContext.drawImage(deathmob.image, deathmob.x, deathmob.y);
    }
}

function addShield(monster) {
    if (monster.name == 'monster5') {
        let monsterCenterX = monster.x + monster.width / 2;
        let monsterCenterY = monster.y + monster.height / 2;
        for (mob of monsters) {
            if (mob.name != 'monster5') {
                let mobCenterX = mob.x + mob.width / 2;
                let mobCenterY = mob.y + mob.height / 2;
                if (Math.sqrt(Math.pow(mobCenterX - monsterCenterX, 2) + Math.pow(monsterCenterY - mobCenterY, 2)) <= 300) {
                    if (mob.countShield == 0) {
                        mob.shield = monster.giveShield;
                        mob.countShield += 1;
                    }
                } else {
                    mob.shield = 0
                }
            }
        }
    }
}

function drawShield(monster) {
    if (monster.shield > 0) {
        canvasContext.beginPath();
        canvasContext.strokeStyle = "#0C90DB"
        canvasContext.lineWidth = 1;
        let monsterCenterX = monster.x + monster.width / 2;
        let monsterCenterY = monster.y + monster.height / 2;
        canvasContext.arc(monsterCenterX, monsterCenterY, Math.sqrt(monster.width * monster.width + monster.height * monster.height) / 2, 0, 2 * Math.PI);
        canvasContext.stroke();
        let gradient = canvasContext.createRadialGradient(monsterCenterX, monsterCenterY, monster.width / 3, monsterCenterX, monsterCenterY, Math.sqrt(monster.width * monster.width + monster.height * monster.height) / 2);
        gradient.addColorStop("0", "#01E1FF");
        gradient.addColorStop("1", "#0C90DB");
        canvasContext.fillStyle = gradient;

        canvasContext.fill();
        canvasContext.stroke();
        canvasContext.closePath();
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
    monster.distance += speed;
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
    if (lvls[GAME.lvlCount - 1].waves[GAME.wave - 1].length > pushmobs) {
        pushMonsters(GAME, lvls[GAME.lvlCount - 1], lvls[GAME.lvlCount - 1].waves[GAME.wave - 1][pushmonstercount]);
        pushmobs += 1;
    }
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

function deleteShield(monsters) {
    for (let monster of monsters) {
        if (monster.name == 'monster5' && monster.hp <= 0) {
            for (let mob of monsters) {
                mob.shield = 0;
            }
        }
    }
}

function clearInvisible(monster) {
    if (monster.invisible && GAME.stopwatch - monster.invisibleStartTime > lvl.invisible_max_time) {
        monster.invisible = false;
    }
}

function death() {
    for (let deathmob of deathmonsters) {
        if (GAME.milisectimer == 0) {
            deathmob.deathtime = -400
        }
        if (GAME.milisectimer - 200 >= deathmob.deathtime) {
            deathmob.image = death2;
        }
        if (GAME.milisectimer - 400 >= deathmob.deathtime) {
            deathmonsters = deathmonsters.filter(value => value.image = value.death2)
        }
    }
}

function moveMonsters(GAME, lvls) {
    deleteShield(monsters);
    if (monsters.length > monsters.filter(value => value.hp > 0).length) {
        for (let monster of monsters) {
            if (monster.hp <= 0) {
                monster.image = death1;
                monster.deathtime = GAME.milisectimer
                deathmonsters.push(monster);
            }
        }
        monstercount -= monsters.length - monsters.filter(value => value.hp > 0).length;
        pushmonstercount -= monsters.length - monsters.filter(value => value.hp > 0).length;
        monsters = monsters.filter(value => value.hp > 0);
    }
    death();
    drawDeath();
    updateMonstersStep();
    monsters.sort(function (mstrA, mstrB) {
        if (mstrA.index > mstrB.index) {
            return 1;
        }
        if (mstrA.index < mstrB.index) {
            return -1;
        }
        return 0
    })
    for (var monster of monsters) {
        clearInvisible(monster);
        addShield(monster);
        drawShield(monster);
        drawMonster(monster);
        shieldBar(monster);
        hpBar(monster);
        monsterMove(monster);
        monsterCorrect(lvl, monster);
        registerCollision(monster, GAME);
    }
    if (monstercount < lvls[GAME.lvlCount - 1].waves[GAME.wave - 1].length && (GAME.isPlay == 'popuppause' || GAME.isPlay == 'play')) {
        if (GAME.milisectimer > starttime) {
            addMonster(GAME, lvls);
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

function shieldBar(monster) {
    if (monster.shield > 0) {
        var percentShield = monster.shield / monster.maxShield;
        canvasContext.fillStyle = "grey";
        canvasContext.fillRect(monster.x, monster.y - 20, monster.width, 5);
        canvasContext.fillStyle = "blue";
        canvasContext.fillRect(monster.x, monster.y - 20, monster.width * percentShield, 5);
    }
}

function payForMonstersDef() {
    for (let monster of monsters) {
        if (monster.hp <= 0 && !monster.finish) {
            GAME.money += monster.cost / 2
        }
    }
}

function updateScoreForMobDef() {
    if (monsters.length != 0 && GAME.isPlay != 'popuppause') {
        for (var monster of monsters) {
            if (monster.delete) {
                GAME.score -= monster.cost;
            } else {
                if (monster.hp <= 0) {
                    GAME.score += monster.cost - Math.floor(monster.cost * (monster.distance / lvl.road_length));
                }
            }
        }
    }
}
function updateMobDataDef() {
    payForMonstersDef();
    updateScoreForMobDef();
}

function updateMobDataAtk() {
    for (var monster of monsters) {
        if (monster.hp <= 0) {
            if (monster.finish) {
                GAME.money += Math.floor(monster.cost / 2);
            } else {
                GAME.money += Math.floor(monster.cost / 4);
            }
            GAME.score += monster.cost - Math.floor(monster.cost * (monster.distance / lvl.road_length))
        }
    }
}

function setStepCounter() {
    let timeInterval = GAME.milisectimer % 800;
    if (timeInterval < 200) {
        stepcounter = 1;
        return
    }
    if (timeInterval < 400) {
        stepcounter = 2;
        return
    }
    if (timeInterval < 600) {
        stepcounter = 3;
        return
    }
    if (timeInterval < 800) {
        stepcounter = 4;
    }
}

function setStepCounterTank() {
    let timeInterval = GAME.milisectimer % 600;
    if (timeInterval < 200) {
        stepcountertank = 1;
        return
    }
    if (timeInterval < 400) {
        stepcountertank = 2;
        return
    }
    if (timeInterval < 600) {
        stepcountertank = 3;
    }
}

function updateMonstersStep() {
    if (GAME.milisectimer > steptimer) {
        setStepCounter();
        setStepCounterTank();
        for (let monster of monsters) {
            if (monster.name != 'monster4') {
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
            } else {
                if (monster.dir == 'r' || monster.dir == 'u') {
                    if (stepcountertank == 1) {
                        monster.image = monster.step1
                    }
                    if (stepcountertank == 2) {
                        monster.image = monster.step2
                    }
                    if (stepcountertank == 3) {
                        monster.image = monster.step3
                    }
                } else {
                    if (stepcountertank == 1) {
                        monster.image = monster.step1_rev
                    }
                    if (stepcountertank == 2) {
                        monster.image = monster.step2_rev
                    }
                    if (stepcountertank == 3) {
                        monster.image = monster.step3_rev
                    }
                }
            }
        }
        steptimer += 200;
        // stepcounter += 1;
        steptimertank += 200;
        // stepcountertank += 1;
        // if (steptimer % 800 == 0) {
        //     stepcounter = 1
        // }
        // if (steptimertank % 600 == 0) {
        //     stepcountertank = 1
        // }
    }
}
