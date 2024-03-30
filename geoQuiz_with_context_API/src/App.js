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
import { useQuiz } from "./contexts/QuizContext";

function App() {
  const { status } = useQuiz();

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "quizStarted" && (
          <>
            <ProgressBar />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
