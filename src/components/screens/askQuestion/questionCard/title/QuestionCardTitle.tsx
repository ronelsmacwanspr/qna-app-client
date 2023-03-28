import styles from "./styles.module.css";
import { Dispatch, SetStateAction, useRef, ChangeEvent } from "react";
import { QuestionType } from "../../../../../globalClasses/Question";

type QuestionCardTitleProps = {
  question: QuestionType;
  setQuestion: Dispatch<SetStateAction<QuestionType>>;
  title: string;
};

export default function QuestionCardTitle({
  question,
  setQuestion,
  title,
}: QuestionCardTitleProps) {
  const targetRef = useRef(null);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const text = event.target.value;

    console.log("text ", text);

    //setQuestion
    setQuestion({ ...question, title: text });
  }

  return (
    <div className={styles.titleWrapper}>
      <div className={styles.labelWrapper}>
        <label htmlFor="questionCardTitle" className={styles.label}>
          Title:
        </label>
      </div>

      <textarea
        ref={targetRef}
        onChange={handleChange}
        value={title}
        placeholder="Enter a title"
        className={styles.textarea}
        id="questionCardTitle"
      />
    </div>
  );
}
