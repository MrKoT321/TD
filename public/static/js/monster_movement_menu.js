monsters = [];

function setMonsterStartPosition(monsterToDraw) {
    monsterToDraw.drawW = monsterToDraw.width * 1.5;
    monsterToDraw.drawH = monsterToDraw.height * 1.5;
    monsterToDraw.turnY = undefined;
    monsterToDraw.turnX = undefined;
    switch(monsterToDraw.start) {
        case 0:
            monsterToDraw.dir = 'r';
            monsterToDraw.x = 0 - monsterToDraw.drawW - 50;
            monsterToDraw.y = 800 - monsterToDraw.drawH / 2;
            monsterToDraw.finishX = 1800 + monsterToDraw.drawW + 100;
            break;
        case 1:
            monsterToDraw.dir = 'l';
            monsterToDraw.x = 1800 + monsterToDraw.drawW + 50;
            monsterToDraw.y = 800 - monsterToDraw.drawH / 2;
            monsterToDraw.finishX = 0 - monsterToDraw.drawW - 100;
            break;
        case 2:
            monsterToDraw.dir = 'd';
            monsterToDraw.x = 300 - monsterToDraw.drawW / 2;
            monsterToDraw.y = 0 - monsterToDraw.drawH - 50; 
            monsterToDraw.finishX = 0 - monsterToDraw.drawW - 100;
            monsterToDraw.turnY = 200 - monsterToDraw.drawH / 2;
            monsterToDraw.turnDir = 'l';
            break;
        case 3: 
            monsterToDraw.dir = 'r';
            monsterToDraw.x = 0 - monsterToDraw.drawW - 50;
            monsterToDraw.y = 200 - monsterToDraw.drawH / 2;
            monsterToDraw.finishY = 0 - monsterToDraw.drawH - 100;
            monsterToDraw.turnX = 300 - monsterToDraw.drawW / 2;
            monsterToDraw.turnDir = 'u';
            break;
        case 4:
            monsterToDraw.dir = 'd';
            monsterToDraw.x = 1500 - monsterToDraw.drawW / 2;
            monsterToDraw.y = 0 - monsterToDraw.drawH - 50; 
            monsterToDraw.finishX = 1800 + monsterToDraw.drawW + 100;
            monsterToDraw.turnY = 400 - monsterToDraw.drawH / 2;
            monsterToDraw.turnDir = 'r';
            break;
        case 5:
            monsterToDraw.dir = 'l';
            monsterToDraw.x = 1800 + monsterToDraw.drawW + 100;
            monsterToDraw.y = 400 - monsterToDraw.drawH / 2; 
            monsterToDraw.finishY = 0 - monsterToDraw.drawH - 100;
            monsterToDraw.turnX = 1500 - monsterToDraw.drawW / 2;
            monsterToDraw.turnDir = 'u';
            break;
    }
}

function resetWaitingMonster() {
    monsters = [];
}

function setWaitingMonster() {
    if (monsters.length === 0) {
        let monstersToDraw = [monster1, monster2, monster3, monster4, monster5];
        let monsterToDraw = monstersToDraw[Math.floor(Math.random() * (monstersToDraw.length))];
        monsterToDraw.start = Math.floor(Math.random() * (6));
        setMonsterStartPosition(monsterToDraw);
        monsters = [monsterToDraw];
    }
}

function changeMonsterDir(monster) {
    if ((monster.dir ==='r' && monster.x >= monster.turnX) || (monster.dir === 'l' && monster.x <= monster.turnX) || (monster.dir === 'd' && monster.y >= monster.turnY) || (monster.dir === 'u' && monster.y <= monster.turnY)) {
        monster.dir = monster.turnDir;
    }
}

function drawMonsterMovement(monster) {
    const speed = 5;
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
    changeMonsterDir(monster);
    if (monster.image)
        canvasContext.drawImage(monster.image, monster.x, monster.y, monster.drawW, monster.drawH);
    if ((monster.dir ==='r' && monster.x >= monster.finishX) || (monster.dir === 'l' && monster.x <= monster.finishX) || (monster.dir === 'd' && monster.y >= monster.finishY) || (monster.dir === 'u' && monster.y <= monster.finishY)) {
        monsters = [];
    }
}

function walkMonster() {
    monsters.forEach(monster => {
        updateMonstersStep();
        drawMonsterMovement(monster);
    })
}