import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const SHOW_HEADER_BOX_SHADOW_SCROLL_LIMIT = 20;

export default function FeedHeader() {
  const headerRef = useRef<HTMLElement>();

  const scrollListener = () => {
    if (window.scrollY > SHOW_HEADER_BOX_SHADOW_SCROLL_LIMIT) {
      headerRef!.current!.style.boxShadow = "0 3px 5px rgba(57, 63, 72, 0.3)";
    } else {
      headerRef!.current!.style.boxShadow = "none";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <header className={styles.header} ref={headerRef}>
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
