var arrows = [];
var bullets = [];
var explosions = [];
var strikes = [];

function hittingRadius(tower, mstrCenterX, mstrCenterY) {
    let distance = Math.sqrt(Math.pow(mstrCenterX - tower.x - 50, 2) + Math.pow(mstrCenterY - tower.y - 50, 2));
    return (distance <= tower.radius);
}

function makeArrow(tower) {
    arrows.push({
        x: tower.x + 50,
        y: tower.y + 50,
        radius: 10,
        color: "black",
        towerCenterX: 0,
        towerCenterY: 0,
        speed: 5,
        atk: tower.atk,
        currentEnemy: monsters[tower.currentEnemy],
    })
}

function makeBullet(tower, mstrCenterX, mstrCenterY) {
    bullets.push({
        x: tower.x + 50,
        y: tower.y + 50,
        radius: 20,
        blastRadius: 90,
        init: true,
        color: "black",
        radiusColor: "red",
        acceleration: 2,
        finishX: mstrCenterX,
        finishY: mstrCenterY,
        speedX: 0,
        speedY: 0,
        atk: tower.atk,
    });
}

function makeStrike(tower) {
    strikes.push({
        x: tower.x + 50,
        y: tower.y + 50,
        color: "black",
        atk: tower.atk,
        speed: 5,
        radius: 0,
        maxRadius: tower.radius,
        thickness: 30,
    })
}

function drawArrows() {
    arrows.forEach(flyingArrow => {
        canvasContext.fillStyle = flyingArrow.color;
        canvasContext.beginPath();
        canvasContext.arc(flyingArrow.x, flyingArrow.y, flyingArrow.radius, 0, 2 * Math.PI);
        canvasContext.closePath();
        canvasContext.fill();
    })
}

function updateArrows() {
    for (var i = 0; i < arrows.length; i++) {
        let flyingArrow = arrows[i];
        if (flyingArrow.currentEnemy && flyingArrow.currentEnemy.hp > 0) {
            let mstrCenterX = flyingArrow.currentEnemy.x + flyingArrow.currentEnemy.width / 2;
            let mstrCenterY = flyingArrow.currentEnemy.y + flyingArrow.currentEnemy.height / 2;
            let outMonsterX = flyingArrow.x < flyingArrow.currentEnemy.x || flyingArrow.x > flyingArrow.currentEnemy.x + flyingArrow.currentEnemy.width;
            let outMonsterY = flyingArrow.y < flyingArrow.currentEnemy.y || flyingArrow.y > flyingArrow.currentEnemy.y + flyingArrow.currentEnemy.height;
            if (outMonsterX || outMonsterY) {
                if (outMonsterX) {
                    if (flyingArrow.x >= mstrCenterX) {
                        flyingArrow.x -= flyingArrow.speed;
                    } else {
                        flyingArrow.x += flyingArrow.speed;
                    }
                } else {
                    if (flyingArrow.x >= mstrCenterX) {
                        flyingArrow.x -= flyingArrow.currentEnemy.speed;
                    } else {
                        flyingArrow.x += flyingArrow.currentEnemy.speed;
                    }
                }
                if (outMonsterY) {
                    if (flyingArrow.y >= mstrCenterY) {
                        flyingArrow.y -= flyingArrow.speed;
                    } else {
                        flyingArrow.y += flyingArrow.speed;
                    }
                } else {
                    if (flyingArrow.y >= mstrCenterY) {
                        flyingArrow.y -= flyingArrow.currentEnemy.speed;
                    } else {
                        flyingArrow.y += flyingArrow.currentEnemy.speed;
                    }
                }
            } else {
                if(flyingArrow.currentEnemy.shield > 0){
                    flyingArrow.currentEnemy.shield -= flyingArrow.atk;
                } else {
                    flyingArrow.currentEnemy.hp -= flyingArrow.atk;
                }
                arrows.splice(i, 1);
            }
        } else {
            arrows.splice(i, 1);
        }
    }
}

