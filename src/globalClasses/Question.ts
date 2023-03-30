export type QuestionType = {
  id: string;
  userId: number;
  datePosted: string;
  categories: string[];
  title: string;
  description: string;
  answerIds: string[];
};

//   id,
//   userId,
//   datePosted,
//   categories,
//   title,
//   description,
//   answers,
// }: QuestionType): void {
//   this.id = id;
//   this.userId = userId;
//   this.datePosted = datePosted;
//   this.categories = !categories ? [] : categories;
//   this.title = title;
//   this.description = description;
//   this.answers = !answers ? [] : answers;
// } as any as { new (obj: QuestionType): QuestionType };

export class Question {
  id: string;
  userId: number;
  datePosted: string;
  categories: string[];
  title: string;
  description: string;
  answerIds: string[];

  constructor({
    id,
    userId,
    datePosted,
    categories,
    title,
    description,
    answerIds,
  }: QuestionType) {
    this.id = id;
    this.userId = userId;
    this.datePosted = datePosted;
    this.categories = !categories ? [] : categories;
    this.title = title;
    this.description = description;
    this.answerIds = !answerIds ? [] : answerIds;
  }
}
