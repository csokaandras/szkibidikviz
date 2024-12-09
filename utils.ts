let rooms: Room[] = [];

class Room{
  users: User[]
  questions: Question[]
  answers: Answer[]
}

class User {
  id: string
  username: string;
}
class Question {
  id:number
  question: string
  answer: number
}

class Answer {
  user: User
  question: Question
  diff: number
}

function userJoin(id: string, username: string, room: Room) {
  const user: User = {id, username} ;
  
  room.users.push(user);

  return user;
}

function userLeave(id) {
  let idx: number
  let userroom: Room
  rooms.forEach(room =>{
    userroom = room
    idx = room.users.findIndex((user) => user.id === id);
  })

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

function getRoomUsers(room:Room) {
  return room.users;
}

function getCurrentUser(id) {
  rooms.forEach(room =>{
    return room.users.find((user) => user.id === id);
  })
}

function inRoomsList(room: Room) {
  return rooms.find((item) => item === room) ? true : false;
}

function newQuestion(room: Room, question: Question) {
  room.questions.push(question);
  return room.questions;
}

function lastQuestion(room: Room) {
  return room.questions.length == 10 ? true : false;
}

function roomLastQuestion(room: Room) {
  console.log(room.questions)
  return room.questions[room.questions.length]
}

function countAnswersOnQuestion(room: Room, question: Question) {
  return room.answers.find((item) => item.question === question);
}

function answerQuestion(question: Question, room: Room, user: User, useranswer: number) {
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
  getCurrentUser,
  inRoomsList,
  newQuestion,
  lastQuestion,
  answerQuestion,
  roomLastQuestion,
  countAnswersOnQuestion,
};
