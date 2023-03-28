import { useLocalStorage } from "../../../../../localStorage/localStorage";
import Link from "next/link";

import styles from "./styles.module.css";
import { getAnswerWithId, getUser } from "../../../../../utils";
import {
  STATE_KEYS,
  UserKeys,
  USER_PROFILE_FIELDS,
} from "../../../../../constants";
import { dummyAnswers, dummyQuestions } from "../../../../../data";

import { QuestionType } from "../../../../../globalClasses/Question";
import { AnswerType } from "../../../../../globalClasses/Answer";

type ContributionPropsType = {
  type: string;
};

export default function Contribution({
  type,
}: ContributionPropsType): JSX.Element | null {
  const [data, setData] = useLocalStorage<QuestionType[]>(
    STATE_KEYS.data,
    dummyQuestions
  );
  const [answers, setAnswers] = useLocalStorage<AnswerType[]>(
    STATE_KEYS.answers,
    dummyAnswers
  );

  let user = getUser();

  console.log("user in contribution is ", user);
  if (!user || !data) {
    return null;
  }

  const values: JSX.Element[] = [];

  function getValue(query: string, id: string): string {
    let result: string = "";
    if (query == UserKeys.questions) {
      for (const question of data) {
        if (question.id == id) {
          result = question.title;
          break;
        }
      }
    } else {
      console.assert(query == UserKeys.answers);

      const answer = getAnswerWithId(answers, id);
      result = answer.description;
    }

    return result;
  }

  let i = 0;
  const userVals = user[type] as string[];
  console.log(userVals , type);

  for (const value of userVals) {
    //value is string 'a-23' , 'q-35' etc

    // console.log("value " , value);

    let index = Number(value.slice(2));

    if (type == UserKeys.answers) {
      let found = false;
      const answer = getAnswerWithId(answers, value);
      index = Number(answer.questionId.slice(2));
    }
    const qid = `q-${index}`;
    let str = getValue(type, value);

    if (i > 0) {
      str = ", " + str;
    }
    values.push(
      <Link key={value} href={{ pathname: "/q/[qid]", query: { qid: qid } }}>
        <span className={styles.span}>{str}</span>
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
