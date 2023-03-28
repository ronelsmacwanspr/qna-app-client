export type UserType = {
  id: number;
  name: string;
  from: string;
  bio: string;
  questions: string[];
  answers: string[];
  upvotedAnswers: string[];
  downvotedAnswers: string[];
  [index: string]: number | string | string[];
};

export class User {
  id: number;
  name: string;
  from: string;
  bio: string;
  questions: string[];
  answers: string[];
  upvotedAnswers: string[];
  downvotedAnswers: string[];

  constructor({ id, name, from, bio }: UserType) {
    this.id = id;
    this.name = name;
    this.bio = bio;
    this.from = from;
    this.questions = []; //ids
    this.answers = []; //ids
    this.upvotedAnswers = []; //ids
    this.downvotedAnswers = []; //ids}
  }
}
