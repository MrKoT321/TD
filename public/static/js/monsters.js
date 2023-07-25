const monster1 = {
    hp: 75,
    maxhp: 75,
    speed: 2,
    cost: 30,
    width: 60,
    height: 73,
    name: "monster1",
    type: "walking",
    shield: 0,
    baseTime: [20, 27, 25, 30],
    countShield: 0,
    maxShield: 75
}

const monster2 = {
    hp: 75,
    maxhp: 75,
    speed: 2,
    cost: 40,
    width: 75,
    height: 100,
    name: "monster2",
    type: "flying",
    shield: 0,
    baseTime: [20, 27, 25, 30],
    countShield: 0,
    maxShield: 75
}

const monster3 = {
    hp: 60,
    maxhp: 60,
    speed: 3,
    cost: 50,
    width: 96,
    height: 86,
    name: "monster3",
    type: "walking",
    shield: 0,
    baseTime: [10, 13, 12, 15],
    countShield: 0,
    maxShield: 75
}

const monster4 = {
    hp: 250,
    maxhp: 250,
    speed: 1,
    cost: 80,
    width: 123,
    height: 120,
    name: "monster4",
    type: "walking",
    shield: 0,
    baseTime: [40, 54, 48, 60],
    countShield: 0,
    maxShield: 75
}

const monster5 = {
    hp: 60,
    maxhp: 60,
    speed: 2,
    cost: 100,
    width: 96,
    height: 110,
    name: "monster5",
    shield: 150,
    baseTime: [20, 27, 25, 30],
    giveShield: 75,
    type: "walking",
    maxShield: 150
}

const monster1_step1 = new Image();
monster1_step1.src = "../static/images/monster1_step1.png";
const monster1_step2 = new Image();
monster1_step2.src = "../static/images/monster1_step2.png";
const monster1_step3 = new Image();
monster1_step3.src = "../static/images/monster1_step3.png";
const monster1_step4 = new Image();
monster1_step4.src = "../static/images/monster1_step4.png";
const monster1_step1_rev = new Image();
monster1_step1_rev.src = "../static/images/monster1_step1_rev.png";
const monster1_step2_rev = new Image();
monster1_step2_rev.src = "../static/images/monster1_step2_rev.png";
const monster1_step3_rev = new Image();
monster1_step3_rev.src = "../static/images/monster1_step3_rev.png";
const monster1_step4_rev = new Image();
monster1_step4_rev.src = "../static/images/monster1_step4_rev.png";
const monster2_step1 = new Image();
monster2_step1.src = "../static/images/monster2_step1.png";
const monster2_step2 = new Image();
monster2_step2.src = "../static/images/monster2_step2.png";
const monster2_step3 = new Image();
monster2_step3.src = "../static/images/monster2_step3.png";
const monster2_step4 = new Image();
monster2_step4.src = "../static/images/monster2_step4.png";
const monster2_step1_rev = new Image();
monster2_step1_rev.src = "../static/images/monster2_step1_rev.png";
const monster2_step2_rev = new Image();
monster2_step2_rev.src = "../static/images/monster2_step2_rev.png";
const monster2_step3_rev = new Image();
monster2_step3_rev.src = "../static/images/monster2_step3_rev.png";
const monster2_step4_rev = new Image();
monster2_step4_rev.src = "../static/images/monster2_step4_rev.png";
const monster3_step1 = new Image();
monster3_step1.src = "../static/images/monster3_step1.png";
const monster3_step2 = new Image();
monster3_step2.src = "../static/images/monster3_step2.png";
const monster3_step3 = new Image();
monster3_step3.src = "../static/images/monster3_step3.png";
const monster3_step4 = new Image();
monster3_step4.src = "../static/images/monster3_step4.png";
const monster3_step1_rev = new Image();
monster3_step1_rev.src = "../static/images/monster3_step1_rev.png";
const monster3_step2_rev = new Image();
monster3_step2_rev.src = "../static/images/monster3_step2_rev.png";
const monster3_step3_rev = new Image();
monster3_step3_rev.src = "../static/images/monster3_step3_rev.png";
const monster3_step4_rev = new Image();
monster3_step4_rev.src = "../static/images/monster3_step4_rev.png";
const monster4_step1 = new Image();
monster4_step1.src = "../static/images/monster4_step1.png";
const monster4_step2 = new Image();
monster4_step2.src = "../static/images/monster4_step2.png";
const monster4_step3 = new Image();
monster4_step3.src = "../static/images/monster4_step3.png";
const monster4_step4 = new Image();
monster4_step4.src = "../static/images/monster4_step4.png";
const monster4_step1_rev = new Image();
monster4_step1_rev.src = "../static/images/monster4_step1_rev.png";
const monster4_step2_rev = new Image();
monster4_step2_rev.src = "../static/images/monster4_step2_rev.png";
const monster4_step3_rev = new Image();
monster4_step3_rev.src = "../static/images/monster4_step3_rev.png";
const monster4_step4_rev = new Image();
monster4_step4_rev.src = "../static/images/monster4_step4_rev.png";
const monster5_step1 = new Image();
monster5_step1.src = "../static/images/monster5_step1.png";
const monster5_step2 = new Image();
monster5_step2.src = "../static/images/monster5_step2.png";
const monster5_step3 = new Image();
monster5_step3.src = "../static/images/monster5_step3.png";
const monster5_step4 = new Image();
monster5_step4.src = "../static/images/monster5_step4.png";
const monster5_step1_rev = new Image();
monster5_step1_rev.src = "../static/images/monster5_step1_rev.png";
const monster5_step2_rev = new Image();
monster5_step2_rev.src = "../static/images/monster5_step2_rev.png";
const monster5_step3_rev = new Image();
monster5_step3_rev.src = "../static/images/monster5_step3_rev.png";
const monster5_step4_rev = new Image();
monster5_step4_rev.src = "../static/images/monster5_step4_rev.png";

