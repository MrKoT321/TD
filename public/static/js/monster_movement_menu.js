monsters = [];

function setMonsterStartPosition(monsterToDraw) {
    monsterToDraw.drawW = monsterToDraw.width * 1.5;
    monsterToDraw.drawH = monsterToDraw.height * 1.5;
    if (monsterToDraw.dir === 'r') {
        monsterToDraw.x = 0 - monsterToDraw.drawW - 50;
        monsterToDraw.y = 800 - monsterToDraw.drawH / 2;
        monsterToDraw.finishX = 1800 + monsterToDraw.drawW + 100;

    } else {
        monsterToDraw.x = 1800 + monsterToDraw.drawW + 50;
        monsterToDraw.y = 800 - monsterToDraw.drawH / 2;
        monsterToDraw.finishX = 0 - monsterToDraw.drawW - 100;
    }
}

function resetWaitingMonster() {
    monsters = [];
}

function setWaitingMonster() {
    if (monsters.length === 0) {
        let monstersToDraw = [monster1, monster2, monster3, monster4, monster5];
        let monsterToDraw = monstersToDraw[Math.floor(Math.random() * (monstersToDraw.length))];
        let monsterDirs = ['r', 'l'];
        monsterToDraw.dir = monsterDirs[Math.floor(Math.random() * (monsterDirs.length))];
        setMonsterStartPosition(monsterToDraw);
        monsters = [monsterToDraw];
    }
}

function drawMonsterMovement(monster) {
    const speed = 5;
    if (monster.dir === 'r') {
        monster.x += speed;
    } else {
        monster.x -= speed;
    }
    if (monster.image)
    canvasContext.drawImage(monster.image, monster.x, monster.y, monster.drawW, monster.drawH);
    if ((monster.dir ==='r' && monster.x >= monster.finishX) || (monster.dir === 'l' && monster.x <= monster.finishX)) {
        monsters = [];
    }
}

function walkMonster() {
    monsters.forEach(monster => {
        updateMonstersStep();
        drawMonsterMovement(monster);
    })
}