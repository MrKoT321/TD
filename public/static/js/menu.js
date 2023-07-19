const startBtn = document.querySelector(".button-start");

const submitButton = document.querySelector('.form-popup__submit');
const nickname = document.querySelector('.form-popup__nickname');

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