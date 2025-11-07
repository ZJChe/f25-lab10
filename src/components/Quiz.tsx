import React, { useRef, useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';

// The component keeps minimal UI state (selected answer and a tick to force re-render)
const Quiz: React.FC = () => {
  // Keep a stable QuizCore instance for the component lifecycle
  const coreRef = useRef<QuizCore | null>(null);
  if (!coreRef.current) coreRef.current = new QuizCore();
  const quizCore = coreRef.current;

  // selectedAnswer: user's current selection for the displayed question
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  // tick: simple counter to force re-render when core state changes
  const [tick, setTick] = useState(0);
  // finished flag to indicate quiz completion UI
  const [finished, setFinished] = useState(false);

  const currentQuestion = quizCore.getCurrentQuestion();

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  }

  const handleButtonClick = (): void => {
    // Record the answer (if null, record as empty string -> treated as incorrect)
    quizCore.answerQuestion(selectedAnswer ?? '');

    // If there is a next question, advance and reset selected answer
    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setSelectedAnswer(null);
      setTick(t => t + 1); // force re-render to show new question
    } else {
      // No next question -> finish quiz
      setFinished(true);
      setTick(t => t + 1);
    }
  }

  // If there are no questions at all
  if (!currentQuestion && !finished) {
    return (
      <div>
        <h2>Quiz</h2>
        <p>No questions available.</p>
      </div>
    );
  }

  if (finished || !currentQuestion) {
    const score = quizCore.getScore();
    const total = quizCore.getTotalQuestions();
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {total}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
  <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
}

export default Quiz;