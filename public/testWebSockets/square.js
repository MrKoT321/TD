var GAME = {
    width: 1600,
    height: 1000,
    color: "yellow"
}

var PLAYER = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    speed: 2,
    color: "purple",
    move: false,
    dir: 'u'
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var ctx = canvas.getContext("2d");

function initPlayer() {
    PLAYER.x = GAME.width / 2 - PLAYER.width;
    PLAYER.y = GAME.height / 2 - PLAYER.height;
}

function drawBack() {
    ctx.fillStyle = GAME.color;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
}

function drawPlayer() {
    ctx.fillStyle = PLAYER.color;
    ctx.fillRect(PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height);
}

function updatePlayer() {
    if(PLAYER.move) {
        switch (PLAYER.dir) {
            case 'r':
                PLAYER.x += PLAYER.speed;
                break;
            case 'u':
                PLAYER.y -= PLAYER.speed;
                break;
            case 'l':
                PLAYER.x -= PLAYER.speed;
                break;
            case 'd':
                PLAYER.y += PLAYER.speed;
                break;
        }
    }
}

//function sendData() {
function sendData() {
    const json = JSON.stringify(PLAYER);
    console.log(typeof(json));
    socket.send(json);
}

function play() {
    drawBack();
    drawPlayer();
    updatePlayer();
    sendData();
    requestAnimationFrame(play);
}

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':
            PLAYER.move = !PLAYER.move;
            break;
        case 'w':
            PLAYER.dir = 'u';
            break;
        case 'a':
            PLAYER.dir = 'l';
            break;
        case 's':
            PLAYER.dir = 'd';
            break;
        case 'd':
            PLAYER.dir = 'r';
            break;
    }
})

initPlayer();
play();