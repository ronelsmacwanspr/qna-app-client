import styles from "./styles.module.css";
import Link from "next/link";

export default function FeedHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.leftHeader}>
        <Link href="/askQuestion">
          {" "}
          <div>Ask</div>{" "}
        </Link>
        <Link href="/answer">
          {" "}
          <div>Answer</div>{" "}
        </Link>
      </div>
      <Link href="/userProfile">
        <div>Profile</div>{" "}
      </Link>
    </header>
  );
}
