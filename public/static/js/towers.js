const archer = {
    cost: 30,
    atk: 20,
    radius: 350,
    type: "arrow",
    atkspeed: 2,
    towerColor: "orange",
    atkColor: "red",
    towerImg: "../static/images/archer_game_tower.png"
}

const electric = {
    cost: 40,
    atk: 30,
    radius: 400,
    type: "electric",
    atkspeed: 4,
    towerColor: "yellow",
    atkColor: "red",
    towerImg: "../static/images/electric_game_tower.png"
}

const mortir = {
    cost: 50,
    atk: 35,
    radius: 300,
    type: "splash",
    atkspeed: 4,
    towerColor: "blue",
    atkColor: "red",
    towerImg: "../static/images/mortir_game_tower.png"
}

const bow = {
    width: 75,
    height: 75,
    loaded_image: undefined,
    simple_image: undefined,
}

const bowLoadedImg = new Image();
const bowSimpleImg = new Image();
bowLoadedImg.src = "../static/images/bowLoaded.png";
bowSimpleImg.src = "../static/images/bowSimple.png";

bowLoadedImg.onload = () => { bow.loaded_image = bowLoadedImg };
bowSimpleImg.onload = () => { bow.simple_image = bowSimpleImg };