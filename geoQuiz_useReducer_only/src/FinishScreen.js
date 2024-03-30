function FinishScreen({ points, questions, dispatch, highscore, totalPoints }) {
  const maxPossiblePoints = totalPoints.reduce((prev, cur) => prev + cur, 0);
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <div className="startScreen">
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore})</p>
      <button className="button" onClick={() => dispatch({ type: "restart" })}>
        Restart Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
