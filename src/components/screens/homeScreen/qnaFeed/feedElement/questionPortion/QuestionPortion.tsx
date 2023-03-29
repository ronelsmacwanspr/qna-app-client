import QuestionDescription from "./questionDescription";
import QuestionTitle from "./questionTitle";

import { QuestionType } from "../../../../../../globalClasses/Question";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_QUESTION_TITLE_AND_DESCRIPTION } from "../../../../../../queries";

type QuestionPortionProps = { questionId: string };

const QuestionPortion = ({ questionId }: QuestionPortionProps) => {
  //ques des,id,title

  const { data, loading, error } = useQuery(
    GET_QUESTION_TITLE_AND_DESCRIPTION,
    {
      variables: { questionId },
    }
  );

  if (loading) {
    return <p>Loading question info...</p>;
  }

  if (error) {
    return <p>Something went wrong : {error.message}</p>;
  }
  const { description, title } = data.question,
    location = `/q/${questionId}`;

  return (
    <div>
      <Link href={location}>
        <QuestionTitle questionTitle={title} />
      </Link>
      <QuestionDescription questionDescription={description} />
    </div>
  );
};

export default QuestionPortion;
