import styles from "./styles.module.css";
import { useRouter } from "next/router";

export default function HomeButton() {
  const router = useRouter();

  function handleClick(): void {
    router.push("/");
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      <img className={styles.icon} src="/home.png" alt="home button"></img>
    </button>
  );
}
