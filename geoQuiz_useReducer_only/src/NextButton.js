function NextButton({ dispatch, id, index, answer, currentQuestion }) {
  if (answer === null) return;

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

  if ((currentQuestion = 15))
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
