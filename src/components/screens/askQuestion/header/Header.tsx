import HomeButton from "../../../homeButton";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <header className={styles.headerWrapper}>
      <HomeButton />
      <h2 className={styles.headerTitle}>
        Get your questions answered by our community!
      </h2>
    </header>
  );
}
