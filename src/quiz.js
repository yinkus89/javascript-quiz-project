class Quiz {
<<<<<<< HEAD
    constructor(questions, timeLimit, timeRemaining) {
      this.questions = questions;        // Store the array of questions
      this.timeLimit = timeLimit;        // Set the total time limit for the quiz
      this.timeRemaining = timeRemaining;// Track the remaining time
      this.correctAnswers = 0;           // Initialize correct answer count
      this.currentQuestionIndex = 0;     // Start at the first question
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
        [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
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
        this.questions = this.questions.filter(question => question.difficulty === difficulty);
      }
    }
  
    // Calculate the average difficulty of the quiz questions
    averageDifficulty() {
      if (this.questions.length === 0) return 0;
  
      const totalDifficulty = this.questions.reduce((sum, question) => sum + parseInt(question.difficulty), 0);
      return totalDifficulty / this.questions.length;
    }
  }
     
=======
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
>>>>>>> dd41786a0fa97bbf0044deca322dbd264006666d
