import styles from "./styles.module.css";

type AnswerDescriptionPropsType = {
  answerDescription: string | null;
};

export default function AnswerDescription({
  answerDescription,
}: AnswerDescriptionPropsType) {
  return (
    <div className={styles.answerDescription}>
      {answerDescription || "No answers yet..."}
    </div>
  );
}
