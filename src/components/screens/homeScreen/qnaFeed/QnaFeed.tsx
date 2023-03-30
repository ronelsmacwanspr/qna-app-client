// this file will render feedElements in flexbox

import FeedElement from "./feedElement";
import styles from "./styles.module.css";

import { QuestionType } from "../../../../globalClasses/Question";

import { GET_QUESTIONS_IDS } from "../../../../queries";
import { useQuery } from "@apollo/client";

export default function QnAFeed() {
  let feed: JSX.Element[] = [];

  const {
    data: questionsData,
    loading: questionsLoading,
    error: questionsError,
  } = useQuery(GET_QUESTIONS_IDS);

  if (questionsLoading) {
    return <h2>Loading...</h2>;
  }

  if (questionsError) {
    return <h2>Something went wrong! {questionsError?.message}</h2>;
  }

  let questions: QuestionType[] = questionsData?.questions;

  console.log("from server ques->", questionsData.questions);

  questions.forEach((question) => {
    feed.push(<FeedElement questionId={question.id} key={question.id} />);
  });

  return <div className={styles.qnaFeedWrapper}>{feed}</div>;
}
