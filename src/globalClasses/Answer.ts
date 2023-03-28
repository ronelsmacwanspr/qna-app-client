export type AnswerType = {
  id: string;
  questionId: string;
  description: string;
  userId: number;
  datePosted: string;
  numUpvotes: number;
  numDownvotes: number;
};

export class Answer {
  static count = 0;
  numDownvotes: number;
  id: string;
  questionId: string;
  description: string;
  userId: number;
  datePosted: string;
  numUpvotes: number;
  constructor({
    id,
    questionId,
    description,
    userId,
    datePosted,
    numUpvotes,
    numDownvotes,
  }: AnswerType) {
    this.id = id;
    this.questionId = questionId;
    this.description = description;
    this.userId = userId;
    this.datePosted = datePosted;
    this.numUpvotes = numUpvotes;
    this.numDownvotes = numDownvotes;

    Answer.count++;
  }
}
