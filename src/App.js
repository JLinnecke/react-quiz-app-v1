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

  const currentQuestion = questionList[currQuestion];

  return (
    <section className="quiz-card">
      <Question question={currentQuestion} />
    </section>
  );
}

function Question({ question }) {
  return (
    <div className="question-headline">
      <h2>{question.question}</h2>
      <AnswerList question={question} />
    </div>
  );
}

function AnswerList({ question }) {
  return (
    <div className="answer-card">
      {question.answers.map((answer) => (
        <Button key={answer}>{answer}</Button>
      ))}
    </div>
  );
}

function Button({ children }) {
  return <button>{children}</button>;
}
