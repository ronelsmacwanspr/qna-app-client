import Votes from "../votes";
import styles from "./styles.module.css";
import UserCard from "../screens/questionLandingPage/userCard/UserCard";
import { useQuery } from "@apollo/client";
import { GET_ANSWER_FROM_ID } from "../../queries";

type AnswerCardPropsType = {
  answerId: string;
};
function AnswerCard({ answerId }: AnswerCardPropsType) {
  // console.log("question ", question);
  const { data, error, loading } = useQuery(GET_ANSWER_FROM_ID, {
    variables: { answerId },
  });

  if (loading) {
    return <p>Getting answer data...</p>;
  }

  if (error) {
    return <p>Something went wrong! {error.message}</p>;
  }

  console.log("answer data", data);
  const answer = data.answer;

  return (
    <div className={styles.wrapper}>
      <UserCard userName={answer.user.name} datePosted={answer.datePosted} />
      <div className={styles.answerWithVotes}>
        <div>
          <div>{answer.description}</div>

          <Votes answer={answer} />
        </div>
      </div>
    </div>
  );
}

export default AnswerCard;