const monster1_image = new Image();
monster1_image.src = "../static/images/monster1.png";
const monster2_image = new Image();
monster2_image.src = "../static/images/monster2.png";
const monster3_image = new Image();
monster3_image.src = "../static/images/monster3.png";
const monster4_image = new Image();
monster4_image.src = "../static/images/monster4.png";
const monster5_image = new Image();
monster5_image.src = "../static/images/monster5.png";

monster1_step1.onload = () => {
    monster1.step1 = monster1_step1;
}
monster1_step2.onload = () => {
    monster1.step2 = monster1_step2;
}
monster1_step3.onload = () => {
    monster1.step3 = monster1_step3;
}
monster1_step4.onload = () => {
    monster1.step4 = monster1_step4;
}
monster1_step1_rev.onload = () => {
    monster1.step1_rev = monster1_step1_rev;
}
monster1_step2_rev.onload = () => {
    monster1.step2_rev = monster1_step2_rev;
}
monster1_step3_rev.onload = () => {
    monster1.step3_rev = monster1_step3_rev;
}
monster1_step4_rev.onload = () => {
    monster1.step4_rev = monster1_step4_rev;
}

monster2_step1.onload = () => {
    monster2.step1 = monster2_step1;
}
monster2_step2.onload = () => {
    monster2.step2 = monster2_step2;
}
monster2_step3.onload = () => {
    monster2.step3 = monster2_step3;
}
monster2_step4.onload = () => {
    monster2.step4 = monster2_step4;
}
monster2_step1_rev.onload = () => {
    monster2.step1_rev = monster2_step1_rev;
}
monster2_step2_rev.onload = () => {
    monster2.step2_rev = monster2_step2_rev;
}
monster2_step3_rev.onload = () => {
    monster2.step3_rev = monster2_step3_rev;
}
monster2_step4_rev.onload = () => {
    monster2.step4_rev = monster2_step4_rev;
}

monster3_step1.onload = () => {
    monster3.step1 = monster3_step1;
}
monster3_step2.onload = () => {
    monster3.step2 = monster3_step2;
}
monster3_step3.onload = () => {
    monster3.step3 = monster3_step3;
}
monster3_step4.onload = () => {
    monster3.step4 = monster3_step4;
}
monster3_step1_rev.onload = () => {
    monster3.step1_rev = monster3_step1_rev;
}
monster3_step2_rev.onload = () => {
    monster3.step2_rev = monster3_step2_rev;
}
monster3_step3_rev.onload = () => {
    monster3.step3_rev = monster3_step3_rev;
}
monster3_step4_rev.onload = () => {
    monster3.step4_rev = monster3_step4_rev;
}

monster4_step1.onload = () => {
    monster4.step1 = monster4_step1;
}
monster4_step2.onload = () => {
    monster4.step2 = monster4_step2;
}
monster4_step3.onload = () => {
    monster4.step3 = monster4_step3;
}
monster4_step4.onload = () => {
    monster4.step4 = monster4_step4;
}
monster4_step1_rev.onload = () => {
    monster4.step1_rev = monster4_step1_rev;
}
monster4_step2_rev.onload = () => {
    monster4.step2_rev = monster4_step2_rev;
}
monster4_step3_rev.onload = () => {
    monster4.step3_rev = monster4_step3_rev;
}
monster4_step4_rev.onload = () => {
    monster4.step4_rev = monster4_step4_rev;
}

monster5_step1.onload = () => {
    monster5.step1 = monster5_step1;
}
monster5_step2.onload = () => {
    monster5.step2 = monster5_step2;
}
monster5_step3.onload = () => {
    monster5.step3 = monster5_step3;
}
monster5_step4.onload = () => {
    monster5.step4 = monster5_step4;
}
monster5_step1_rev.onload = () => {
    monster5.step1_rev = monster5_step1_rev;
}
monster5_step2_rev.onload = () => {
    monster5.step2_rev = monster5_step2_rev;
}
monster5_step3_rev.onload = () => {
    monster5.step3_rev = monster5_step3_rev;
}
monster5_step4_rev.onload = () => {
    monster5.step4_rev = monster5_step4_rev;
}

monster1_image.onload = () => {
    monster1.icon = monster1_image
}
monster2_image.onload = () => {
    monster2.icon = monster2_image
}
monster3_image.onload = () => {
    monster3.icon = monster3_image
}
monster4_image.onload = () => {
    monster4.icon = monster4_image
}
monster5_image.onload = () => {
    monster5.icon = monster5_image
}
