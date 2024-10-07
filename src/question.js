class Question {
    constructor(text, choices, answer, difficulty) {
      this.text = text;       // Store the question text
      this.choices = choices; // Store the array of choices
      this.answer = answer;   // Store the correct answer
      this.difficulty = difficulty; // Store the difficulty level
    }
  
    // Shuffle the choices array
    shuffleChoices() {
      for (let i = this.choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
      }
    }
  }
  