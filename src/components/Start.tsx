import { useQuestions } from './QuestionProvider';
import styles from './Start.module.css';

function Start() {
  const { setStatus } = useQuestions();
  return (
    <div className={styles.container}>
      <h1>Welcome to The React Quiz</h1>
      <h2>15 questions to test your React mastery</h2>
      <button className="button" onClick={() => setStatus('active')}>
        Let's Start
      </button>
    </div>
  );
}

export default Start;
