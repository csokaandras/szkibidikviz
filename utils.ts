let users: User[] = [];
let rooms: string[] = [];
let questions: Question[] = [];
let answers: Answer[] = [];

class User {
  id: string
  username: string;
  room: string;
}
class Question {
  id:number
  question: string
  answer: number
  room: string
}

class Answer {
  user: User
  question: Question
  diff: number
  room: string
}

function userJoin(id, username, room) {
  const user: User = {id, username, room} ;

  users.push(user);

  return user;
}

function userLeave(id) {
  let idx = users.findIndex((user) => user.id === id);

  if (idx != -1) {
    users.splice(idx, 1);
  }

  return users;
}

function roomLeave(room) {
  let idx = rooms.findIndex((item) => item === room);

  if (idx > -1) {
    rooms.splice(idx, 1);
  }

  return rooms;
}

function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

function inRoomsList(room) {
  return rooms.find((item) => item === room) ? true : false;
}

function newQuestion(room, question) {
  const quest: Question = new Question;
  quest.id = question.id
  quest.question = question.question
  quest.answer = question.answer
  quest.room = room

  questions.push(quest);

  return questions;
}

function lastQuestion(room) {
  return questions.filter(item => item.room === room).length == 10 ? true : false;
}

function roomLastQuestion(room) {
  console.log(questions)
  return questions.find((item) => item.room === room);
}

function countAnswersOnQuestion(question) {
  return answers.find((item) => item.question === question);
}

function tryAnswerQuestion(user, msg) {

}

function answerQuestion(question, room, user, useranswer) {
  let diff = 0;

  if (useranswer > question.answer) {
    diff = useranswer - question.answer;
  } else {
    diff = question.answer - useranswer;
  }

  const answer: Answer  = {question, user, diff, room};
  answers.push(answer);

  return answers;
}

module.exports = {
  users,
  rooms,
  questions,
  answers,
  User,
  Question,
  Answer,
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
