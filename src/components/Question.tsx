import { useState } from 'react';
import styles from './Question.module.css';
import { useQuestions } from './QuestionProvider';

type QuestionProps = {
  question: {
    question: string;
    options: string[];
    correctOption: number;
    points: number;
  };
};

function Question({ question }: QuestionProps) {
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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  function handleSelect(index: number) {
    setHasAnswered(true);
    setSelectedAnswer(index);
    if (index === question.correctOption)
      setUserPoints((userPoints) => userPoints + question.points);
  }

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
          <div key={question.question}>
            <button
              onClick={() => handleSelect(index)}
              className={`${styles.option} ${
                hasAnswered &&
                (index === question.correctOption ? styles.true : styles.false)
              } ${index === selectedAnswer && styles.selected} `}
              disabled={hasAnswered}
            >
              {opt}
            </button>
          </div>
        ))}
      </div>
      <div className={styles.flex}>
        <span className={styles.timer}>
          {min < 10 ? 0 : ''}
          {min}:{sec < 10 ? 0 : ''}
          {sec}
        </span>
        {hasAnswered && (
          <button className="button" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Question;
