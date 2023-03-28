import styles from "./styles.module.css";
import { useRouter } from "next/router";

export default function AddAnswerButton({ qid }: { qid: string }) {
  //link to add answer of a seperate question

  const router = useRouter();

  return (
    <div>
      <button
        className={styles.button}
        onClick={() =>
          router.push({
            pathname: "/answer/[qid]",
            query: { qid: qid },
          })
        }
      >
        +
      </button>
    </div>
  );
}
