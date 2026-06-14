import { useState } from "react";

const questionList = [
  {
    id: "1",
    question: "Welcher Planet ist der größte in unserem Sonnensystem?",
    answers: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: "Jupiter",
  },
  {
    id: "2",
    question: "Welches Tier wird als König der Tiere bezeichnet?",
    answers: ["Tiger", "Elefant", "Löwe", "Bär"],
    correctAnswer: "Löwe",
  },
  {
    id: "3",
    question: "Wie viele Kontinente gibt es auf der Erde?",
    answers: ["5", "6", "7", "8"],
    correctAnswer: "7",
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

  function handleAnswer(answer) {
    setSelectedAnswer(answer);
  }

  return (
    <section className="quiz-card">
      <Question
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
      />
    </section>
  );
}

function Question({ question, onAnswer, selectedAnswer }) {
  return (
    <div className="question-headline">
      <h2>{question.question}</h2>
      <AnswerList
        question={question}
        onAnswer={onAnswer}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
}

function AnswerList({ question, onAnswer, selectedAnswer }) {
  return (
    <div className="answer-card">
      {question.answers.map((answer) => (
        <Button
          key={answer}
          onClick={() => onAnswer(answer)}
          disabled={selectedAnswer !== null}
          className={
            selectedAnswer === answer
              ? answer === question.correctAnswer
                ? "correct"
                : "wrong"
              : ""
          }
        >
          {answer}
        </Button>
      ))}

      <div className="progress">
        <p>1 / 3 Questions</p>
      </div>
      <div className="next-question">
        <Button
          className={selectedAnswer !== null ? "active" : "next-btn"}
          disabled={selectedAnswer === null}
        >
          next
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
