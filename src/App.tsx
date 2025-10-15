import './App.css';
import Start from './components/Start';
import Question from './components/Question';
import Finish from './components/Finish';
import { useQuestions } from './components/QuestionProvider';
import Header from './components/Header';

function App() {
  const { questions, curQuestion, status } = useQuestions();

  if (!questions) return null;

  return (
    <>
      <Header />
      <div className="appContainer">
        <div className="container">
          {status === 'loading' && <p>Loading...</p>}
          {status === 'start' && <Start />}
          {status === 'active' && (
            <Question
              question={questions[curQuestion - 1]}
              key={questions[curQuestion - 1].question}
            />
          )}
          {status === 'finish' && <Finish />}
        </div>
      </div>
    </>
  );
}

export default App;
