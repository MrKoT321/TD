const startBtn = document.querySelector(".button-start");

const submitButton = document.querySelector('.form-popup__submit');
const nickname = document.querySelector('.form-popup__nickname');

const attackChoisenStart = document.getElementById('attack-choisen-start');
const defenseChoisenStart = document.getElementById('defense-choisen-start');
const attackChoisenMultiplay = document.getElementById('attack-choisen-multiplay');
const defenseChoisenMultiplay = document.getElementById('defense-choisen-multiplay');
const defenseSubmitStart = document.getElementById('defense-submit-start');
const attackSubmitStart = document.getElementById('attack-submit-start');
const defenseSubmitMultiplay = document.getElementById('defense-submit-multiplay');
const attackSubmitMultiplay = document.getElementById('attack-submit-multiplay');

startBtn.addEventListener('click', () => { nickname.value = ''; })

submitButton.addEventListener('click', () => { sendNickname(event) });

async function sendNickname(event) {
    if (nickname.value != '') {
        const score = document.querySelector(".score__value");
        event.preventDefault();
        props = {
            nick_name: nickname.value,
            choisen_class: 'defense'
        }
        
        const json = JSON.stringify(props);
        console.log(json)
        let response = await fetch('/create_game.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: json
        });
        if (!response.ok) {
            alert("Ошибка HTTP: " + response.status);
        }
            // window.location.href = '/single_game_defense.php?game_id=' + nickname.value;
    }
}

nickname.addEventListener(
    "input",
    () => {
        nickname.value = nickname.value.replace(/[^a-zA-z\s]/gi, '');
    }
)

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
