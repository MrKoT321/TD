const startBtn = document.querySelector(".button-start");
const multiplayBtn = document.querySelector(".button-multiplay")

const nicknameSingle = document.querySelector('.form-popup__nickname-single');
const nicknameMulti = document.querySelector('.form-popup__nickname-multi');
const choisenClassSingle = document.querySelector('.form-popup__single');
const choisenClassMulti = document.querySelector('.form-popup__multi');

const attackChoisenStart = document.getElementById('attack-choisen-start');
const defenseChoisenStart = document.getElementById('defense-choisen-start');
const attackChoisenMultiplay = document.getElementById('attack-choisen-multiplay');
const defenseChoisenMultiplay = document.getElementById('defense-choisen-multiplay');
// const defenseSubmitStart = document.getElementById('defense-submit-start');
// const attackSubmitStart = document.getElementById('attack-submit-start');
// const defenseSubmitMultiplay = document.getElementById('defense-submit-multiplay');
// const attackSubmitMultiplay = document.getElementById('attack-submit-multiplay');

const startGameForm = document.getElementById('start-game-form');

const waitingScreen = document.getElementById('waiting-screen');
const waitingScreenPopup = document.getElementById('waiting-screen-img');
const waitingScreenArea = document.getElementById('waiting-screen-area');



const startSingleGameBtn = document.getElementById("submit-start");
const startMultiplayGameBtn = document.getElementById("submit-multiplay");


GAME = {
    width: 1800,
    height: 1000,
    milisectimer: 0,
    username: undefined,
    type: undefined,
    choisen_class: undefined,
    roomId: undefined,
    status: "choose"
}

startBtn.addEventListener('click', () => { nicknameSingle.value = ''; })
multiplayBtn.addEventListener('click', () => { nicknameMulti.value = ''; })

nicknameSingle.addEventListener("input", () => { nicknameSingle.value = nicknameSingle.value.replace(/[^a-zA-Z0-9\s]/gi, ''); });
nicknameMulti.addEventListener("input", () => { nicknameMulti.value = nicknameMulti.value.replace(/[^a-zA-Z0-9\s]/gi, ''); });

attackChoisenMultiplay.addEventListener(
    "click",
    () => {
        GAME.type = 'multiplay';
        GAME.choisen_class = 'attack';
        // attackSubmitMultiplay.classList.remove('hidden'); 
        // defenseSubmitMultiplay.classList.add('hidden');
    }
)

defenseChoisenMultiplay.addEventListener(
    "click",
    () => {
        GAME.type = 'multiplay';
        GAME.choisen_class = 'defense';
        // defenseSubmitMultiplay.classList.remove('hidden');
        // attackSubmitMultiplay.classList.add('hidden'); 
    }
)

attackChoisenStart.addEventListener(
    "click",
    () => {
        GAME.type = 'single';
        GAME.choisen_class = 'attack';
        // attackSubmitStart.classList.remove('hidden'); 
        // defenseSubmitStart.classList.add('hidden');
    }
)

defenseChoisenStart.addEventListener(
    "click",
    () => {
        GAME.type = 'single';
        GAME.choisen_class = 'defense';
        // defenseSubmitStart.classList.remove('hidden');
        // attackSubmitStart.classList.add('hidden'); 
    }
)

function sendSingleGameForm() {
    // choisenClassSingle.value = Class;
    choisenClassSingle.value = GAME.choisen_class;
    $('#start-game-form').attr('action', '../create_single_game.php');
}

startSingleGameBtn.addEventListener('click', () => { sendSingleGameForm() });
// defenseSubmitStart.addEventListener('click', () => { sendSingleGameForm('defense') });
// attackSubmitStart.addEventListener('click', () => { sendSingleGameForm('attack') });

function sendMultiplayGameForm(event) {
    document.getElementById("form-multiplay").classList.add("hidden");
    document.getElementById("canvas").classList.remove("hidden");
    GAME.status = "search";
    GAME.username = nicknameMulti.value;
    event.preventDefault();
    waitingScreen.classList.add("active");
    waitingScreenPopup.style.opacity = "1";
    waitingScreenPopup.style.transform = "translate(0px, 0px)";
    data = {
        type: 'add_to_search',
        choisen_class: GAME.choisen_class
    }
    json = JSON.stringify(data);
    socket.send(json);
    history.pushState({}, 'Menu', './#');
}

waitingScreenArea.addEventListener('click', () => {
    document.getElementById("form-multiplay").classList.remove("hidden");
    document.getElementById("canvas").classList.add("hidden");
    GAME.status = "choose";
    waitingScreen.classList.remove("active");
    waitingScreenPopup.style.opacity = "0";
    waitingScreenPopup.style.transform = "translate(0px, -100%)";
    data = {
        type: 'remove_from_search'
    }
    json = JSON.stringify(data);
    socket.send(json);
})

function redirectToMultiplayGame() {
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'POST';
    form.action = '../create_multiplay_game.php';
    for (var name in GAME) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = GAME[name];
        form.appendChild(input);
    }
    form.submit();
}

startMultiplayGameBtn.addEventListener('click', (event) => { if (nicknameMulti.value !== '') sendMultiplayGameForm(event) });
// defenseSubmitMultiplay.addEventListener('click', (event) => { if (nicknameMulti.value !== '') sendMultiplayGameForm(event, 'defense') });
// attackSubmitMultiplay.addEventListener('click', (event) => { if (nicknameMulti.value !== '') sendMultiplayGameForm(event, 'attack') });

const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', function (event) {
    console.log('Connected to server.');
});

socket.addEventListener('message', function (event) {
    data = JSON.parse(event.data);
    switch (data.type) {
        case 'find':
            GAME.roomId = data.roomId;
            redirectToMultiplayGame();
            break;
    }
});

let canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
let canvasContext = canvas.getContext("2d");

const background = new Image();
background.src = "../static/images/waiting_screen.png";
background.onload = () => {
    GAME.background = background;
}

startDate = new Date();
function compareTime() {
    GAME.milisectimer = new Date() - startDate;
}

function drawBackground() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    if (GAME.background) {
        canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height);
    }
}

function play() {
    compareTime();
    drawBackground();
    if (GAME.status === "search") {
        setWaitingMonster();
        walkMonster();
    } else {
        resetWaitingMonster();
    }
    requestAnimationFrame(play);
}

setTimeout(() => { play() }, 1000)