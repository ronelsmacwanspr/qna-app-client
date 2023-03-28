import styles from "./styles.module.css";
import FeedHeader from "./qnaFeed/feedHeader";
import QnAFeed from "./qnaFeed";
import { useEffect, useState } from "react";

export default function HomeScreen(): JSX.Element | null {
  // const [hydrated, setHydrated] = useState<boolean>(false);

  // useEffect(() => {
  //   setHydrated(true);
  // }, [hydrated]);

  // if (!hydrated) return null;

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
