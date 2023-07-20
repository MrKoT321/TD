var towers = [];

function setTowers(GAME, lvl) {
    towers = [];
    let waveTowers = lvl.atk_towers[GAME.wave - 1];
    for(i = 0; i < waveTowers.length; i++){
        let tower = waveTowers[i];
        towers.push({
            x: (lvl.towersPos[i] % 16 - 1) * 100,
            y: Math.floor(lvl.towersPos[i] / 16) * 100,
            cost: tower.cost,
            atk: tower.atk,
            radius: tower.radius,
            type: tower.type,
            atkspeed: tower.atkspeed,
            towerColor: tower.towerColor,
            atkColor: tower.atkColor,
            currentEnemy: -1,
            placeTime: GAME.stopwatch,
            startTime: 0
        })
    }
}