import { useEffect, useReducer } from "react";
import "./App.css";
import Main from "./Main";
import Header from "./Header";
import StartScreen from "./StartScreen";
import Error from "./Error";
import Loading from "./Loading";
import Question from "./Question";
import ProgressBar from "./ProgressBar";
import Footer from "./Footer";
import NextButton from "./NextButton";
import Timer from "./Timer";
import FinishScreen from "./FinishScreen";
import questionsData from "./data/questions.json";

console.log(questionsData);

const NUM_QUESTIONS = 15;
const SECS_PER_QUESTION = 10;

const initialState = {
  questions: [],
  status: "loading",
  points: 0,
  highscore: 0,
  index: null,
  NUM_QUESTIONS,
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
        usedQuestions: [...state.usedQuestions, state.index],
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

function App() {
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
    },
    dispatch,
  ] = useReducer(reducer, initialState);

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
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            index={index}
            numOfQuestions={NUM_QUESTIONS}
            dispatch={dispatch}
          />
        )}
        {status === "quizStarted" && (
          <>
            <ProgressBar
              numOfQuestions={NUM_QUESTIONS}
              usedQuestions={usedQuestions}
              points={points}
              currentQuestion={currentQuestion}
            />
            <Question
              questions={questions}
              dispatch={dispatch}
              index={index}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                index={index}
                answer={answer}
                currentQuestion={currentQuestion}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            questions={questions}
            points={points}
            highscore={highscore}
            totalPoints={totalPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
