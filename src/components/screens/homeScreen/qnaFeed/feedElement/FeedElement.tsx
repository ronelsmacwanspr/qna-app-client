import styles from "./styles.module.css";
import QuestionTitle from "./questionTitle";
import QuestionDescription from "./questionDescription";
import AnswerDescription from "./answerDescription";
import Votes from "../../../../votes";
import Link from "next/link";
import React from "react";
import { QuestionType } from "../../../../../globalClasses/Question";
import { AnswerType } from "../../../../../globalClasses/Answer";

type FeedElementPropsType = {
  question: QuestionType;
  answer: AnswerType | null;
};

function FeedElement({ question, answer }: FeedElementPropsType) {
  const answerDescription =
      question.answerIds.length == 0 ? null : answer!.description,
    questionDescription = !question.description ? null : question.description;

  const location = `/q/${question.id}`;

  return (
    <div className={styles.feedElement}>
      <Link href={location}>
        <QuestionTitle questionTitle={question.title} />
      </Link>
      <QuestionDescription questionDescription={questionDescription} />
      <AnswerDescription answerDescription={answerDescription} />
      {answer ? <Votes answer={answer} /> : null}
    </div>
  );
}

export default React.memo(FeedElement);
