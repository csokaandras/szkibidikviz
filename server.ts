import dotenv from 'dotenv';
import express, { Express } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import * as ejs from 'ejs'
import * as moment from 'moment';
import session from 'express-session';
import { Room, User, Answer, Question } from "./types";
import { createRoom, getRoom, getRoomUsers, inRoomsList, newQuestion, roomLeave, rooms, userJoin, userLeave } from './utils';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const db = require('./assets/database');
const port = process.env.PORT;

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
    io.emit('updateRoomList', rooms);
  });

  socket.on('joinToChat', () => {
    if (!inRoomsList(session.room)) {
      createRoom(session.room)
      let room = getRoom(session.room)
      room.newQuestion 
      io.emit('updateRoomList', rooms);
      io.to(session.room).emit('startQuiz');
    }
    let room = getRoom(session.room)
    
    let user: User = new User();
    user.id = socket.id
    user.username = session.user
    
    room.userJoin(user);
    console.log(getRoom(session.room))
    
    
    io.to(session.room).emit('updateRoomUsers', getRoomUsers(session.room));
    io.to(session.room).emit('userConnected', user);
    
    if (getRoomUsers(session.room).length >= 2) {
      io.to(session.room).emit('showNewQuestion', );
      socket.join(session.room);
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
    let room = getRoom(session.room)
    let user = room.getUser(socket.id);

    userLeave(socket.id);

    io.to(room.name).emit('message', 'System', `${user.username} left the chat...`);
    
    if (getRoomUsers(room.name).length == 0) {
      roomLeave(room);
      io.emit('updateRoomList', rooms);
    }
  });

  socket.on('sendMsg', (msg) => {
    let room = getRoom(session.room)
    let user = room.getUser(socket.id);

    room.tryAnswerQuestion(user, msg);

    io.to(room.name).emit('message', user, msg);
  });
});

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
