import CategoryButton from "./categoryButton";
import styles from "./styles.module.css";
import { QuestionType } from "../../../../../globalClasses/Question";
import { Dispatch, SetStateAction } from "react";

type QuestionCardCategoriesPropsType = {
  question: QuestionType;
  setQuestion: Dispatch<SetStateAction<QuestionType>>;
  categories: string[];
};

export default function QuestionCardCategories({
  question,
  setQuestion,
  categories,
}: QuestionCardCategoriesPropsType) {
  const defaultDiv = (
    <div className={styles.defaultDiv}>No categories selected yet.</div>
  );

  function handleAddCategory(): boolean {
    let inputCategory = prompt("Please Enter a category", "");

    if (inputCategory) inputCategory = inputCategory.trim();

    if (!inputCategory) {
      alert("Please enter non-empty category!");
      return false;
    }

    inputCategory = inputCategory.toLowerCase();
    // check if already present in categories?

    if (categories.includes(inputCategory)) {
      alert("Category already exists");
      return false;
    }

    // setQuestion

    setQuestion({
      ...question,
      categories: categories.concat(inputCategory),
    });

    return true;
  }

  function getStyleIfNoCategories({ type }: { type: "ABSENT" | "PRESENT" }) {
    if (type === "ABSENT") {
      if (!categories?.length) {
        return styles.visibleDiv;
      }
      return styles.hiddenDiv;
    }
    if (!categories?.length) {
      return styles.hidden;
    }

    return styles.renderDiv;
  }

  let categoriesArray: JSX.Element[] = [];
  // Add categories in div

  categories.forEach((category, index) => {
    categoriesArray.push(
      <CategoryButton
        question={question}
        setQuestion={setQuestion}
        name={category}
        index={index}
        key={index}
      />
    );
  });

  const renderDiv = categoriesArray;

  return (
    <div className={styles.categoriesWrapper}>
      <label className={styles.label}> Categories </label>

      <div className={styles.categories}>
        <div className={getStyleIfNoCategories({ type: "ABSENT" })}>
          No categories added yet
        </div>
        <div className={getStyleIfNoCategories({ type: "PRESENT" })}>
          {renderDiv}
        </div>
        <button className={styles.addButton} onClick={handleAddCategory}>
          Add Category
        </button>
      </div>
    </div>
  );
}
