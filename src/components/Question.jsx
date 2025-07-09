import { useState } from "react";
import styles from "./Question.module.css";
import { useQuestions } from "./QuestionsProvider";

function Question({ question }) {
  const {
    curQuestion,
    numQuestions,
    numPoints,
    userPoints,
    setUserPoints,
    min,
    sec,
    handleNext,
  } = useQuestions();
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  return (
    <div>
      <div className={styles.info}>
        <span>
          {curQuestion}/{numQuestions} question
        </span>
        <span>
          {userPoints} / {numPoints}
        </span>
      </div>
      <div>
        <h2>{question.question}</h2>
        {question.options.map((opt, index) => (
          <div>
            <button
              onClick={() => {
                setHasAnswered(true);
                setSelectedAnswer(index);
                index === question.correctOption &&
                  setUserPoints((userPoints) => userPoints + question.points);
              }}
              className={`${styles.option} ${
                hasAnswered &&
                (index === question.correctOption ? styles.true : styles.false)
              } ${index === selectedAnswer && styles.selected} `}
              key={question.question}
              disabled={hasAnswered}
            >
              {opt}
            </button>
          </div>
        ))}
      </div>
      <div className={styles.flex}>
        <timer className={styles.timer}>
          {min < 10 ? 0 : ""}
          {min}:{sec < 10 ? 0 : ""}
          {sec}
        </timer>
        {hasAnswered && <button onClick={handleNext}>Next</button>}
      </div>
    </div>
  );
}

export default Question;
