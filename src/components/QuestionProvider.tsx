import React, { createContext, useContext, useEffect, useState } from 'react';

/*
{

}
*/

const BASE_URL = 'http://localhost:9001';
const SEC_PER_QUESTION = 30;

type ChildrenProps = {
  children: React.ReactNode;
};

type QuestionProps = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type QuestionContextType = {
  status: string;
  questions: QuestionProps[] | [];
  curQuestion: number;
  userPoints: number;
  numQuestions: number;
  numPoints: number;
  min: number;
  sec: number;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setCurQuestion: React.Dispatch<React.SetStateAction<number>>;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  handleRestart: () => void;
};

const QuestionContext = createContext<QuestionContextType | null>(null);

export function QuestionProvider({ children }: ChildrenProps) {
  const [status, setStatus] = useState('');
  const [questions, setQuestions] = useState<QuestionProps[] | []>(() => {
    const qs = localStorage.getItem('questions');
    const value = qs !== null ? JSON.parse(qs) : [];
    return value;
  });
  const [curQuestion, setCurQuestion] = useState(1);
  const [userPoints, setUserPoints] = useState(0);
  const [totalTime, setTotalTime] = useState(3600);

  const numQuestions = questions.length;
  const numPoints = questions.reduce(
    (sum: number, q: QuestionProps) => sum + q.points,
    0
  );

  const min = Math.floor(totalTime / 60);
  const sec = Math.floor(totalTime % 60);

  function handleNext() {
    if (curQuestion === 15) setStatus('finish');
    setCurQuestion((curQuestion) => curQuestion + 1);
  }

  function handleRestart() {
    setStatus('start');
    setCurQuestion(1);
    setUserPoints(0);
    setTotalTime(questions.length * SEC_PER_QUESTION);
  }

  useEffect(function () {
    async function fetchQuestions() {
      const res = await fetch(`${BASE_URL}/questions`);
      setStatus('loading');
      const data = await res.json();
      setQuestions(data);
      localStorage.setItem('questions', JSON.stringify(data));
      setStatus('start');
    }

    fetchQuestions();
  }, []);

  useEffect(
    function () {
      const timer = setInterval(function () {
        setTotalTime((totalTime) => {
          if (totalTime < 1) {
            setStatus('finish');
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

export function useQuestions() {
  const useQuestionContext = useContext(QuestionContext);
  if (!useQuestionContext)
    throw new Error('You cannot use useContext outside of Provider boundaries');
  return useQuestionContext;
}
