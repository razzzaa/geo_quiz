import { useQuiz } from "./contexts/QuizContext";

function ProgressBar() {
  const { NUM_QUESTIONS, currentQuestion, points } = useQuiz();
  console.log(currentQuestion);
  console.log(NUM_QUESTIONS);
  return (
    <header className="progress">
      <progress max={NUM_QUESTIONS} value={currentQuestion} />
      <div className="progressStats">
        <p>
          Question <strong>{currentQuestion}</strong> /{NUM_QUESTIONS}
        </p>
        <p>
          Points : <strong> {points}</strong>
        </p>
      </div>
    </header>
  );
}

export default ProgressBar;
