import { useQuiz } from "./contexts/QuizContext";

function StartScreen() {
  const { NUM_QUESTIONS, dispatch } = useQuiz();

  return (
    <div className="startScreen">
      <h2>Welcome to React GeoQuiz!</h2>
      <h4>{NUM_QUESTIONS} questions to test your geography Skills</h4>
      <button className="button" onClick={() => dispatch({ type: "start" })}>
        Let's Start!
      </button>
    </div>
  );
}

export default StartScreen;
