import QuestionTitle from "../../homeScreen/qnaFeed/feedElement/questionPortion/questionTitle";
import QuestionDescription from "../../homeScreen/qnaFeed/feedElement/questionPortion/questionDescription";
import AddAnswerButton from "./addAnswerButton";
import Link from "next/link";
import styles from "./styles.module.css";

import { GET_QUESTION_TITLE_DESCRIPTION_ANSIDS } from "../../../../queries";
import { useQuery } from "@apollo/client";

export default function QuestionStream() {
  //data from query

  const {
    data: questionsData,
    loading,
    error,
  } = useQuery(GET_QUESTION_TITLE_DESCRIPTION_ANSIDS);

  if (loading) {
    return <p>Fetching questions...</p>;
  }

  if (error) {
    return <p>Something went wrong! {error.message}</p>;
  }

  let render: JSX.Element[] = [];
  const questions = questionsData.questions;

  for (const question of questions) {
    const numAnswers = question.answerIds.length;

    const questionPageUrl = `/q/${question.id}`;

    render.push(
      <div key={question.id} className={styles.streamCard}>
        <div className={styles.left}>
          <QuestionTitle questionTitle={question.title} />
          <QuestionDescription questionDescription={question.description} />

          <Link href={questionPageUrl}>
            <span>{numAnswers} answers</span>
          </Link>
        </div>

        <AddAnswerButton qid={question.id} />
      </div>
    );
  }

  return <main className={styles.main}>{render}</main>;
}
