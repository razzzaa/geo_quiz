import { createContext, useContext, useEffect, useReducer } from "react";
import questionsData from "../data/questions.json";

const QuizContext = createContext();

const NUM_QUESTIONS = 15;
const SECS_PER_QUESTION = 10;

const initialState = {
  questions: [],
  status: "loading",
  points: 0,
  highscore: 0,
  index: null,
  usedQuestions: [],
  answer: null,
  totalPoints: [],
  secondsRemaining: null,
  currentQuestion: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      console.log(action.payload);
      return {
        ...state,
        status: "ready",
        questions: action.payload,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "quizStarted",
        index: Math.floor(Math.random() * state.questions.length),
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        currentQuestion: state.usedQuestions.length + 1,
      };
    case "next":
      const getRandomIndex = () =>
        Math.floor(Math.random() * state.questions.length);
      let newIndex = getRandomIndex();
      while (state.usedQuestions.includes(newIndex)) {
        newIndex = getRandomIndex();
      }

      return {
        ...state,
        // usedQuestions: [...state.usedQuestions, state.index],
        index: newIndex,
        answer: null,
        currentQuestion: state.usedQuestions.length + 1,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        totalPoints: [...state.totalPoints, question.points],
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        usedQuestions: [...state.usedQuestions, state.index],
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    {
      status,
      questions,
      index,
      usedQuestions,
      answer,
      points,
      highscore,
      totalPoints,
      secondsRemaining,
      currentQuestion,
      SECS_PER_QUESTION,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  console.log(usedQuestions);

  useEffect(() => {
    // *****IF YOU WANT TO USE THIS WITH JSON SERVER USE "npm run server" AND USE THIS MARKED PORTION.
    // fetch("http://localhost:5000/questions")
    //   .then((res) => res.json())
    //   .then((data) => dispatch({ type: "dataRecieved", payload: data }))
    //   .catch((err) => dispatch({ type: "dataFailed" }));
    //..............................................................................................................
    // Simulating asynchronous data fetching
    try {
      setTimeout(() => {
        dispatch({ type: "dataRecieved", payload: questionsData.questions });
      }, "2000");
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        usedQuestions,
        answer,
        points,
        highscore,
        totalPoints,
        secondsRemaining,
        currentQuestion,
        dispatch,
        NUM_QUESTIONS,
        SECS_PER_QUESTION,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
