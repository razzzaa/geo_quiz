import { useEffect } from "react";
import { useQuiz } from "./contexts/QuizContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining;
  const secondsModulo = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && 0}
      {mins}:{secondsModulo < 10 && 0}
      {secondsModulo}
    </div>
  );
}

export default Timer;
