export const VOTE_ACTIONS = {
  upvote: "upvote",
  downvote: "downvote",
};

export const UserKeys = {
  id: "id",
  name: "name",
  from: "from",
  bio: "bio",
  questionIds: "questionIds",
  answerIds: "answerIds",
};

export const USER_PROFILE_FIELDS = {
  primitiveFields: [UserKeys.id, UserKeys.name, UserKeys.from, UserKeys.bio],
  keysLabel: {
    [UserKeys.id]: "ID",
    [UserKeys.name]: "Name",
    [UserKeys.from]: "From",
    [UserKeys.bio]: "Bio",
    [UserKeys.questionIds]: "Questions",
    [UserKeys.answerIds]: "Answers",
  },
};
