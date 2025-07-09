import { useQuestions } from "./QuestionsProvider";

function Start() {
  const { setStatus } = useQuestions();
  return (
    <div>
      <h1>Welcome to The React Quiz</h1>
      <p>Feel free to hit the "start" button when you feel ready!</p>
      <button onClick={() => setStatus("active")}>Start</button>
    </div>
  );
}

export default Start;
