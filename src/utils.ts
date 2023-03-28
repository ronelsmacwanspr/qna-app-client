import { Question, QuestionType } from "./globalClasses/Question";
import { Answer, AnswerType } from "./globalClasses/Answer";
import { User, UserType } from "./globalClasses/User";

// will generate dummy data to feed.

const currentUser = new User({
  id: 1,
  name: "Ronels",
  from: "Ahmedabad",
  bio: "Be the best!",
  questions: [],
  answers: [],
  upvotedAnswers: [],
  downvotedAnswers: [],
}) as UserType;

function generateQuestions(questions: QuestionType[]): void {
  let count = 0;
  const date = new Date(),
    day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();

  let question1: QuestionType = new Question({
    id: `q-${count++}`,
    userId: currentUser.id,
    datePosted: `${day}/${month}/${year}`,
    categories: ["Music", "Entertainment"],
    title: `How to play a guitar? `,
    description: `Recently I got a new idea of 
     playing guitar as my hobby. Since my childhood I am big of One Direction, Beatles and when I see them playing guitar, I wished I could 
     also do the same. Please give some tips of playing guitar`,
    answerIds: [],
  });

  questions.push(question1);

  let question2: QuestionType = new Question({
    id: `q-${count++}`,
    userId: currentUser.id,
    datePosted: `${day}/${month}/${year}`,
    categories: ["Coding", "Web Development", "Front-end"],
    title: "How to become good at Javascript?",
    description: `I am in 
     my first year of college and want to learn Web development. I want to begin with getting my hands on frontend. Please share some
     resources to be good at it`,
    answerIds: [],
  });

  let question3: QuestionType = new Question({
    id: `q-${count++}`,
    userId: currentUser.id,
    datePosted: `${day}/${month}/${year}`,
    categories: ["Cricket", "Bowling"],
    title: `How to in-swing a ball ? `,
    description: `I've been playing cricket since past 
     few weeks and want to learn to swing a bowl especially inswing. Please guide me through correct steps im. Sed ornare, metus nec faucibus rhoncus, nunc turpis ultricies metus, ut venenatis lorem ante 
     eget augue. Vivamus tortor leo, euismod ac pulvinar at, porta vel arcu. Suspendisse sit amet commodo justo. 
     Nulla ligula sapien, sollicitudin vel molestie et, tempor eget odio. Vivamus ullamcorper quam id finibus sollicitudin. 
     Suspendisse lacus libero, condimentum eget sapien mattis, ullamcorper iaculis eros. Nullam sit amet felis vehicula, suscipit 
     lorem ut, sodales metus.Lorem ipsum dolor sit amet, consectetur adipiscing 
     elit. Integer nec tellus in quam eleifend interdum. Sed at ex rhoncus, porttitor lectus ut, faucibus tellus. Nulla 
     placerat magna leo, tempus malesuada tellus semper at. Donec rutrum id ipsum quis semper. Donec eget lacus a turpis maximus 
     pellentesque sit amet at nibh. Sed mattis dui vitae metus tempus pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing 
     elit. Vestibulum sed tortor enim. Sed ornare, metus nec faucibus rhoncus, nunc turpis ultricies metus, ut venenatis lorem ante 
     eget augue. Vivamus tortor leo, euismod ac pulvinar at, porta vel arcu. Suspendisse sit amet commodo justo. 
     Nulla ligula sapien, sollicitudin vel molestie et, tempor eget odio. Vivamus ullamcorper quam id finibus sollicitudin. 
     Suspendisse  placerat magna leo, tempus malesuada tellus semper at. Donec rutrum id ipsum quis semper. Donec eget lacus a turpis maximus 
     pellentesque sit amet at nibh. Sed mattis dim. Sed ornare, metus nec faucibus rhoncus, nunc turpis ultricies metus, ut venenatis lorem ante 
     eget augue. Vivamus tortor leo, euismod ac pulvinar at, porta vel arcu. Suspendisse sit amet commodo justo. 
     Nulla ligula sapien, sollicitudin vel molestie et, tempor eget odio. Vivamus ullamcorper quam id finibus sollicitudin. 
     Suspendisse lacus libero, condimentum eget sapien mattis, ullamcorper iaculis eros. Nullam sit amet felis vehicula, suscipit 
     lorem ut, sodales metus.Lorem ipsum dolor sit amet, consectetur adipiscing 
     elit. Integer nec tellus in quam eleifend interdum. Sed at ex rhoncus, porttitor lectus ut, faucibus tellus. Nulla 
     placerat magna leo, tempus malesuada tellus semper at. Donec rutrum id ipsum quis semper. Donec eget lacus a turpis maximus 
     pellentesque sit amet at nibh. Sed mattis dui vitae metus tempus pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing 
     elit. Vestibulum sed tortor enim. Sed ornare, metus nec faucibus rhoncus, nunc turpis ultricies metus, ut venenatis lorem ante 
     eget augue. Vivamus tortor leo, euismod ac pulvinar at, porta vel arcu. Suspendisse sit amet commodo justo. 
     Nulla ligula sapien, sollicitudin vel molestie et, tempor eget odio. Vivamus ullamcorper quam id finibus sollicitudin. 
     Suspendisse  placerat magna leo, tempus malesuada tellus semper at. Donec rutrum id ipsum quis semper. Donec eget lacus a turpis maximus 
     pellentesque sit amet at nibh. Sed mattis d`,
    answerIds: [],
  });

  let question4: QuestionType = new Question({
    id: `q-${count++}`,
    userId: currentUser.id,
    datePosted: `${day}/${month}/${year}`,
    categories: ["Cricket", "Bowling"],
    title: "How to in-swing a ball ?",
    description: `I've been playing cricket since past 
     few weeks and want to learn to swing a bowl especially inswing. Please guide me through correct steps`,
    answerIds: [],
  });

  questions.push(question2);
  questions.push(question3);
  questions.push(question4);
}

