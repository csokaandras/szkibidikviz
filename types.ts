export class Room {
  name: string;
  users: User[];
  questions: Question[];
  answers: Answer[];

  constructor(name: string) {
    this.name = name;
    this.users = [];
    this.questions = [];
    this.answers = [];
  }

  getUser = (id: string) => this.users.find(x => x.id == id);
  getUserByName = (name: string) => this.users.find(x => x.username == name);
  newQuestion = (question: Question) => this.questions.push(question);

  userJoin(user: User) {
    if (this.users.find(x => x.id == user.id))
      throw Error('user already in room');

    this.users.push(user);
  }

  userLeave(user: User | string) {
    // if user is id we convert it to user object
    if (typeof user == 'string')
      user = this.getUser(user);

    this.users = this.users.filter(x => x != user);
  }

  get isAtMaxQuestionCount() {
    return this.questions.length == 10 ? true : false;
  }

  tryAnswerQuestion(user, msg) {
    const answer = parseInt(msg);
    const lastQuestion = this.questions[this.questions.length - 1];

    const diff = answer > lastQuestion.answer
      ? answer - lastQuestion.answer
      : lastQuestion.answer - answer;

    const answerInstance = new Answer();
    answerInstance.question = lastQuestion;
    answerInstance.diff = diff;
    answerInstance.user = user;

    this.answers.push(answerInstance);
  }
}

export class User {
  id: string;
  username: string;
}

export class Question {
  id: number;
  question: string;
  answer: number;
}

export class Answer {
  user: User;
  question: Question;
  diff: number;
}
