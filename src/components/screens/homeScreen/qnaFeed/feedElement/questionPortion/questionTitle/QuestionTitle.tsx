import styles from "./styles.module.css";

type QuestionTitlePropsType = {
  questionTitle: string;
};

export default function QuestionTitle({
  questionTitle,
}: QuestionTitlePropsType) {
  return <div className={styles.questionTitle}>{questionTitle}</div>;
}
