let messagesBox = document.querySelector('#messages');
let leaveRoomBtn = document.querySelector('#leaveRoomBtn');
let sendBtn = document.querySelector('#sendBtn');
let newMsgField = document.querySelector('#newmsg');
const socket = io();


const messageToggle = false;
newMsgField.disabled = true;

socket.emit('joinToChat');

socket.on('userConnected', (user) => {
  renderMessage('System', user.username + ' connected to the chat...');
});

socket.on('message', (from, message) => {
  renderMessage(from, message);
});

socket.on('startQuiz', () => {
  socket.emit('getNewQuestion');
  newMsgField.disabled = false;
});

socket.on('showNewQuestion', (result) => {
  renderMessage('System', result.question);
  newMsgField.disabled = false;
});

function renderMessage(sender, message) {
  let newMessage = document.createElement('div');
  newMessage.classList.add('msg');

  if (sender.id == socket.id) {
    newMessage.classList.add('outgoing');
  } else {
    if (sender == 'System') {
      newMessage.classList.add('system');
      sender = {
        username: 'System',
      };
    } else {
      newMessage.classList.add('incoming');
    }
  }

  newMessage.innerHTML = '<strong>' + sender.username + '</strong><br><p>' + message + '</p>';
  let timestamp = document.createElement('span');

  timestamp.innerText = moment(new Date()).format('YYYY.MM.DD - H:mm');
  timestamp.classList.add('timestamp');
  newMessage.appendChild(timestamp);
  messagesBox.appendChild(newMessage);
  messagesBox.scrollTo({ top: messagesBox.scrollHeight });
}

leaveRoomBtn.addEventListener('click', () => {
  socket.emit('leaveChat');
});

sendBtn.addEventListener('click', () => {
  if (newMsgField.value != '') {
    const messagePayload = {
      user: user.username,
      msg: newMsgField.value,
    };

    socket.emit('sendMsg', messagePayload);
    newMsgField.value = '';
    newMsgField.disabled = true;
  }
});

newMsgField.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    if (newMsgField.value != '') {
      socket.emit('sendMsg', newMsgField.value);
      newMsgField.value = '';
      newMsgField.disabled = true;
    }
  }
});


let timeLeft = 60; // Kezdő idő másodpercben
const countdownElement = document.getElementById('countdown');

const countdown = setInterval(() => {
  if (timeLeft <= 0) {
    clearInterval(countdown); // Időzítő leállítása
    countdownElement.textContent = "Idő lejárt!";
  } else {
    countdownElement.textContent = `${timeLeft} másodperc van hátra`;
    timeLeft--;
  }
}, 1000); // Minden másodpercben frissül
