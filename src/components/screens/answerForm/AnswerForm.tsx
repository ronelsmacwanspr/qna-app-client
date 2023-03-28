import { useEffect, useState } from "react";
import { Answer } from "../../../globalClasses/Answer";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import SubmitButton from "../../submitButton";
import { getUser, updateUser, getNewAnswerId } from "../../../utils";
import { useLocalStorage } from "../../../localStorage/localStorage";
import { STATE_KEYS } from "../../../constants";
import { dummyAnswers, dummyQuestions } from "../../../data";

import { QuestionType } from "../../../globalClasses/Question";
import { AnswerType } from "../../../globalClasses/Answer";

export default function AnswerForm() {
  const [value, setValue] = useState<string>("");
  const [hydrated, setHydrated] = useState<boolean>(false);

  const [data, setData] = useLocalStorage<QuestionType[]>(
    STATE_KEYS.data,
    dummyQuestions
  );
  const [answers, setAnswers] = useLocalStorage<AnswerType[]>(
    STATE_KEYS.answers,
    dummyAnswers
  );

  const router = useRouter();
  const [qid, setQid] = useState<string>(router.query?.qid as string);

  let user = getUser();

  let inValid = false,
    questionTitle = null,
    questionDescription = null,
    index: null | number = null;

  useEffect(() => {
    if (router.isReady) {
      setQid(router.query.qid as string);
    }
  }, [router.isReady]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (qid) {
    if (qid.length < 3 || qid[0] != "q" || qid[1] != "-") {
      inValid = true;
    } else {
      index = Number(qid.slice(2));
      if (index < data.length) {
        questionTitle = data[index].title;
        questionDescription = data[index].description;
      } else {
        inValid = true;
      }
    }
  }

  function handleSubmit() {
    if (!user) {
      throw new Error("No User exisys yet");
    }
    if (!value || value.trim() == "") {
      alert("Please enter non-empty answer!");
      return false;
    }

    const stringArray = value.split(" ").filter((item) => item != "");
    console.log(stringArray);
    let answerDescription = "";

    for (let i = 0; i < stringArray.length; ++i) {
      answerDescription += stringArray[i];
      if (
        i != stringArray.length - 1 &&
        stringArray[i + 1] != "." &&
        stringArray[i + 1] != "!" &&
        stringArray[i + 1] != "," &&
        stringArray[i + 1] != ";" &&
        stringArray[i + 1] != "?"
      ) {
        answerDescription += " ";
      }
    }

    const date = new Date(),
      day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear();
    // push answer state in question

    const addAnswer: AnswerType = new Answer({
      id: getNewAnswerId(answers),
      userId: user.id,
      questionId: qid,
      description: answerDescription,
      datePosted: `${day}/${month}/${year}`,
      numUpvotes: 0,
      numDownvotes: 0,
    });

    console.log(addAnswer);

    setData((draft) => {
      draft[index as number].answerIds.push(addAnswer.id);
    });

    setAnswers((draft) => {
      draft.push(addAnswer);
    });

    user.answers.push(addAnswer.id);
    updateUser(user);

    return true;
  }

  if (inValid) {
    return <h2>No such page exists {":("}</h2>;
  }

  if (!hydrated) return null;

  return (
    <div className={styles.outerWrapper}>
      <main className={styles.main}>
        <div className={styles.title}>{questionTitle}</div>

        <div>{questionDescription}</div>

        <div className={styles.inputWrapper}>
          <textarea
            className={styles.textarea}
            placeholder="Your answer goes here..."
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
        </div>

        <SubmitButton
          handleSubmit={handleSubmit}
          successMessage={"Yeah! Answer posted"}
          name={"POST ANSWER"}
        />
      </main>
    </div>
  );
}
