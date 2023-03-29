import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./styles.module.css";
import HomeButton from "../../homeButton";

import { QuestionType } from "../../../globalClasses/Question";

import { useLazyQuery } from "@apollo/client";
import { GET_QUESTION_TITLE_AND_DESCRIPTION } from "../../../queries";
import AnswerPortion from "../../answerPortion";

export default function QuestionLandingPage() {
  const router = useRouter();
  let qid = router.query?.qid;

  const [
    getQuestion,
    { loading: loadingQuestion, error: questionError, data: questionData },
  ] = useLazyQuery(GET_QUESTION_TITLE_AND_DESCRIPTION);

  let question: undefined | QuestionType = questionData?.question,
    questionTitle: string = question?.title || "",
    questionDescription: undefined | string = question?.description || "";
  console.log(" loading ", loadingQuestion);
  console.log("ready-router", router.isReady, "qid", qid);
  console.log("questionData", questionData);

  useEffect(() => {
    if (router.isReady) {
      qid = router.query.qid;
      getQuestion({ variables: { questionId: qid } });
    }
  }, []);

  if (loadingQuestion) {
    return <p>Getting question info..</p>;
  }

  if (questionError) {
    return (
      <p>
        Something went wrong! <i>{questionError.message}</i>
      </p>
    );
  }

  return (
    <div className={styles.landingPageWrapper}>
      <div className={styles.questionTitleWrapper}>
        <HomeButton />
        <div className={styles.titleText}>{questionTitle}</div>
      </div>

      <div className={styles.landingPageDescriptionWrapper}>
        {questionDescription}

        <hr className={styles.hr} />
      </div>
      <div className={styles.answerPortion}>
        {questionData && (
          <AnswerPortion
            questionId={question!.id}
            count={100}
            clampDescription={false}
          />
        )}
      </div>
    </div>
  );
}
