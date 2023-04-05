import { useQuery } from "@apollo/client";
import { GET_FIRST_N_ANSWERS_FOR_QUESTIONID } from "../../../../../../queries";
import { AnswerType } from "../../../../../../globalClasses/Answer";
import AnswerDescription from "./answerDescription";
import Votes from "../../../../../votes";
import styles from "./styles.module.css";

type AnswerPortionProps = {
  questionId: string;
  count: number;
  clampDescription: boolean;
};

const AnswerPortion = ({
  questionId,
  count,
  clampDescription = false,
}: AnswerPortionProps): JSX.Element => {
  //fetch first answer for qid

  const {
    data: answerData,
    error: answerError,
    loading: answerLoading,
  } = useQuery(GET_FIRST_N_ANSWERS_FOR_QUESTIONID, {
    variables: { num: count, questionId: questionId },
  });

  if (answerLoading) {
    return <i>Loading answer...</i>;
  }

  if (answerError) {
    return (
      <p>
        Something went wrong!<i>{answerError.message}</i>
      </p>
    );
  }

  if (!answerData?.question?.firstNAnswers?.length) {
    return <span>No answers yet!</span>;
  }

  const length: number = answerData.question.firstNAnswers.length;

  return answerData.question.firstNAnswers.map(
    (answer: AnswerType, index: number) => (
      <div className={styles.wrapper} key={answer.id}>
        <div className={styles.answerTopInfo}>Top Answer:</div>
        <div className={styles.answerWithVotes}>
          {clampDescription ? (
            <AnswerDescription answerDescription={answer.description} />
          ) : (
            answer.description
          )}
          <Votes answer={answer} />
        </div>
      </div>
    )
  );
};

export default AnswerPortion;
