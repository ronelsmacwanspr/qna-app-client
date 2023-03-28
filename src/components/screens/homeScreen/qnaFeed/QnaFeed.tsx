// this file will render feedElements in flexbox

import FeedElement from "./feedElement";
import styles from "./styles.module.css";
import { useLocalStorage } from "../../../../localStorage/localStorage";
import { STATE_KEYS } from "../../../../constants";
import { dummyAnswers, dummyQuestions } from "../../../../data";
import { getAnswerWithId } from "../../../../utils";

import { QuestionType } from "../../../../globalClasses/Question";
import { AnswerType } from "../../../../globalClasses/Answer";

import {
  GET_QUESTIONS,
  GET_FIRST_ANSWER_FOR_EACH_QUESTION,
} from "../../../../queries";
import { QueryResult, useQuery } from "@apollo/client";

export default function QnAFeed() {
  let feed: JSX.Element[] = [];
  // read from server

  // const [data, setData] = useLocalStorage<QuestionType[]>(
  //   STATE_KEYS.data,
  //   dummyQuestions
  // );
  // const [answers, setAnswers] = useLocalStorage<AnswerType[]>(
  //   STATE_KEYS.answers,
  //   dummyAnswers
  // );

  const {
    data: questionsData,
    loading: questionLoading,
    error: questionError,
  } = useQuery(GET_QUESTIONS);
  const {
    data: firstAnswerData,
    loading: answerLoading,
    error: answerError,
  } = useQuery(GET_FIRST_ANSWER_FOR_EACH_QUESTION, {
    variables: { num: 1 },
  });

  let questions: QuestionType[] = questionsData?.questions;

  if (questionLoading || answerLoading) {
    return <h2>Loading...</h2>;
  }

  if (questionError || answerError) {
    return (
      <h2>
        Something went wrong! {questionError?.message} {answerError?.message}
      </h2>
    );
  }

  console.log("from server ques->", questionsData?.questions);

  console.log("from server ans->", firstAnswerData);

  console.assert(questions?.length === firstAnswerData?.questions?.length);

  questions.forEach((question, index) => {
    const firstAnswer = firstAnswerData.questions[index].firstNAnswers[0];
    console.log("firstAnswer", firstAnswer);
    feed.push(
      <FeedElement
        question={question}
        key={question.id}
        answer={firstAnswer as AnswerType}
      />
    );
  });

  return <div className={styles.qnaFeedWrapper}>{feed}</div>;
}
