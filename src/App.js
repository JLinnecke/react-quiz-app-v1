import { useState } from "react";

const questionList = [
  {
    id: "1",
    question: "Which planet is the largest in our solar system?",
    answers: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: "Jupiter",
  },
  {
    id: "2",
    question: "How many continents are there on Earth?",
    answers: ["5", "6", "7", "8"],
    correctAnswer: "7",
  },
  {
    id: "3",
    question: "Which animal is known as the King of the Jungle?",
    answers: ["Tiger", "Elephant", "Lion", "Bear"],
    correctAnswer: "Lion",
  },
  {
    id: "4",
    question: "What is the capital city of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
];

export default function App() {
  return (
    <div className="app">
      <Header />
      <Quiz />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Quizzie</h1>
    </header>
  );
}

function Quiz() {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const currentQuestion = questionList[currQuestion];
  const isLastQuestion = currQuestion === questionList.length - 1;
  const isQuizFinished = isLastQuestion && selectedAnswer !== null;
  const progressCount = currQuestion + 1;
  const progressTotal = questionList.length;

  function handleAnswer(answer) {
    setSelectedAnswer(answer);
  }

  function handleNextQuestion() {
    setCurrQuestion((curr) => curr + 1);
    setSelectedAnswer(null);
  }

  function handleRestartQuiz() {
    setCurrQuestion(0);
    setSelectedAnswer(null);
  }

  return (
    <section className="quiz-card">
      <Question
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
        onNextQuestion={handleNextQuestion}
        onRestartQuiz={handleRestartQuiz}
        isQuizFinished={isQuizFinished}
        progressCount={progressCount}
        progressTotal={progressTotal}
      />
    </section>
  );
}

function Question({
  question,
  onAnswer,
  selectedAnswer,
  isQuizFinished,
  onRestartQuiz,
  onNextQuestion,
  progressCount,
  progressTotal,
}) {
  return (
    <div className="question-headline">
      <h2>{question.question}</h2>
      <AnswerList
        question={question}
        onAnswer={onAnswer}
        selectedAnswer={selectedAnswer}
        isQuizFinished={isQuizFinished}
        onRestartQuiz={onRestartQuiz}
        onNextQuestion={onNextQuestion}
        progressCount={progressCount}
        progressTotal={progressTotal}
      />
    </div>
  );
}

function AnswerList({
  question,
  onAnswer,
  selectedAnswer,
  isQuizFinished,
  onRestartQuiz,
  onNextQuestion,
  progressCount,
  progressTotal,
}) {
  function getAnswerClass(answer) {
    const isClicked = selectedAnswer !== null;
    const isSelected = selectedAnswer === answer;
    const isCorrect = answer === question.correctAnswer;
    if (!isClicked) return "";
    if (isCorrect) return "correct";
    if (isSelected) return "wrong";
    return "";
  }

  return (
    <div className="answer-card">
      {question.answers.map((answer) => (
        <Button
          key={answer}
          onClick={() => onAnswer(answer)}
          disabled={selectedAnswer !== null}
          className={getAnswerClass(answer)}
        >
          {answer}
        </Button>
      ))}

      <div className="progress">
        <p>
          {progressCount} / {progressTotal} Questions
        </p>
      </div>
      <div className="next-question">
        <Button
          className={selectedAnswer !== null ? "active" : "next-btn"}
          disabled={selectedAnswer === null}
          onClick={isQuizFinished ? onRestartQuiz : onNextQuestion}
        >
          {isQuizFinished ? "Restart" : "Next"}
        </Button>
      </div>
    </div>
  );
}

function Button({ children, onClick, className, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
