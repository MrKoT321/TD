const monster1 = {
    hp: 100,
    maxhp: 100,
    speed: 2,
    cost: 30,
    width: 60,
    height: 73,
    name: "monster1",
    type: "walking",
    baseTime: [20, 27, 25, 30],
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
    baseTime: [20, 27, 25, 30],
}

const monster3 = {
    hp: 100,
    maxhp: 100,
    speed: 3,
    cost: 10,
    width: 50,
    height: 50,
    name: "monster3"
}

const monster4 = {
    hp: 100,
    maxhp: 100,
    speed: 3,
    cost: 10,
    width: 50,
    height: 50,
    name: "monster4"
}

const monster5 = {
    hp: 100,
    maxhp: 100,
    speed: 3,
    cost: 10,
    width: 50,
    height: 50,
    name: "monster5"
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
const image3 = new Image();
image3.src = "../static/images/monster3.png";
const image4 = new Image();
image4.src = "../static/images/monster4.png";
const image5 = new Image();
image5.src = "../static/images/monster5.png";

const monster1_image = new Image();
monster1_image.src = "../static/images/monster1.png";
const monster2_image = new Image();
monster2_image.src = "../static/images/monster2.png";

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

image3.onload = () => {
    monster3.image = image3;
}

image4.onload = () => {
    monster4.image = image4;
}

image5.onload = () => {
    monster5.image = image5;
}

monster1_image.onload = () => {
    monster1.icon = monster1_image
}

monster2_image.onload = () => {
    monster2.icon = monster2_image
}