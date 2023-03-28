import Votes from "../votes";
import styles from "./styles.module.css";
import React from "react";

import { AnswerType } from "../../globalClasses/Answer";
import { Updater } from "use-immer";

type AnswerCardPropsType = {
  answer: AnswerType;
  setAnswers: Updater<AnswerType[]>;
};
function AnswerCard({ answer, setAnswers }: AnswerCardPropsType) {
  // console.log("question ", question);
  console.assert(answer.description);

  return (
    <div className={styles.answerCardWrapper}>
      <div>
        <div>{answer.description}</div>

        <Votes answer={answer} setAnswers={setAnswers} />
      </div>
    </div>
  );
}

export default React.memo(AnswerCard);
