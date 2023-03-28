import styles from "./styles.module.css";
import { QuestionType } from "../../../../../../globalClasses/Question";
import { Dispatch, SetStateAction } from "react";

type CategoryButtonPropsType = {
  question: QuestionType;
  setQuestion: Dispatch<SetStateAction<QuestionType>>;
  name: string;
  index: number;
};

export default function CategoryButton({
  question,
  setQuestion,
  name,
  index,
}: CategoryButtonPropsType) {
  function handleRemove() {
    const categories = question.categories,
      newCategories = categories.filter((item, _index) => index != _index);

    console.log("newCategries ", newCategories);

    setQuestion({
      ...question,
      categories: newCategories,
    });
  }

  return (
    <div className={styles.wrapper}>
      {name}
      <button className={styles.button} onClick={handleRemove}>
        -
      </button>
    </div>
  );
}
