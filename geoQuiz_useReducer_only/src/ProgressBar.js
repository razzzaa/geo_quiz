function ProgressBar({ numOfQuestions, currentQuestion, points }) {
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={currentQuestion} />
      <div className="progressStats">
        <p>
          Question <strong>{currentQuestion}</strong> /{numOfQuestions}
        </p>
        <p>
          Points : <strong> {points}</strong>
        </p>
      </div>
      {console.log(numOfQuestions)}
    </header>
  );
}

export default ProgressBar;
