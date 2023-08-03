var arrows = [];
var bullets = [];
var explosions = [];
var strikes = [];

var strikeAnimationSteps = [];

const frameTimeElectric = 100;
const frameTimeExplosion = 70;

const arrowImg = new Image();
var arrowLoadImg;
arrowImg.src = '../static/images/arrow.png';

const bulletImg = new Image();
var bulletLoadImg;
bulletImg.src = '../static/images/bullet.png';

const strike1 = new Image();
const strike2 = new Image();
const strike3 = new Image();
const strike4 = new Image();
const strike5 = new Image();
strike1.src = '../static/images/strike1.png';
strike2.src = '../static/images/strike2.png';
strike3.src = '../static/images/strike3.png';
strike4.src = '../static/images/strike4.png';
strike5.src = '../static/images/strike5.png';

arrowImg.onload = () => {
    arrowLoadImg = arrowImg;
}

bulletImg.onload = () => {
    bulletLoadImg = bulletImg;
}

strike1.onload = () => { strikeAnimationSteps.push({ index: 1, img: strike1, imgSize: 415 }, { index: 5, img: strike1, imgSize: 415 }) }
strike2.onload = () => { strikeAnimationSteps.push({ index: 2, img: strike2, imgSize: 415 }, { index: 8, img: strike2, imgSize: 415 }) }
strike3.onload = () => { strikeAnimationSteps.push({ index: 3, img: strike3, imgSize: 415 }, { index: 7, img: strike3, imgSize: 415 }) }
strike4.onload = () => { strikeAnimationSteps.push({ index: 4, img: strike4, imgSize: 415 }, { index: 6, img: strike4, imgSize: 415 }) }
strike5.onload = () => { strikeAnimationSteps.push({ index: 9, img: strike5, imgSize: 495 }) }

function hittingRadius(tower, mstrCenterX, mstrCenterY) {
    let distance = Math.sqrt(Math.pow(mstrCenterX - tower.x - 50, 2) + Math.pow(mstrCenterY - tower.y - 50, 2));
    return (distance <= tower.radius);
}

function makeArrow(tower) {
    arrows.push({
        x: tower.x + 50,
        y: tower.y + 15,
        width: 75,
        height: 75,
        color: "black",
        towerCenterX: 0,
        towerCenterY: 0,
        speed: 5,
        atk: tower.atk,
        currentEnemy: monsters[tower.currentEnemy],
        image: arrowLoadImg,
        angel: 0,
    })
}

function makeBullet(tower, mstrCenterX, mstrCenterY) {
    bullets.push({
        x: tower.x + 50,
        y: tower.y + 5,
        width: 60,
        height: 60,
        blastRadius: 90,
        init: true,
        color: "black",
        radiusColor: "red",
        acceleration: 2,
        finishX: mstrCenterX,
        finishY: mstrCenterY,
        speedX: 0,
        speedY: 0,
        image: bulletLoadImg,
        atk: tower.atk,
    });
}

function makeStrike(tower) {
    strikes.push({
        x: tower.x + 50,
        y: tower.y + 15,
        color: "black",
        atk: tower.atk,
        speed: 5,
        radius: 0,
        maxRadius: tower.radius,
        thickness: 30,
        stepcounter: 0,
        steptimer: GAME.milisectimer + frameTimeElectric,
    })
}

function drawArrows() {
    arrows.forEach(flyingArrow => {
        canvasContext.save();
        canvasContext.translate(flyingArrow.x, flyingArrow.y);
        canvasContext.rotate(flyingArrow.angel*Math.PI/180);
        canvasContext.drawImage(flyingArrow.image, -flyingArrow.width/2, -flyingArrow.height/2, flyingArrow.width, flyingArrow.height);
        canvasContext.restore();
    })
}

function drawBow(tower) {
    canvasContext.save();
    canvasContext.translate(tower.bow_x, tower.bow_y);
    canvasContext.rotate(tower.bow_angel*Math.PI/180);
    canvasContext.drawImage(tower.hit ? tower.bow_simple_image : tower.bow_loaded_image, -tower.bow_width/2, -tower.bow_height/2, tower.bow_width, tower.bow_height);
    canvasContext.restore();
}

