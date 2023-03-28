import HomeButton from "../../../homeButton";
import styles from "./styles.module.css";

export default function AnswerQuestionHeader() {
  return (
    <header className={styles.headerWrapper}>
      <HomeButton />
      <h2 className={styles.headerTitle}>
        Select questions you wish to answer!
      </h2>
    </header>
  );
}
