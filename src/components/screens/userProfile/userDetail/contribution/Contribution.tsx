import Link from "next/link";

import styles from "./styles.module.css";
import { USER_PROFILE_FIELDS } from "../../../../../constants";

type ContributionPropsType = {
  type: string;
  contribution: [
    { text: string; href: { pathname: string; query: { qid: string } } }
  ];
};

export default function Contribution({
  type,
  contribution,
}: ContributionPropsType): JSX.Element | null {
  const values: JSX.Element[] = [];
  let i = 0;
  for (const value of contribution) {
    const { text } = value;

    values.push(
      <Link key={value.href.query.qid} href={value.href}>
        <span className={styles.span}>{i > 0 ? ", " + text : text}</span>
      </Link>
    );

    ++i;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.type}>
        <i>{USER_PROFILE_FIELDS.keysLabel[type]}</i>
      </div>
      <div className={styles.values}>
        {values.length == 0 ? (
          <span>No {USER_PROFILE_FIELDS.keysLabel[type]} yet</span>
        ) : (
          values
        )}
      </div>
    </div>
  );
}
