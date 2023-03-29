import QuestionCardDescription from "./description";
import styles from "./styles.module.css";
import QuestionCardTitle from "./title";
import QuestionCardCategories from "./categories";
import { Question } from "../../../../globalClasses/Question";
import SubmitButton from "../../../submitButton/SubmitButton";
import { useImmer } from "use-immer";

import { QuestionType } from "../../../../globalClasses/Question";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_QUESTION, GET_LOGGED_IN_USER } from "../../../../queries";

const TITLE_CHAR_LIMIT = 300;

export default function QuestionCard() {
  const [question, setQuestion] = useImmer<QuestionType>(
    new Question({
      id: "NA",
      userId: -1,
      datePosted: "",
      categories: [],
      title: "",
      description: "",
      answerIds: [],
    })
  );

  const [
    addQuestion,
    {
      loading: addQuestionLoading,
      error: addQuestionError,
      data: addedQuestionData,
    },
  ] = useMutation(ADD_QUESTION);

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_LOGGED_IN_USER);

  const userId = userData?.loggedInUser.id;
  console.log("userId", userId);

  console.log("datas", userData, addedQuestionData);
  console.log("errors", addQuestionError, userError);

  async function handleSubmit(): Promise<boolean> {
    // run validations!

    // Title validation
    let titleArray = question?.title?.split(" ").filter((item) => item != "");
    let title = "";

    for (let i = 0; titleArray && i < titleArray.length; ++i) {
      title += titleArray[i];
      if (
        i != titleArray.length - 1 &&
        titleArray[i + 1] != "," &&
        titleArray[i + 1] != "." &&
        titleArray[i + 1] != "!" &&
        titleArray[i + 1] != ";" &&
        titleArray[i + 1] != "?"
      )
        title += " ";
    }

    if (!title || title === "" || title.trim() == "") {
      alert(`Title cannot be empty!`);
      return false;
    } else if (title.length > TITLE_CHAR_LIMIT) {
      alert(`Can't have more than ${TITLE_CHAR_LIMIT} words for title!`); // TODO : Error Styles
      return false;
    }

    // description Validation
    let descriptionArray = question?.description
      ?.split(" ")
      .filter((item) => item != "");
    let description = "";

    for (let i = 0; descriptionArray && i < descriptionArray.length; ++i) {
      description += descriptionArray[i];
      if (i != descriptionArray.length - 1) description += " ";
    }

    // categories Validation
    // already done in category Component
    const categories = question.categories;

    const _question = {
      userId,
      title,
      description,
      categories,
    };

    // add question to server
    await addQuestion({ variables: { inputQuestion: _question } });

    return true;
  }

  if (userLoading || addQuestionLoading) {
    return <p>Posting Question...</p>;
  }

  if (userError || addQuestionError) {
    return (
      <p>
        Something went wrong!{" "}
        {" " + userError?.message + " " + addQuestionError?.message}
      </p>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.questionCardWrapper}>
        <QuestionCardTitle
          question={question}
          setQuestion={setQuestion}
          title={question.title}
        />
        <QuestionCardDescription
          question={question}
          setQuestion={setQuestion}
          description={question.description}
        />
        <QuestionCardCategories
          question={question}
          setQuestion={setQuestion}
          categories={question.categories}
        />
        <SubmitButton
          handleSubmit={handleSubmit}
          successMessage="Question Posted Successfully!"
          name="POST QUESTION"
        />
      </div>
    </main>
  );
}
