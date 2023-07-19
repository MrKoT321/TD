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

startBtn.addEventListener('click', () => { nicknameSingle.value = ''; })
multiplayBtn.addEventListener('click', () => { nicknameMulti.value = ''; })

nicknameSingle.addEventListener("input", () => { nicknameSingle.value = nicknameSingle.value.replace(/[^a-zA-z\s]/gi, ''); });
nicknameMulti.addEventListener("input", () => { nicknameMulti.value = nicknameMulti.value.replace(/[^a-zA-z\s]/gi, ''); });

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