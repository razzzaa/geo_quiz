import Options from "./Options";
import { useQuiz } from "./contexts/QuizContext";

function Question() {
  const { dispatch, questions, index, answer } = useQuiz();

  console.log(index);

  return (
    <>
      <h4 className="question">{questions.at(index).question}</h4>
      <div className="questionsContainer">
        <Options
          question={questions.at(index)}
          dispatch={dispatch}
          index={index}
          answer={answer}
        />
      </div>
    </>
  );
}

export default Question;
