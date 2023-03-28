import styles from "./styles.module.css";

type QuestionDescriptionPropsType = {
  questionDescription: string | null;
};

export default function QuestionDescription({
  questionDescription,
}: QuestionDescriptionPropsType) {
  return (
    <>
      <div className={styles.questionDescription}>{questionDescription}</div>
      <hr className={styles.line} />
    </>
  );
}
