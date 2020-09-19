const socket = io('http://localhost:8000');

const charArea = document.getElementById('chat-container');
const inputMsg = document.getElementById('msg');
const form = document.getElementById('form');
const audio = new Audio('tone.mp3')

const append = (message,positon)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('chat');
    messageElement.classList.add(positon);
    charArea.append(messageElement);
    if(positon == "left"){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(inputMsg.value ==  ""){

    }else{
    const message = inputMsg.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    inputMsg.value ="";
}
});

const name = prompt('Enter Your Name To Join');
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the Chat`,'right');
});

socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,'left');
});

socket.on('left',name=>{
    append(`${name} Left The Chat`,'left');
});