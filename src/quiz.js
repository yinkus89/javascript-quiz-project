class Quiz {
  constructor(questions = [], timeLimit = 60, timeRemaining = 60) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0; 
    this.currentQuestionIndex = 0;
  }

  // Method to get the current question
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // Method to move to the next question
  moveToNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestionIndex++;
    }
  }

  // Method to shuffle questions array
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
  }

  // Method to check if the provided answer is correct
  checkAnswer(answer) {
    const currentQuestion = this.getQuestion();
    if (currentQuestion.answer === answer) {
      this.correctAnswers++; // Increase correctAnswers if the answer is correct
    }
  }

  // Method to check if the quiz has ended
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }

  // Method to filter questions by difficulty
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter(q => parseInt(q.difficulty) === difficulty);
    }
  }

  // Method to calculate average difficulty
  averageDifficulty() {
    if (this.questions.length === 0) return 0; // Edge case: No questions
    const totalDifficulty = this.questions.reduce((acc, question) => acc + parseInt(question.difficulty), 0);
    return totalDifficulty / this.questions.length;
  }

  // Method to reduce time remaining
  reduceTime(seconds) {
    this.timeRemaining -= seconds;
    if (this.timeRemaining <= 0) {
      this.timeRemaining = 0;
      return true; // Return true if time is up
    }
    return false; // Return false if time is still remaining
  }

  // Method to reset quiz
  reset() {
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
    this.timeRemaining = this.timeLimit;
    this.shuffleQuestions(); // Shuffle questions for a new game
  }
}
