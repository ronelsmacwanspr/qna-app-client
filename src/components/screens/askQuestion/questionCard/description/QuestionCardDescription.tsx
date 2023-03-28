import styles from "./styles.module.css";
import { QuestionType } from "../../../../../globalClasses/Question";
import { Dispatch, SetStateAction, ChangeEvent } from "react";

type QuestionCardDescriptionPropsType = {
  question: QuestionType;
  setQuestion: Dispatch<SetStateAction<QuestionType>>;
  description: string;
};

export default function QuestionCardDescription({
  question,
  setQuestion,
  description,
}: QuestionCardDescriptionPropsType) {
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    let text = event.target.value;

    setQuestion({
      ...question,
      description: text,
    });
  }

  return (
    <div className={styles.descriptionWrapper}>
      <div className={styles.labelWrapper}>
        <label className={styles.label} htmlFor="questionCardDescription">
          {" "}
          Description:
        </label>
      </div>

      <textarea
        value={description}
        onChange={handleChange}
        className={styles.textarea}
        id="questionCardDescription"
      ></textarea>
    </div>
  );
}
