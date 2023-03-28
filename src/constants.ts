export const COMPARE_EQUAL_KEYS: string[] = ["userId", "title", "description"];

export const STATE_KEYS: { [index: string]: string } = {
  data: "data",
  answers: "answers",
};

export const VOTE_ACTIONS: { [index: string]: string } = {
  upvote: "upvote",
  downvote: "downvote",
};

export const UserKeys: { [index: string]: string } = {
  id: "id",
  name: "name",
  from: "from",
  bio: "bio",
  questions: "questions",
  answers: "answers",
};

export const USER_PROFILE_FIELDS = {
  inputKeys: [UserKeys.name, UserKeys.from, UserKeys.bio],
  keysLabel: {
    [UserKeys.id]: "ID",
    [UserKeys.name]: "Name",
    [UserKeys.from]: "From",
    [UserKeys.bio]: "Bio",
    [UserKeys.questions]: "Questions",
    [UserKeys.answers]: "Answers",
  },
};
