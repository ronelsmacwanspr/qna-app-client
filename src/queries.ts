import { gql } from "@apollo/client";

export const GET_QUESTIONS = gql`
  query GET_QUESTIONS {
    questions {
      id
      answerIds
      title
      description
      answerIds
    }
  }
`;

export const GET_FIRST_ANSWER_FOR_EACH_QUESTION = gql`
  query GET_FIRST_ANSWER_FOR_EACH_QUESTION($num: Int!) {
    questions {
      firstNAnswers(num: $num) {
        id
        numDownvotes
        description
        numDownvotes
        numUpvotes
      }
    }
  }
`;

export const GET_USER_ID = gql`
  query GET_USER_ID($userId: Int!) {
    user(id: $userId) {
      id
    }
  }
`;

export const GET_LOGGED_IN_USER = gql`
  query GET_LOGGED_IN_USER {
    loggedInUser {
      answerIds
      bio
      downvotedAnswerIds
      from
      id
      name
      questionIds
      upvotedAnswerIds
    }
  }
`;
export const ADD_USER = gql`
  mutation ADD_USER($inputUser: UserInput!) {
    addUser(inputUser: $inputUser) {
      id
      name
      from
      bio
      questionIds
      answerIds
      downvotedAnswerIds
      upvotedAnswerIds
    }
  }
`;

export const ADD_UPVOTED_ANSWERID_IN_USER_DATA = gql`
  mutation ADD_UPVOTED_ANSWERID_IN_USER_DATA($userId: Int!, $answerId: ID!) {
    addUpvotedAnswerId(userId: $userId, answerId: $answerId) {
      success
      message
      user {
        upvotedAnswerIds
      }
      answer {
        numUpvotes
      }
    }
  }
`;

export const REMOVE_UPVOTED_ANSWERID_IN_USER_DATA = gql`
  mutation REMOVE_UPVOTED_ANSWERID_IN_USER_DATA($userId: Int!, $answerId: ID!) {
    removeUpvotedAnswerId(userId: $userId, answerId: $answerId) {
      success
      message
      user {
        upvotedAnswerIds
      }
      answer {
        numUpvotes
      }
    }
  }
`;

export const ADD_DOWNVOTED_ANSWERID_IN_USER_DATA = gql`
  mutation ADD_DOWNVOTED_ANSWERID_IN_USER_DATA($userId: Int!, $answerId: ID!) {
    addDownvotedAnswerId(userId: $userId, answerId: $answerId) {
      success
      message
      user {
        downvotedAnswerIds
      }
      answer {
        numDownvotes
      }
    }
  }
`;

export const REMOVE_DOWNVOTED_ANSWERID_IN_USER_DATA = gql`
  mutation REMOVE_DOWNVOTED_ANSWERID_IN_USER_DATA(
    $userId: Int!
    $answerId: ID!
  ) {
    removeDownvotedAnswerId(userId: $userId, answerId: $answerId) {
      success
      message
      user {
        downvotedAnswerIds
      }
      answer {
        numDownvotes
      }
    }
  }
`;
