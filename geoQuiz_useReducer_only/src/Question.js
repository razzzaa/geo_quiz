import Options from "./Options";

function Question({ dispatch, questions, index, answer }) {
  console.log(questions);
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
