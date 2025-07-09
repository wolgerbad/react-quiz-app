import { useQuestions } from "./QuestionsProvider";
import styles from "./Finish.module.css";

function Finish() {
  const { userPoints, numPoints, handleRestart } = useQuestions();
  return (
    <div className={styles.box}>
      <div className={styles.score}>
        You scored {userPoints} out of {numPoints} (
        {Math.floor((userPoints / numPoints) * 100)}%)
      </div>
      <button className={styles.btn} onClick={handleRestart}>
        Go back to start screen
      </button>
    </div>
  );
}

export default Finish;
