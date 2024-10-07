class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions; // Store the array of questions
    this.timeLimit = timeLimit; // Set the total time limit for the quiz
    this.timeRemaining = timeRemaining; // Track the remaining time
    this.correctAnswers = 0; // Initialize correct answer count
    this.currentQuestionIndex = 0; // Start at the first question
  }

  // Get the current question
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // Move to the next question
  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  // Shuffle the questions array
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  // Check if the answer is correct
  checkAnswer(answer) {
    if (answer === this.getQuestion().answer) {
      this.correctAnswers++;
      return true;
    }
    return false;
  }

  // Check if the quiz has ended
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }

  // Filter questions by difficulty
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
    }
  }

  // Calculate the average difficulty of the quiz questions
  averageDifficulty() {
    if (this.questions.length === 0) return 0;

    const totalDifficulty = this.questions.reduce(
      (sum, question) => sum + parseInt(question.difficulty),
      0
    );
    return totalDifficulty / this.questions.length;
  }
}
