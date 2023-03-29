import UserDetail from "./userDetail";
import Contribution from "./userDetail/contribution";
import { useState } from "react";

import styles from "./styles.module.css";
import { useEffect } from "react";
import { getUser } from "../../../utils";

import { GET_LOGGEDIN_USER_PROFILE_FIELDS } from "../../../queries";
import { useQuery } from "@apollo/client";
import { USER_PROFILE_FIELDS, UserKeys } from "../../../constants";
import { QuestionType } from "../../../globalClasses/Question";
import { Answer, AnswerType } from "../../../globalClasses/Answer";

export default function UserProfile() {
  const {
    data: userData,
    loading: userLoading,
    error: userFetchingError,
  } = useQuery(GET_LOGGEDIN_USER_PROFILE_FIELDS);

  const user = userData?.loggedInUser;
  let questionsContribution = null,
    answersContribution = null;
  let render: JSX.Element[] = [];

  if (user) {
    console.log("user", user);
    for (let _key of USER_PROFILE_FIELDS.primitiveFields) {
      render.push(
        <UserDetail
          key={_key}
          name={USER_PROFILE_FIELDS.keysLabel[_key]}
          value={user[_key] as number | string}
        />
      );
    }

    // MAKE QUESTIONS ARRAY
    questionsContribution = user.questions.map((question: QuestionType) => ({
      href: { pathname: "/q/[qid]", query: { qid: question.id } },
      text: question.title,
    }));

    console.log("q-contri", questionsContribution);

    answersContribution = user.answers.map((answer: AnswerType) => ({
      href: { pathname: "/q/[qid]", query: { qid: answer.questionId } },
      text: answer.description,
    }));

    console.log("a-contri", answersContribution);
  }

  if (userLoading) {
    return <p>Fetching your details. Please wait...</p>;
  }

  return (
    <main>
      <div className={styles.wrapper}>
        <img className={styles.icon} src="/user.png" alt="User icon" />

        <div className={styles.userDetails}>
          {render}

          <Contribution
            type={UserKeys.questionIds}
            contribution={questionsContribution}
          />

          <Contribution
            type={UserKeys.answerIds}
            contribution={answersContribution}
          />
        </div>
      </div>
    </main>
  );
}
