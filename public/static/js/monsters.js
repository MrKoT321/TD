const monster1 = {
    hp: 100,
    maxhp: 100,
    speed: 2,
    cost: 10,
    width: 80,
    height: 80,
    name: "monster1"
}

const monster2 = {
    hp: 100,
    maxhp: 100,
    speed: 2,
    cost: 0,
    width: 50,
    height: 50,
    name: "monster2"
}

const monster3 = {
    hp: 100,
    maxhp: 100,
    speed: 3,
    cost: 0,
    width: 50,
    height: 50,
    name: "monster3"
}

const monster4 = {
    hp: 100,
    maxhp: 100,
    speed: 3,
    cost: 0,
    width: 50,
    height: 50,
    name: "monster4"
}

const monster5 = {
    hp: 100,
    maxhp: 100,
    speed: 3,
    cost: 0,
    width: 50,
    height: 50,
    name: "monster5"
}

const image1 = new Image();
image1.src = "../static/images/monster1.png";
const image2 = new Image();
image2.src = "../static/images/monster2.png";
const image3 = new Image();
image3.src = "../static/images/monster3.png";
const image4 = new Image();
image4.src = "../static/images/monster4.png";
const image5 = new Image();
image5.src = "../static/images/monster5.png";

image1.onload = () => {
    monster1.image = image1;
}

image2.onload = () => {
    monster2.image = image2;
}

image3.onload = () => {
    monster3.image = image3;
}

image4.onload = () => {
    monster4.image = image4;
}

image5.onload = () => {
    monster5.image = image5;
}