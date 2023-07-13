const startBtn = document.querySelector(".button-start");

const submitButton = document.querySelector('.form-popup__submit');
const nickname = document.querySelector('.form-popup__nickname');

startBtn.addEventListener('click', () => { nickname.value = ''; })

submitButton.addEventListener('click', () => { sendNickname() });

async function sendNickname() {
    if (nickname.value != '') {
        window.location.href = '/single_game.php?nick_name=' + nickname.value;
    }
}