function attackArcher(GAME) {
    towers.forEach(tower => {
        if (tower.type == "arrow") {
            tower.currentEnemy = -1;
            for (let i = 0; i < monsters.length; i++) {
                let mstrCenterX = monsters[i].x + monsters[i].width / 2;
                let mstrCenterY = monsters[i].y + monsters[i].height / 2;
                if (hittingRadius(tower, mstrCenterX, mstrCenterY)) {
                    tower.currentEnemy = i;
                    if (tower.startTime <= 0) {
                        tower.startTime = GAME.stopwatch;
                    }
                    break;
                }
            }
            if (tower.currentEnemy == -1) {
                tower.startTime = 0;
            } else {
                if (!((GAME.stopwatch - tower.startTime) % tower.atkspeed == 0)) {
                    tower.hit = false;
                }
                if (!tower.hit && (GAME.stopwatch - tower.startTime) % tower.atkspeed == 0) {
                    tower.hit = true;
                    makeArrow(tower);
                }
            }
        }
    });
}

function drawBullets() {
    bullets.forEach(flyingBullet => {
        canvasContext.fillStyle = flyingBullet.color;
        canvasContext.beginPath();
        canvasContext.arc(flyingBullet.x, flyingBullet.y, flyingBullet.radius, 0, 2 * Math.PI);
        canvasContext.closePath();
        canvasContext.fill();

        canvasContext.beginPath();
        canvasContext.strokeStyle = flyingBullet.radiusColor;
        canvasContext.lineWidth = 2;
        canvasContext.arc(flyingBullet.x, flyingBullet.y, flyingBullet.blastRadius, 0, 2 * Math.PI);
        canvasContext.stroke();
        canvasContext.closePath();
    })
}

function makeExplosion(bullet){
    console.log('make')
    explosions.push({
        x: bullet.finishX,
        y: bullet.finishY,
        explosionRadius: bullet.blastRadius,
        speed: 7,
        thickness: 30,
        radius: 0,
        color: "red",
        atk: mortir.atk
    })
}

function updateBullets() {
    const t = 30;
    for (var i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        if (bullet.init) {
            bullet.init = false;
            bullet.speedX = (bullet.finishX - bullet.x) / t;
            bullet.speedY = (2 * (bullet.finishY - bullet.y) - bullet.acceleration * Math.pow(t, 2)) / (2 * t);
        } else {
            bullet.x += bullet.speedX;
            bullet.y += bullet.speedY;
            bullet.speedY += bullet.acceleration;
            if (bullet.speedY > 0 && bullet.y > bullet.finishY) {
                makeExplosion(bullet);
                bullets.splice(i, 1);
            }
        }
    }
}

function attackMortir(GAME) {
    towers.forEach(tower => {
        if (tower.type == "splash") {
            let mstrCenterX, mstrCenterY;
            tower.currentEnemy = -1
            for (let i = 0; i < monsters.length; i++) {
                if(monsters[i].dir == 'r'){
                    mstrCenterX = monsters[i].x + monsters[i].width;
                    mstrCenterY = monsters[i].y + monsters[i].height / 2; 
                }
                if(monsters[i].dir == 'l'){
                    mstrCenterX = monsters[i].x - monsters[i].width;
                    mstrCenterY = monsters[i].y + monsters[i].height / 2; 
                }
                if(monsters[i].dir == 'u'){
                    mstrCenterX = monsters[i].x + monsters[i].width / 2;
                    mstrCenterY = monsters[i].y; 
                }
                if(monsters[i].dir == 'd'){
                    mstrCenterX = monsters[i].x + monsters[i].width / 2;
                    mstrCenterY = monsters[i].y + monsters[i].height; 
                }
                if (hittingRadius(tower, mstrCenterX, mstrCenterY) && monsters[i].type != "flying") {
                    tower.currentEnemy = i;
                    if (tower.startTime <= 0) {
                        tower.startTime = GAME.stopwatch;
                    }
                    break;
                }
            }
            if (tower.currentEnemy == -1) {
                tower.startTime = 0;
            } else {
                if (!((GAME.stopwatch - tower.startTime) % tower.atkspeed == 0)) {
                    tower.hit = false;
                }
                if ((GAME.stopwatch - tower.startTime) % tower.atkspeed == 0 && !tower.hit) {
                    tower.hit = true;
                    makeBullet(tower, mstrCenterX, mstrCenterY);
                }
            }
        }
    });
}

