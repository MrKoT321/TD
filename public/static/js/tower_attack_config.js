var towers = [];

function setTowers(GAME, lvl) {
    towers = [];
    let waveTowers = lvl.atk_towers[GAME.wave - 1];
    for(i = 0; i < waveTowers.length; i++){
        let posX = (lvl.towersPos[i] % 16 - 1) * 100;
        let posY = Math.floor(lvl.towersPos[i] / 16) * 100;
        let tower = waveTowers[i];
        let bowData = {
            bow_x: posX + 50,
            bow_y: posY + 15,
            bow_width: bow.width,
            bow_height: bow.height,
            bow_angel: 90,
            bow_loaded_image: bow.loaded_image,
            bow_simple_image: bow.simple_image
        }
        console.log(bowData.bow_loaded_image);
        let towerData = {
            x: posX,
            y: posY,
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
        };
        towerData = tower.type == "arrow" ? {...towerData, ...bowData} : towerData;
        towers.push(towerData);
    }
}