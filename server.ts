import dotenv from 'dotenv';
import express, { Express } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import * as ejs from 'ejs';
import * as moment from 'moment';
import session from 'express-session';
import { Room, User, Answer, Question } from './types';
import { App } from './utils';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const db = require('./assets/database');
const port = process.env.PORT;

const quiz = new App();

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
  socket.on('getRoomList', () => {
    io.emit('updateRoomList', quiz.getRoomNames());
  });

  socket.on('joinToChat', () => {
    socket.join(session.room);
    let room: Room;

    if (!quiz.doesRoomExist(session.room)) {
      room = quiz.createRoom(session.room);

      io.emit('updateRoomList', quiz.getRoomNames());
      // io.to(session.room).emit('startQuiz');
    } else room = quiz.getRoom(session.room);

    let user: User = new User();
    user.id = socket.id;
    user.username = session.user;

    room.userJoin(user);
    io.to(session.room).emit('userConnected', user);

    if (room.users.length >= 2) {
      io.to(session.room).emit('showNewQuestion');
    }
  });

  socket.on('getNewQuestion', () => {
    let room = quiz.getRoom(session.room);

    db.query(`SELECT * FROM questions ORDER BY rand() limit 1;`, (err, results) => {
      if (err) {
        console.log('Hiba a szerverhez való csatlakozáskor');
        return;
      }

      console.log(results[0]);
      io.to(session.room).emit('showNewQuestion', results[0]);

      const question: Question = results[0];

      room.newQuestion(question);
    });
  });

  socket.on('leaveChat', () => {
    let room = quiz.getRoom(session.room);
    let user = room.getUser(socket.id);

    room.userLeave(user);

    io.to(room.name).emit('message', 'System', `${user.username} left the chat...`);

    if (room.users.length == 0) {
      io.emit('updateRoomList', quiz.getRoomNames());
    }
  });

  socket.on('sendMsg', (msg) => {
    let room = quiz.getRoom(session.room);
    let user = room.getUser(socket.id);

    room.tryAnswerQuestion(user, msg);

    io.to(room.name).emit('message', user, msg);
  });
});

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
