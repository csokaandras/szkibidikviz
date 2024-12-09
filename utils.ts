import { Room, User, Answer, Question } from "./types";

let rooms: Room[] = [];

function createRoom(name: string) {
  let room: Room = new Room(name);

  rooms.push(room);
}

function getRoom(name: string): Room {
  return rooms.find((room) => room.name == name);
}

function userJoin(id: string, username: string, room: Room) {
  const user: User = { id, username };

  room.users.push(user);

  return user;
}

function userLeave(id) {
  let idx: number;
  let userroom: Room;
  rooms.forEach((room) => {
    userroom = room;
    idx = room.users.findIndex((user) => user.id === id);
  });

  if (idx != -1) {
    userroom.users.splice(idx, 1);
  }

  return userroom.users;
}

function roomLeave(room: Room) {
  let idx = rooms.findIndex((item) => item === room);

  if (idx > -1) {
    rooms.splice(idx, 1);
  }

  return rooms;
}

function getRoomUsers(roomName: string) {
  return rooms.find((room) => room.name == roomName).users;
}

function getUser(name) {
  rooms.forEach((room) => {
    return room.users.find((user) => user.username === name);
  });
}

function inRoomsList(roomName: string) {
  return !!rooms.find((item) => item.name === roomName);
}

function newQuestion(room: Room, question: Question) {
  room.questions.push(question);
  return room.questions;
}

function isAtMaxQuestionCount(room: Room) {
  return room.questions.length == 10 ? true : false;
}

function roomLastQuestion(room: Room) {
  const filteredQuestions = room.questions;

  // return last item of the filtered list
  return filteredQuestions[filteredQuestions.length - 1];
}

function getAnswersForQuestion(room: Room, question: Question) {
  return room.answers.find((item) => item.question === question);
}

function tryAnswerQuestion(user, msg) {
  const answer = parseInt(msg);

  // get last question in user.room

  // create new answer and push
}

/*
function answerQuestion(question, room, user, useranswer) {
  let diff = 0;

  if (useranswer > question.answer) {
    diff = useranswer - question.answer;
  } else {
    diff = question.answer - useranswer;
  }

  const answer: Answer  = {question, user, diff};
  room.answers.push(answer);
  return room.answers;
}
*/

module.exports = {
  rooms,
  User,
  Question,
  Answer,
  Room,
  userJoin,
  userLeave,
  roomLeave,
  getRoomUsers,
  getUser,
  inRoomsList,
  newQuestion,
  roomLastQuestion,
  tryAnswerQuestion,
  isAtMaxQuestionCount,
  createRoom,
  getRoom,
};
