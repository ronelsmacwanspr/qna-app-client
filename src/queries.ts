import { gql } from "@apollo/client";

export const GET_QUESTIONS_IDS = gql`
  query GET_QUESTIONS {
    questions {
      id
    }
  }
`;

export const GET_FIRST_ANSWER_FOR_EACH_QUESTION = gql`
  query GET_FIRST_ANSWER_FOR_EACH_QUESTION($num: Int!) {
    questions {
      id
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

export const GET_FIRST_N_ANSWERS_FOR_QUESTIONID = gql`
  query GET_FIRST_N_ANSWERS_FOR_QUESTIONID($questionId: ID!, $num: Int!) {
    question(id: $questionId) {
      id
      firstNAnswers(num: $num) {
        id
        description
        numDownvotes
        numUpvotes
        questionId
        userId
        datePosted
      }
    }
  }
`;

export const GET_QUESTION_TITLE_DESCRIPTION_USER = gql`
  query ($questionId: ID!) {
    question(id: $questionId) {
      title
      id
      description
      datePosted
      user {
        name
        id
      }
    }
  }
`;

export const GET_QUESTION_FROM_ID = gql`
  query GET_QUESTION_FROM_ID($questionId: ID!) {
    question(id: $questionId) {
      description
      title
      id
      datePosted
      answers {
        id
      }
      user {
        name
        id
        from
      }
    }
  }
`;

export const GET_ANSWER_FROM_ID = gql`
  query ($answerId: ID!) {
    answer(id: $answerId) {
      id
      datePosted
      description
      numUpvotes
      numDownvotes
      user {
        id
        name
      }
    }
  }
`;

export const GET_QUESTION_TITLE_DESCRIPTION_ANSIDS = gql`
  query {
    questions {
      id
      title
      description
      answerIds
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query GET_USER_ID($userId: Int!) {
    user(id: $userId) {
      id
      name
      from
      bio
      upvotedAnswerIds
      downvotedAnswerIds
      questionIds
      answerIds
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

export const GET_LOGGEDIN_USER_PROFILE_FIELDS = gql`
  query {
    loggedInUser {
      id
      name
      bio
      from
      answers {
        id
        description
        questionId
        datePosted
      }
      questions {
        id
        title
        datePosted
      }
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
        id
      }
      answer {
        numUpvotes
        id
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
        id
      }
      answer {
        numUpvotes
        id
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
        id
      }
      answer {
        numDownvotes
        id
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
        id
      }
      answer {
        numDownvotes
        id
      }
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation ($inputQuestion: QuestionInput!) {
    addQuestion(inputQuestion: $inputQuestion) {
      id
      title
      userId
      description
      datePosted
      categories
      answerIds
      answers {
        id
        numDownvotes
      }
    }
  }
`;

export const ADD_ANSWER = gql`
  mutation ($inputAnswer: AnswerInput!) {
    addAnswer(inputAnswer: $inputAnswer) {
      id
      userId
      questionId
      description
      numUpvotes
      numDownvotes
      datePosted
    }
  }
`;
