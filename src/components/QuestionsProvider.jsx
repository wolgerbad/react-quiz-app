import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";
const SEC_PER_QUESTION = 30;

const QuestionContext = createContext();

function QuestionProvider({ children }) {
  const [status, setStatus] = useState("loading");
  const [questions, setQuestions] = useState([]);
  const [curQuestion, setCurQuestion] = useState(1);
  const [userPoints, setUserPoints] = useState(0);
  const numQuestions = questions.length;
  const numPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const [totalTime, setTotalTime] = useState(0);

  const min = Math.floor(totalTime / 60);
  const sec = Math.floor(totalTime % 60);

  function handleNext() {
    if (curQuestion === 15) setStatus("finish");
    setCurQuestion((curQuestion) => curQuestion + 1);
  }
  function handleRestart() {
    setStatus("start");
    setCurQuestion(1);
    setUserPoints(0);
    setTotalTime(questions.length * SEC_PER_QUESTION);
  }

  useEffect(function () {
    async function fetchQuestions() {
      const res = await fetch(`${BASE_URL}/questions`);
      const data = await res.json();
      setStatus("start");
      setQuestions(data);
    }

    fetchQuestions();
  }, []);

  useEffect(
    function () {
      const timer = setInterval(function () {
        setTotalTime((totalTime) => {
          if (totalTime < 1) {
            setStatus("finish");
            return 0;
          }
          return totalTime - 1;
        });
      }, 1000);

      return () => clearTimeout(timer);
    },
    [totalTime]
  );

  useEffect(() => {
    if (questions.length > 0) {
      setTotalTime(questions.length * SEC_PER_QUESTION);
    }
  }, [questions]);
  return (
    <QuestionContext.Provider
      value={{
        status,
        questions,
        curQuestion,
        setStatus,
        setCurQuestion,
        numQuestions,
        numPoints,
        userPoints,
        setUserPoints,
        min,
        sec,
        handleNext,
        handleRestart,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestions() {
  return useContext(QuestionContext);
}

export { QuestionProvider, useQuestions };
