const submitButton = document.querySelector('.form-popup__submit');
const nickname = document.querySelector('.form-popup__nickname');

submitButton.addEventListener('click', sendNickname);

async function sendNickname(event) {
    if (nickname.value != '') {
        event.preventDefault();
        props = {
          'nickname': nickname.value
        }
        console.log(props);
        // const json = JSON.stringify(props);
        // let response = await fetch('/single_game.php', {
        //       method: 'POST',
        //       headers: {
        //       'Content-Type': 'application/json;charset=utf-8'
        //       },
        //       body: json
        // });
    }
}