function drawExplosion(){
    explosions.forEach(explosion => {
        canvasContext.beginPath();
        canvasContext.strokeStyle = explosion.color;
        canvasContext.lineWidth = explosion.thickness;
        canvasContext.arc(explosion.x, explosion.y, explosion.radius, 0, 2 * Math.PI);
        canvasContext.stroke();
        canvasContext.closePath();
    })
}

function updateExplosions() {
    for(var i = 0; i < explosions.length; i++) {
        explosions[i].radius += explosions[i].speed;
        explosions[i].thickness -= explosions[i].speed / 10;
        monsters.forEach(monster => {
            var distance = Math.sqrt(Math.pow(monster.x + (monster.width / 2) - explosions[i].x, 2) + Math.pow(monster.y + (monster.height / 2) - explosions[i].y, 2));
            if(distance <= explosions[i].radius && monster.type != "flying" && !monster.hit) {
                if(monster.shield > 0){
                    monster.shield -= explosions[i].atk;
                } else {
                    monster.hp -= explosions[i].atk;
                }
                monster.hit = true;
            }
        });
        if(explosions[i].radius >= explosions[i].explosionRadius) {
            explosions.splice(i, 1);
            monsters.forEach(monster => {
                monster.hit = false;
            })
        }
    }
}

function drawStrikes() {
    strikes.forEach(strike => {
        canvasContext.beginPath();
        canvasContext.strokeStyle = strike.color;
        canvasContext.lineWidth = strike.thickness;
        canvasContext.arc(strike.x, strike.y, strike.radius, 0, 2 * Math.PI);
        canvasContext.stroke();
        canvasContext.closePath();
    });
}

function updateStrikes() {
    for(var i=0; i < strikes.length; i++) {
        strikes[i].radius += strikes[i].speed;
        strikes[i].thickness -= strikes[i].speed / 10;
        monsters.forEach(monster => {
            var distance = Math.sqrt(Math.pow(monster.x + (monster.width / 2) - strikes[i].x, 2) + Math.pow(monster.y + (monster.height / 2) - strikes[i].y, 2));
            if(distance <= strikes[i].radius && monster.type != "flying" && !monster.hit) {
                if(monster.shield > 0){
                    monster.shield -= strikes[i].atk;
                } else {
                    monster.hp -= strikes[i].atk;
                }
                monster.hit = true;
            }
        });
        if(strikes[i].radius >= strikes[i].maxRadius) {
            strikes.splice(i, 1);
            monsters.forEach(monster => {
                monster.hit = false;
            })
        }
    }
}

function checkStrikes(tower) {
    var ex = false;
    strikes.forEach(strike => {
        if(strike.x == (tower.x + 50) && strike.y == (tower.y + 50)) {
            ex = true;
        }
    })
    return ex;
}

function attackBash() {
    towers.forEach(tower => {
        if (tower.type == "bash") {
            monsters.forEach(monster => {
                lineToMonster = Math.sqrt(Math.pow(monster.x + (monster.width / 2) - tower.x - 50, 2) + Math.pow(monster.y + (monster.height / 2) - tower.y - 50, 2));
                if (lineToMonster <= tower.radius && (GAME.stopwatch - tower.placeTime + 1) % tower.atkspeed == 0 && !tower.hit && monster.type != "flying" && !checkStrikes(tower)) {
                    makeStrike(tower);
                }
                if (!((GAME.stopwatch - tower.placeTime + 1) % tower.atkspeed == 0)) {
                    tower.hit = false;
                }
            })
            if (!tower.hit && (GAME.stopwatch - tower.placeTime + 1) % tower.atkspeed == 0) {
                tower.hit = true;
            }
        }
    })
}

function attackTowers(GAME) {
    attackArcher(GAME);
    attackBash(GAME);
    attackMortir(GAME);
}