import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./styles.module.css";
import HomeButton from "../../homeButton";

import { QuestionType } from "../../../globalClasses/Question";

import { useLazyQuery } from "@apollo/client";
import { GET_QUESTION_FROM_ID } from "../../../queries";
import AnswerCard from "../../answerCard";
import { AnswerType } from "../../../globalClasses/Answer";

import UserCard from "./userCard/UserCard";

interface QueriedAnswer extends AnswerType {
  user: {
    id: number;
    name: string;
  };
}
export default function QuestionLandingPage() {
  const router = useRouter();
  let qid = router.query?.qid;

  const [
    getQuestion,
    { loading: loadingQuestion, error: questionError, data: questionData },
  ] = useLazyQuery(GET_QUESTION_FROM_ID);

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

  let answerCards = [<div>No answers yet</div>],
    userName = questionData?.question?.user?.name,
    questionPostDate = questionData?.question?.datePosted;

  if (questionData?.question?.answers?.length) {
    const answers = questionData.question.answers;
    answerCards = answers.map((answer: QueriedAnswer) => (
      <AnswerCard key={answer.id} answerId={answer.id} />
    ));
  }

  return (
    <div className={styles.landingPageWrapper}>
      <HomeButton />

      {questionData && (
        <main className={styles.main}>
          <section className={styles.questionSection}>
            <div className={styles.title}>
              <div className={styles.titleText}>{questionTitle}</div>
            </div>

            <div className={styles.descCardWrapper}>
              <div className={styles.description}>{questionDescription}</div>
              <i>Author:</i>
              <UserCard userName={userName} datePosted={questionPostDate} />
            </div>
          </section>
          <hr className={styles.hr} />
          <div className={styles.answerPortion}>{answerCards}</div>
        </main>
      )}
    </div>
  );
}
