import { useRouter } from "next/router";
import { useLocalStorage } from "../../../localStorage/localStorage";
import AnswerCard from "../../answerCard";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import HomeButton from "../../homeButton";
import { STATE_KEYS } from "../../../constants";
import { dummyAnswers, dummyQuestions } from "../../../data";
import { getAnswerWithId } from "../../../utils";

import { QuestionType } from "../../../globalClasses/Question";
import { AnswerType } from "../../../globalClasses/Answer";

export default function QuestionLandingPage() {
  const router = useRouter();
  const [data, setData] = useLocalStorage<QuestionType[]>(
    STATE_KEYS.data,
    dummyQuestions
  );
  const [answers, setAnswers] = useLocalStorage<AnswerType[]>(
    STATE_KEYS.answers,
    dummyAnswers
  );

  const [qid, setQid] = useState<string>(router.query?.qid as string);

  let index: null | number = null,
    question: null | QuestionType = null,
    answersToDisplay: JSX.Element[] = [],
    questionTitle: string = "Loading...",
    questionDescription: string = "Loading...",
    inValid: boolean = false;

  console.log("ready-router", router.isReady);

  useEffect(() => {
    if (router.isReady) {
      const _qid = router.query.qid as string;
      setQid(_qid);
    }
  }, [router.isReady]);

  if (qid && data) {
    if (qid.length < 3 || qid[0] != "q" || qid[1] != "-") {
      inValid = true;
    } else {
      index = Number(qid.slice(2));

      console.log("index ", index);

      if (index < data.length) {
        question = data[index];

        questionTitle = question.title;

        questionDescription = question.description;

        data[index].answerIds.forEach((answerId) => {
          const answer = getAnswerWithId(answers, answerId);
          answersToDisplay.push(
            <AnswerCard
              key={answer.id}
              answer={answer}
              setAnswers={setAnswers}
            />
          );
        });
      } else {
        inValid = true;
      }
    }
  }

  console.log(" query ", router.query);

  // console.log("quees ", question);

  if (inValid) {
    return <h2>No such page exists {":("}</h2>;
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

      {answersToDisplay}
    </div>
  );
}
