import styles from "./styles.module.css";
import { memo } from "react";

import AnswerPortion from "../../../../answerPortion/AnswerPortion";
import QuestionPortion from "./questionPortion";
import { useRouter } from "next/router";

type FeedElementPropsType = {
  questionId: string;
};

// add answer only to props

function FeedElement({ questionId }: FeedElementPropsType) {
  // get first answer for question prop

  return (
    <div className={styles.feedElement}>
      <QuestionPortion questionId={questionId} />
      <AnswerPortion
        questionId={questionId}
        count={1}
        clampDescription={true}
      />
    </div>
  );
}

export default memo(FeedElement);