function generateAnswers(
  questions: QuestionType[],
  answersArray: AnswerType[]
): void {
  let count = 0;
  const date = new Date(),
    day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();

  let prev = 3;
  for (let question of questions) {
    for (let j = 0; j < prev; ++j) {
      const answer: AnswerType = new Answer({
        id: `a-${count++}`,
        questionId: question.id,
        datePosted: `${day}/${month}/${year}`,
        userId: currentUser.id,
        numUpvotes: 30,
        numDownvotes: 20,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing 
        elit. Integer nec tellus in quam eleifend interdum. Sed at ex rhoncus, porttitor lectus ut, faucibus tellus. Nulla 
       lacus libero, condimentum eget sapien mattis, ullamcorper iaculis eros. Nullam sit amet felis vehicula, suscipit 
        lorem ut, sodales metus. placerat magna leo, tempus malesuada tellus semper at. Donec rutrum id ipsum quis semper. Donec eget lacus a turpis maximus 
        pellentesque sit amet at nibh. Sed mattis dui vitae metus tempus pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing 
        elit. Vestibulum sed tortor enim. Sed ornare, metus nec faucibus rhoncus, nunc turpis ultricies metus, ut venenatis lorem ante 
        eget augue. Vivamus tortor leo, euismod ac pulvinar at, porta vel arcu. Suspendisse sit amet commodo justo. 
        Nulla ligula sapien, sollicitudin vel molestie et, tempor eget odio. Vivamus ullamcorper quam id finibus sollicitudin. 
        Suspendisse lacus libero, condimentum eget sapien mattis, ullamcorper iaculis eros. Nullam sit amet felis vehicula, suscipit 
        lorem ut, sodales metus.Lorem ipsum dolor sit amet, consectetur adipiscing 
        elit. Integer nec tellus in quam eleifend interdum. Sed at ex rhoncus, porttitor lectus ut, faucibus tellus. Nulla 
        placerat magna leo, tempus malesuada tellus semper at. Donec rutrum id ipsum quis semper. Donec eget lacus a turpis maximus 
        pellentesque sit amet at nibh. Sed mattis dui vitae metus tempus pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing 
        elit. Vestibulum sed tortor enim. Sed ornare, metus nec faucibus rhoncus, nunc turpis ultricies metus, ut venenatis lorem ante 
        eget augue. Vivamus tortor leo, euismod ac pulvinar at, porta vel arcu. Suspendisse sit amet commodo justo. 
        Nulla ligula sapien, sollicitudin vel molestie et, tempor eget odio. Vivamus ullamcorper quam id finibus sollicitudin. 
        Suspendisse  placerat magna leo, tempus malesuada tellus semper at. Donec rutrum id ipsum quis semper. Donec eget lacus a turpis maximus 
        pellentesque sit amet at nibh. Sed mattis dui vitae metus tempus pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing 
        elit. Vestibulum sed tortor enim. Sed ornare, metus nec faucibus rhoncus, nunc turpis ultricies metus, ut venenatis lorem ante 
        eget augue. Vivamus tortor leo, euismod ac pulvinar at, porta vel arcu. Suspendisse sit amet commodo justo. 
        Nulla ligula sapien, sollicitudin vel molestie et, tempor eget odio. Vivamus ullamcorper quam id finibus sollicitudin. 
        Suspendisse lacus libero, condimentum eget sapien mattis, ullamcorper iaculis eros. Nullam sit amet felis vehicula, suscipit 
        lorem ut, sodales metus.Lorem ipsum dolor sit amet, consectetur adipiscing 
        elit. Integer nec tellus in quam eleifend interdum. Sed at ex rhoncus, porttitor lectus ut, faucibus tellus. Nulla 
        placerat magna leo, tempus malesuada tellus semper at. Donec rutrum id ipsum quis semper. Donec eget lacus a turpis maximus 
        pellentesque sit amet at nibh. Sed mattis dui vitae metus tempus pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing 
        elit. Vestibulum sed tortor enim. Sed ornare, metus nec faucibus rhoncus, nunc turpis ultricies metus, ut venenatis lorem ante 
        eget augue. Vivamus tortor leo, euismod ac pulvinar at, porta vel arcu. Suspendisse sit amet commodo justo. 
        Nulla ligula sapien, sollicitudin vel molestie et, tempor eget odio. Vivamus ullamcorper quam id finibus sollicitudin. 
        Suspendisse `,
      });

      question.answerIds.push(answer.id);
      answersArray.push(answer);
    }

    // prev+=4;
  }
}

const getUser = (): null | UserType => {
  if (typeof window === "undefined") return null;
  return JSON.parse(localStorage.getItem("user") as string);
};

const updateUser = (_user: UserType): void => {
  // console.log('setting new user as : ', _user);
  if (typeof window !== "undefined") {
    const str = JSON.stringify(_user);
    localStorage.setItem("user", str);
  } else {
    console.log(" missed an update!!!");
  }
};

const getNewAnswerId = (answers: AnswerType[]): string => {
  return `a-${answers.length}`;
};

const getAnswerWithId = (answers: AnswerType[], id: string): AnswerType => {
  if (!answers) {
    throw new Error("There are no answers yet!");
  }
  const _id = Number(id.slice(2));

  if (answers.length <= _id) {
    throw new Error("Id is too big");
  }

  const answer = answers[_id];

  if (answer.id !== id) {
    throw new Error("Returned answer is not as expected");
  }

  return answer;
};

export {
  generateAnswers,
  generateQuestions,
  currentUser,
  getUser,
  updateUser,
  getNewAnswerId,
  getAnswerWithId,
};
