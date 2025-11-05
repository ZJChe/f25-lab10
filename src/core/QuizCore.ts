import quizData from '../data/quizData';
import QuizQuestion from './QuizQuestion';

/**
 * The `QuizCore` class represents the core logic for managing a quiz, including
 * maintaining the quiz questions, tracking the user's progress, and calculating
 * their score.
 * 
 * It provides methods for navigating through the quiz, answering questions,
 * and retrieving information about the current state of the quiz.
 */
class QuizCore {
  private questions: QuizQuestion[];
  private currentQuestionIndex: number;
  private score: number;

  /**
   * Constructor
   */
  constructor() {
    this.questions = quizData;
    this.currentQuestionIndex = 0;
    this.score = 0;
  }

  /**
   * Get the current question.
   * @returns The current question or null if no questions are available.
   */
  public getCurrentQuestion(): QuizQuestion | null {
    // Returns the current quiz question.
    if (this.currentQuestionIndex >= 0 && this.currentQuestionIndex < this.questions.length) {
      return this.questions[this.currentQuestionIndex];
    }
    return null;
  }

  /**
   * Move to the next question.
   */
  public nextQuestion(): void {      
    this.currentQuestionIndex++;
  }

  /**
   * Checks if there is a next question available in the quiz.
   *
   * @returns {boolean} True if there is a next question, false if the quiz has been completed.
   */
  public hasNextQuestion(): boolean {
    return this.currentQuestionIndex < this.questions.length - 1;
  }

  /**
   * Record the user's answer and update the score.
   * @param answer - The user's answer.
   */
  public answerQuestion(answer: string): void {
    // Records the user's answer and updates the score if the answer is correct.
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      this.score++;
    }
  }

  /**
   * Get the user's score.
   * @returns The user's score.
   */
  public getScore(): number {
    return this.score;
  }

  /**
   * Get the total number of questions in the quiz.
   * @returns The total number of questions.
   */
  public getTotalQuestions(): number {
    return this.questions.length;
  }
}

export default QuizCore;
