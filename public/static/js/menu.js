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
const defenseSubmitStart = document.getElementById('defense-submit-start');
const attackSubmitStart = document.getElementById('attack-submit-start');
const defenseSubmitMultiplay = document.getElementById('defense-submit-multiplay');
const attackSubmitMultiplay = document.getElementById('attack-submit-multiplay');

const startGameForm = document.getElementById('start-game-form');

const waitingScreen = document.getElementById('waiting-screen');
const waitingScreenPopup = document.getElementById('waiting-screen-img');
const waitingScreenArea = document.getElementById('waiting-screen-area');

GAME = {
    username: undefined,
    choisen_class: undefined,
    roomId: undefined,
}

startBtn.addEventListener('click', () => { nicknameSingle.value = ''; })
multiplayBtn.addEventListener('click', () => { nicknameMulti.value = ''; })

nicknameSingle.addEventListener("input", () => { nicknameSingle.value = nicknameSingle.value.replace(/[^a-zA-Z0-9\s]/gi, ''); });
nicknameMulti.addEventListener("input", () => { nicknameMulti.value = nicknameMulti.value.replace(/[^a-zA-Z0-9\s]/gi, ''); });

attackChoisenMultiplay.addEventListener(
    "click",
    () => {
        attackSubmitMultiplay.classList.remove('hidden'); 
        defenseSubmitMultiplay.classList.add('hidden');
    }
)

defenseChoisenMultiplay.addEventListener(
    "click",
    () => {
        defenseSubmitMultiplay.classList.remove('hidden');
        attackSubmitMultiplay.classList.add('hidden'); 
    }
)

attackChoisenStart.addEventListener(
    "click",
    () => {
        attackSubmitStart.classList.remove('hidden'); 
        defenseSubmitStart.classList.add('hidden');
    }
)

defenseChoisenStart.addEventListener(
    "click",
    () => {
        defenseSubmitStart.classList.remove('hidden');
        attackSubmitStart.classList.add('hidden'); 
    }
)

function sendSingleGameForm(Class) {
    choisenClassSingle.value = Class;
    $('#start-game-form').attr('action', '../create_single_game.php');
}

defenseSubmitStart.addEventListener('click', () => { sendSingleGameForm('defense') })
attackSubmitStart.addEventListener('click', () => { sendSingleGameForm('attack') })

function sendMultiplayGameForm(event, Class) {
    // choisenClassSingle.value = Class;
    // $('#mutiplay-game-form').attr('action', '../create_multiplay_game.php');
    GAME.username = nicknameMulti.value;
    GAME.choisen_class = Class;
    event.preventDefault();
    waitingScreen.classList.add("active");
    waitingScreenPopup.style.opacity = "1";
    waitingScreenPopup.style.transform = "translate(0px, 0px)";
    data = {
        type: 'add_to_search', 
        choisen_class: Class
    }
    json = JSON.stringify(data);
    socket.send(json);
}

waitingScreenArea.addEventListener('click', () => {
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

defenseSubmitMultiplay.addEventListener('click', (event) => { sendMultiplayGameForm(event, 'defense') });
attackSubmitMultiplay.addEventListener('click', (event) => { sendMultiplayGameForm(event, 'attack') });

const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', function(event) {
    console.log('Connected to server.');
});

socket.addEventListener('message', function(event) {
    data = JSON.parse(event.data);
    console.log(data);
    switch (data.type) {
        case 'add_to_search':
            console.log(data.choisen_class);
            break;
        case 'find':
            GAME.roomId = data.roomId;
            console.log("Redirect to New Page");
            redirectToMultiplayGame();
            break;
    }
});