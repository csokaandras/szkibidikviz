import { Room, User, Answer, Question } from "./types";

export let rooms: Room[] = [];

export function createRoom(name: string) {
  let room: Room = new Room(name);

  rooms.push(room);
}

export function getRoom(name: string): Room {
  return rooms.find((room) => room.name == name);
}

export function userJoin(id: string, username: string, room: Room) {
  const user: User = { id, username };

  room.users.push(user);

  return user;
}

export function userLeave(id) {
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

export function roomLeave(room: Room) {
  let idx = rooms.findIndex((item) => item === room);

  if (idx > -1) {
    rooms.splice(idx, 1);
  }

  return rooms;
}

export function getRoomUsers(roomName: string) {
  return rooms.find((room) => room.name == roomName).users;
}

export function getUser(name) {
  rooms.forEach((room) => {
    console.log(room.users.find(user => user.username == name))
    return room.users.find((user) => user.username == name);
  });
}

export function inRoomsList(roomName: string) {
  return !!rooms.find((item) => item.name === roomName);
}

export function newQuestion(room: Room, question: Question) {
  room.questions.push(question);
  return room.questions;
}

export function isAtMaxQuestionCount(room: Room) {
  return room.questions.length == 10 ? true : false;
}

export function roomLastQuestion(room: Room) {
  const filteredQuestions = room.questions;

  // return last item of the filtered list
  return filteredQuestions[filteredQuestions.length - 1];
}

export function getAnswersForQuestion(room: Room, question: Question) {
  return room.answers.find((item) => item.question === question);
}

export function tryAnswerQuestion(user, msg) {
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
