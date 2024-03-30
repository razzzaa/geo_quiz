import { useQuiz } from "./contexts/QuizContext";

function NextButton() {
  const { dispatch, index, answer, currentQuestion, usedQuestions } = useQuiz();

  if (answer === null) return;

  console.log(index);
  console.log(currentQuestion);
  console.log(usedQuestions);

  if (currentQuestion < 15)
    return (
      <button
        className="button"
        onClick={() =>
          dispatch({
            type: "next",
            payload: index,
          })
        }
      >
        Next →
      </button>
    );

  if (currentQuestion === 15)
    return (
      <button
        className="button"
        onClick={() => dispatch({ type: "finish", payload: index })}
      >
        Finish
      </button>
    );
}

export default NextButton;