function updateBow(tower) {
    let monster = monsters[tower.currentEnemy];
    let mstrCenterX = monster.x + monster.width / 2;
    let mstrCenterY = monster.y + monster.height / 2;
    tower.bow_angel = Math.atan(Math.abs(mstrCenterY - tower.bow_y) / Math.abs(mstrCenterX -  tower.bow_x)) * 180/Math.PI;
    if (tower.bow_x >= mstrCenterX) {
        tower.bow_angel = 180 - tower.bow_angel ;
    }
    if (tower.bow_y >= mstrCenterY) {
        tower.bow_angel = tower.bow_angel * -1;
    }
};

function updateArrows() {
    for (var i = 0; i < arrows.length; i++) {
        let flyingArrow = arrows[i];
        if (flyingArrow.currentEnemy && flyingArrow.currentEnemy.hp > 0) {
            let mstrCenterX = flyingArrow.currentEnemy.x + flyingArrow.currentEnemy.width / 2;
            let mstrCenterY = flyingArrow.currentEnemy.y + flyingArrow.currentEnemy.height / 2;
            let outMonsterX = flyingArrow.x < flyingArrow.currentEnemy.x || flyingArrow.x > flyingArrow.currentEnemy.x + flyingArrow.currentEnemy.width;
            let outMonsterY = flyingArrow.y < flyingArrow.currentEnemy.y || flyingArrow.y > flyingArrow.currentEnemy.y + flyingArrow.currentEnemy.height;
            flyingArrow.angel = Math.atan(Math.abs(mstrCenterY - flyingArrow.y) / Math.abs(mstrCenterX - flyingArrow.x)) * 180/Math.PI;
            if (outMonsterX || outMonsterY) {
                if (outMonsterX) {
                    if (flyingArrow.x >= mstrCenterX) {
                        flyingArrow.x -= flyingArrow.speed;
                        flyingArrow.angel = 180 - flyingArrow.angel;
                    } else {
                        flyingArrow.x += flyingArrow.speed;
                    }
                } else {
                    if (flyingArrow.x >= mstrCenterX) {
                        flyingArrow.x -= flyingArrow.currentEnemy.speed;
                        flyingArrow.angel = 180 - flyingArrow.angel;
                    } else {
                        flyingArrow.x += flyingArrow.currentEnemy.speed;
                    }
                }
                if (outMonsterY) {
                    if (flyingArrow.y >= mstrCenterY) {
                        flyingArrow.y -= flyingArrow.speed;
                        flyingArrow.angel = flyingArrow.angel * -1;
                    } else {
                        flyingArrow.y += flyingArrow.speed;
                    }
                } else {
                    if (flyingArrow.y >= mstrCenterY) {
                        flyingArrow.y -= flyingArrow.currentEnemy.speed;
                        flyingArrow.angel = flyingArrow.angel * -1;
                    } else {
                        flyingArrow.y += flyingArrow.currentEnemy.speed;
                    }
                }
            } else {
                if(flyingArrow.currentEnemy.shield <= 0){
                    flyingArrow.currentEnemy.hp -= flyingArrow.atk;
                } else {
                    flyingArrow.currentEnemy.shield -= flyingArrow.atk / 2;
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
            drawBow(tower);
            tower.currentEnemy = -1;
            monsters.sort(function(mstrA, mstrB) {
                if(mstrA.distance > mstrB.distance) {
                    return -1;
                }
                if(mstrA.distance < mstrB.distance) {
                    return 1;
                }
                return 0;
            });
            for (let i = 0; i < monsters.length; i++) {
                let mstrCenterX = monsters[i].x + monsters[i].width / 2;
                let mstrCenterY = monsters[i].y + monsters[i].height / 2;
                if (hittingRadius(tower, mstrCenterX, mstrCenterY) && !monsters[i].invisible) {
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
                updateBow(tower);
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
        canvasContext.drawImage(flyingBullet.image, flyingBullet.x - flyingBullet.width/2, flyingBullet.y - flyingBullet.height/2, flyingBullet.width, flyingBullet.height);
    })
}

function makeExplosion(bullet){
    explosions.push({
        x: bullet.finishX,
        y: bullet.finishY,
        explosionRadius: bullet.blastRadius,
        stepcounter: 0,
        steptimer: GAME.milisectimer + frameTimeExplosion,
        size: 100,
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
                if (hittingRadius(tower, mstrCenterX, mstrCenterY) && monsters[i].type != "flying" && !monsters[i].invisible) {
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
        canvasContext.drawImage(explosionSteps[explosion.stepcounter].img, explosion.x - explosion.size / 2, explosion.y - explosion.size / 2, explosion.size, explosion.size);
    })
}

function updateExplosions() {
    explosionSteps.sort(function sortExpSteps(exp1, exp2) { return exp1.index - exp2.index; });
    for(var i = 0; i < explosions.length; i++) {
        // explosion.radius += explosion.speed;
        // explosion.thickness -= explosion.speed / 10;
        let explosion = explosions[i];
        if(explosion.stepcounter < explosionSteps.length && GAME.milisectimer > explosion.steptimer) {
            explosion.stepcounter ++;
            explosion.steptimer += frameTimeExplosion;
            explosion.size += 25;
        }
        if(explosion.stepcounter == explosionSteps.length) {
            monsters.forEach(monster => {
                var distance = Math.sqrt(Math.pow(monster.x + (monster.width / 2) - explosion.x, 2) + Math.pow(monster.y + (monster.height / 2) - explosion.y, 2));
                if(distance <= explosion.explosionRadius && monster.type != "flying") {
                    if(monster.shield > 0){
                        monster.shield -= explosion.atk;
                    } else {
                        monster.hp -= explosion.atk;
                    }
                }
            });
            explosions.splice(i, 1);
        }
    }
}

function drawStrikes() {
    strikeAnimationSteps.sort(function strikesSort(s1, s2) {
        return s1.index - s2.index;
    });
    strikes.forEach(strike => {
        let step = strikeAnimationSteps[strike.stepcounter];
        canvasContext.drawImage(step.img, strike.x - step.imgSize / 2, strike.y - step.imgSize / 2, step.imgSize, step.imgSize);
    });
}

function updateStrikes() {
    // for(var i=0; i < strikes.length; i++) {
    //     strikes[i].radius += strikes[i].speed;
    //     strikes[i].thickness -= strikes[i].speed / 10;
    //     monsters.forEach(monster => {
    //         var distance = Math.sqrt(Math.pow(monster.x + (monster.width / 2) - strikes[i].x, 2) + Math.pow(monster.y + (monster.height / 2) - strikes[i].y, 2));
    //         if(distance <= strikes[i].radius && monster.type != "flying" && !monster.hit) {
    //             if(monster.shield > 0){
    //                 monster.shield -= strikes[i].atk;
    //             } else {
    //                 monster.hp -= strikes[i].atk;
    //             }
    //             monster.hit = true;
    //         }
    //     });
    //     if(strikes[i].radius >= strikes[i].maxRadius) {
    //         strikes.splice(i, 1);
    //         monsters.forEach(monster => {
    //             monster.hit = false;
    //         })
    //     }
    // }

    for(var i=0; i < strikes.length; i++) {
        let strike = strikes[i];
        if(strike.stepcounter < strikeAnimationSteps.length && GAME.milisectimer > strike.steptimer) {
            strike.steptimer += frameTimeElectric;
            strike.stepcounter ++;
        }
        if(strike.stepcounter == strikeAnimationSteps.length) {
            monsters.forEach(monster => {
                var distance = Math.sqrt(Math.pow(monster.x + (monster.width / 2) - strike.x, 2) + Math.pow(monster.y + (monster.height / 2) - strike.y, 2));
                if(distance <= strike.maxRadius && monster.type != "flying") {
                    if(monster.shield > 0){
                        monster.shield -= strike.atk;
                    } else {
                        monster.hp -= strike.atk;
                    }
                }
            });
            strikes.splice(i, 1);
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

function attackElectric() {
    towers.forEach(tower => {
        if (tower.type == "electric") {
            monsters.forEach(monster => {
                lineToMonster = Math.sqrt(Math.pow(monster.x + (monster.width / 2) - tower.x - 50, 2) + Math.pow(monster.y + (monster.height / 2) - tower.y - 50, 2));
                if (lineToMonster <= tower.radius && (GAME.stopwatch - tower.placeTime) % tower.atkspeed == 0 && !tower.hit && monster.type != "flying" && !checkStrikes(tower) && !monster.invisible) {
                    makeStrike(tower);
                }
                if (!((GAME.stopwatch - tower.placeTime) % tower.atkspeed == 0)) {
                    tower.hit = false;
                }
            })
            if (!tower.hit && (GAME.stopwatch - tower.placeTime) % tower.atkspeed == 0) {
                tower.hit = true;
            }
        }
    })
}

function attackTowers(GAME) {
    attackArcher(GAME);
    attackElectric(GAME);
    attackMortir(GAME);
}