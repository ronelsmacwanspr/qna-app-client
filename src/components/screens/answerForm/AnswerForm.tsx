import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import SubmitButton from "../../submitButton";
import UserCard from "../questionLandingPage/userCard/UserCard";

import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_LOGGED_IN_USER,
  ADD_ANSWER,
  GET_QUESTION_TITLE_DESCRIPTION_USER,
} from "../../../queries";

export default function AnswerForm() {
  const [value, setValue] = useState<string>("");

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_LOGGED_IN_USER);
  const [
    addAnswer,
    { loading: postingAnswer, error: answerError, data: answerData },
  ] = useMutation(ADD_ANSWER);
  const [
    getQuestion,
    { data: questionData, error: questionError, loading: questionLoading },
  ] = useLazyQuery(GET_QUESTION_TITLE_DESCRIPTION_USER);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      getQuestion({ variables: { questionId: router.query.qid } });
    }
  }, []);

  const questionTitle = questionData?.question?.title,
    questionDescription = questionData?.question?.description,
    questionId = questionData?.question?.id,
    userName = questionData?.question?.user?.name,
    datePosted = questionData?.question?.datePosted;

  console.log("ques-data", questionData);

  async function handleSubmit(): Promise<boolean> {
    console.log("userData in handle submit", userData);

    if (!userData) {
      console.log("ronels");
      throw new Error("No User exists yet");
    }
    if (!value || value.trim() == "") {
      alert("Please enter non-empty answer!");
      return false;
    }

    const user = userData.loggedInUser;

    const stringArray = value.split(" ").filter((item) => item != "");
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

    const inputAnswer = {
      userId: user.id,
      questionId: questionData.question.id,
      description: answerDescription,
    };

    console.log("input-ans", inputAnswer);

    await addAnswer({ variables: { inputAnswer } });

    return true;
  }

  if (answerError || questionError || userError) {
    return (
      <p>
        Something went wrong!
        <i>
          {" " +
            answerError?.message +
            " " +
            questionError?.message +
            " " +
            userError?.message}
        </i>
      </p>
    );
  }
  if (postingAnswer) {
    return <p>Posting your answer...</p>;
  }

  if (userLoading) {
    return <p>Loading your details. Please wait...</p>;
  }

  return (
    <div className={styles.outerWrapper}>
      <main className={styles.main}>
        <div className={styles.title}>
          {questionLoading ? <i>Loading title..</i> : questionTitle}
        </div>

        <div className={styles.description}>
          {questionLoading ? (
            <i>Loading description...</i>
          ) : (
            questionDescription
          )}
        </div>

        <div>
          <i>Asked By:</i>
          <UserCard userName={userName} datePosted={datePosted}></UserCard>
        </div>

        <div className={styles.inputWrapper}>
          <textarea
            className={styles.textarea}
            placeholder="Your answer goes here..."
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.buttonWrapper}>
          <SubmitButton
            handleSubmit={handleSubmit}
            successMessage="Yeah! Answer posted"
            name="Post Answer"
          />
        </div>
      </main>
    </div>
  );
}
