// fetch('sockets.php', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//     },
//     body: 
// })
const socket = new WebSocket("ws://192.168.242.82:8080");

// socket.addEventListener("open", (event) => {
//     socket.send("Hello Server!");
// });

socket.onopen = () => socket.send("Hello Server!");

socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
});