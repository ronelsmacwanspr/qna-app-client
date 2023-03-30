import styles from "./styles.module.css";
import FeedHeader from "./qnaFeed/feedHeader";
import QnAFeed from "./qnaFeed";

export default function HomeScreen(): JSX.Element | null {
  return (
    <div>
      <FeedHeader />

      <main>
        <div className={styles.mainFeed}>
          <QnAFeed />
        </div>
      </main>
    </div>
  );
}
