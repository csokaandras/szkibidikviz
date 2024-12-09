import dotenv from 'dotenv';
import express, { Express } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import * as ejs from 'ejs'
import * as moment from 'moment';
import session from 'express-session';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const db = require('./assets/database');
const port = process.env.PORT;

const {
  users,
  rooms,
  questions,
  answers,
  User,
  Question,
  Answer,
  Room,
  userJoin,
  userLeave,
  getRoomUsers,
  getCurrentUser,
  inRoomsList,
  roomLeave,
  newQuestion,
  answerQuestion,
  lastQuestion,
  roomLastQuestion,
  countAnswersOnQuestion,
} = require('./utils');

app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/chat/:room/:user', (req, res) => {
  // let { name, room } = req.body;
  session.user = req.params.user;
  session.room = req.params.room;

  res.render('chat.ejs', { user: session.user, room: session.room });
});

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('getRoomList', () => {
    io.emit('updateRoomList', rooms);
  });

  socket.on('joinToChat', () => {
    let user = userJoin(socket.id, session.user, session.room);

    socket.join(session.room);

    io.to(session.room).emit('updateRoomUsers', getRoomUsers(session.room));
    io.to(session.room).emit('userConnected', user);

    if (getRoomUsers(session.room).length >= 2) {
      io.to(session.room).emit('showNewQuestion', roomLastQuestion(session.room));
    }

    if (!inRoomsList(session.room)) {
      rooms.push(session.room);
      io.emit('updateRoomList', rooms);
      io.to(session.room).emit('startQuiz');
    }
  });

  socket.on('getNewQuestion', () => {
    db.query(`SELECT * FROM questions ORDER BY rand() limit 1;`, (err, results) => {
      if (err) {
        console.log('Hiba a szerverhez való csatlakozáskor');
        return;
      }

      console.log(results[0]);
      io.to(session.room).emit('showNewQuestion', results[0])
      newQuestion(session.room, results[0]);
    });
  });

  socket.on('leaveChat', () => {
    let user = getCurrentUser(socket.id);

    userLeave(socket.id);

    io.to(user.room).emit('message', 'System', `${user.username} left the chat...`);
    
    if (getRoomUsers(user.room).length == 0) {
      roomLeave(user.room);
      io.emit('updateRoomList', rooms);
    }
  });

  socket.on('sendMsg', (msg) => {
    let user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', user, msg);
  });
});

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
