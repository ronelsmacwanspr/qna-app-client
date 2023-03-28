import styles from "./styles.module.css";
import { useState } from "react";
import { VOTE_ACTIONS as actions } from "../../constants";

import { AnswerType } from "../../globalClasses/Answer";
import { useQuery } from "@apollo/client";
import {
  ADD_UPVOTED_ANSWERID_IN_USER_DATA,
  ADD_DOWNVOTED_ANSWERID_IN_USER_DATA,
  REMOVE_UPVOTED_ANSWERID_IN_USER_DATA,
  REMOVE_DOWNVOTED_ANSWERID_IN_USER_DATA,
  GET_LOGGED_IN_USER,
} from "../../queries";

import { useMutation } from "@apollo/client";

type VotesPropsType = {
  answer: AnswerType;
};

/*
no setans
*/

export default function Votes({ answer }: VotesPropsType) {
  const {
    data: userData,
    loading: loadingFetchLoggedInUser,
    error: errorGettingLoggInUser,
  } = useQuery(GET_LOGGED_IN_USER);

  const [
    addUpvotedAnswerId,
    { loading: loadingAddUpvote, error: errorAddUpvote, data: dataAddUpvote },
  ] = useMutation(ADD_UPVOTED_ANSWERID_IN_USER_DATA, {
    refetchQueries: [{ query: GET_LOGGED_IN_USER }],
  });

  const [
    addDownvotedAnswerId,
    {
      loading: loadingAddDownvote,
      error: errorAddDownvote,
      data: dataAddDownvote,
    },
  ] = useMutation(ADD_DOWNVOTED_ANSWERID_IN_USER_DATA, {
    refetchQueries: [{ query: GET_LOGGED_IN_USER }],
  });

  const [
    removeUpvotedAnswerId,
    {
      loading: loadingRemoveUpvote,
      error: errorRemoveUpvote,
      data: dataRemoveUpvote,
    },
  ] = useMutation(REMOVE_UPVOTED_ANSWERID_IN_USER_DATA, {
    refetchQueries: [{ query: GET_LOGGED_IN_USER }],
  });

  const [
    removeDownvotedAnswerId,
    {
      loading: loadingRemoveDownvote,
      error: errorRemoveDownvote,
      data: dataRemoveDownvote,
    },
  ] = useMutation(REMOVE_DOWNVOTED_ANSWERID_IN_USER_DATA, {
    refetchQueries: [{ query: GET_LOGGED_IN_USER }],
  });

  let user = userData?.loggedInUser;
  console.log("user in votes component", user);

  const [selected, setSelected] = useState<string | null>(() => {
    if (!user || !answer) {
      return null;
    }

    if (user.upvotedAnswerIds.includes(answer.id)) {
      return actions.upvote;
    } else if (user.downvotedAnswerIds.includes(answer.id)) {
      return actions.downvote;
    }
    return null;
  });

  //  console.log('data-->',data);
  console.log("answer-->", answer);

  console.log("selecetd is", selected);

  const upvoteCount = answer ? answer.numUpvotes : 0,
    downvoteCount = answer ? answer.numDownvotes : 0,
    buttonsDisabled =
      loadingAddDownvote ||
      loadingAddUpvote ||
      loadingFetchLoggedInUser ||
      loadingRemoveDownvote ||
      loadingRemoveUpvote;

  async function handleUpvoteClick() {
    if (!user) {
      throw new Error("User does not exists");
    }

    if (selected == actions.upvote) {
      // remove upvoted answer from user
      await removeUpvotedAnswerId({
        variables: { userId: user.id, answerId: answer.id },
      });
      setSelected(null);
    } else {
      // add upvote from user
      await addUpvotedAnswerId({
        variables: { userId: user.id, answerId: answer.id },
      });

      if (selected == actions.downvote) {
        //remove downvote from answer

        await removeDownvotedAnswerId({
          variables: { userId: user.id, answerId: answer.id },
        });
      }
      setSelected(actions.upvote);
    }
  }

  async function handleDownvoteClick() {
    if (!user) {
      throw new Error("User does not exists");
    }

    if (selected == actions.downvote) {
      //remove downvote
      await removeDownvotedAnswerId({
        variables: { userId: user.id, answerId: answer.id },
      });

      setSelected(null);
    } else {
      // add downvote
      await addDownvotedAnswerId({
        variables: { userId: user.id, answerId: answer.id },
      });

      if (selected == actions.upvote) {
        // remove upvote
        await removeUpvotedAnswerId({
          variables: { userId: user.id, answerId: answer.id },
        });
      }

      setSelected(actions.downvote);
    }
  }

  function getButtonStyle(type: string) {
    if (buttonsDisabled) return "";

    if (type == actions.upvote) {
      if (selected == type) {
        return styles.upvoteSelected;
      }
      return styles.upvote;
    }

    if (selected == actions.downvote) {
      return styles.downvoteSelected;
    }
    return styles.downvote;
  }

  return (
    <div className={styles.voteWrapper}>
      <button
        disabled={buttonsDisabled}
        className={getButtonStyle(actions.upvote)}
        onClick={handleUpvoteClick}
      >
        Upvote
      </button>
      <span className={styles.count}>{upvoteCount}</span>
      <button
        disabled={buttonsDisabled}
        className={getButtonStyle(actions.downvote)}
        onClick={handleDownvoteClick}
      >
        Downvote
      </button>
      <span className={styles.count}>{downvoteCount}</span>
    </div>
  );
}
