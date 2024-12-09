export class Room {
  name: string;
  users: User[];
  questions: Question[];
  answers: Answer[];
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
