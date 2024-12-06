let users = [];
let rooms = [];
let questions = [];
let answers = [];

function userJoin(id, username, room){
    const user = { id, username, room };
    users.push(user);
    return user;
}

function userLeave(id){
    let idx = users.findIndex(user => user.id === id);
    if (idx != -1){
        users.splice(idx, 1);
    }
    return users;
}

function roomLeave(room){
    let idx = rooms.findIndex(item => item === room);
    if (idx > -1){
        rooms.splice(idx, 1);
    }
    return rooms;
}

function getRoomUsers(room){
    return users.filter(user => user.room === room );
}

function getCurrentUser(id){
    return users.find(user => user.id === id);
}

function inRoomsList(room){
    return rooms.find(item => item === room ) ? true : false;
}

function newQuestion(room, question){
    const quest = { room, question };
    questions.push(quest);
    return questions;
}

function lastQuestion(room){
    return questions.find(item => item.room === room) == 10 ? true : false;
}

function roomLastQuestion(room){
    return questions.find(item => item.room === room);
}

function countAnswersOnQuestion(question){
    return answers.find(item => item.question === question);
}

function answerQuestion(question, room, user, useranswer){
    let diff = 0
    if(useranswer > question.answer){
        diff = useranswer - question.answer
    }else{
        diff = question.answer - useranswer
    }

    const answer = { question, user, diff, room };
    answers.push(answer);
    return answers;
}

module.exports = {
    users,
    rooms,
    questions,
    answers,
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
}