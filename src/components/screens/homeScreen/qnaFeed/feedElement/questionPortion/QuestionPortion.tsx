import QuestionDescription from "./questionDescription";
import QuestionTitle from "./questionTitle";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_QUESTION_TITLE_AND_DESCRIPTION } from "../../../../../../queries";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

type QuestionPortionProps = { questionId: string };

const QuestionPortion = ({ questionId }: QuestionPortionProps) => {
  //ques des,id,title

  const router = useRouter();
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
    <div className={styles.wrapper} onClick={() => router.push(location)}>
      <Link href={location}>
        <QuestionTitle questionTitle={title} />
      </Link>
      <QuestionDescription questionDescription={description} />
    </div>
  );
};

export default QuestionPortion;
