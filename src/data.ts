import { generateAnswers, generateQuestions } from "./utils";
import { QuestionType } from "./globalClasses/Question";
import { AnswerType } from "./globalClasses/Answer";

let dummyQuestions: QuestionType[] = []; // array of questions, questions already contains anwers. Hence full data is ready
let dummyAnswers: AnswerType[] = [];

generateQuestions(dummyQuestions);
generateAnswers(dummyQuestions, dummyAnswers);

export { dummyQuestions, dummyAnswers };
