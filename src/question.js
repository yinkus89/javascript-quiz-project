// Question Class
class Question {
<<<<<<< HEAD
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
  
=======
  constructor(text, choices, answer, difficulty) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
      this.difficulty = difficulty;
  }

  // Method to shuffle the choices for each question
  shuffleChoices() {
      for (let i = this.choices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
      }
  }
}


// Step 2: Creating 10 Questions
const questions = [
  new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
  new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
  new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
  new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
  new Question("Which planet is known as the Red Planet?", ["Earth", "Mars", "Jupiter", "Saturn"], "Mars", 1),
  new Question("What is the largest ocean on Earth?", ["Atlantic", "Indian", "Pacific", "Southern"], "Pacific", 2),
  new Question("Which element has the chemical symbol 'O'?", ["Oxygen", "Gold", "Hydrogen", "Silver"], "Oxygen", 1),
  new Question("Who wrote 'Romeo and Juliet'?", ["Charles Dickens", "Shakespeare", "Mark Twain", "Hemingway"], "Shakespeare", 2),
  new Question("What is the hardest natural substance on Earth?", ["Diamond", "Iron", "Gold", "Graphite"], "Diamond", 2),
  new Question("Which gas do plants absorb from the atmosphere?", ["Oxygen", "Carbon dioxide", "Nitrogen", "Helium"], "Carbon dioxide", 1)
];

const quiz = new Quiz(questions, 120, 120);
quiz.shuffleQuestions();

// Step 3: Displaying Questions and Handling Answers in the DOM
document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question");
  const choicesContainer = document.getElementById("choices");
  const nextButton = document.getElementById("nextButton");
  const resultContainer = document.getElementById("result");

  function showQuestion() {
      if (quiz.hasEnded()) {
          showResults();
          return;
      }

      // Clear previous question and choices
      questionContainer.innerText = "";
      choicesContainer.innerHTML = "";

      // Get current question and shuffle its choices
      const currentQuestion = quiz.getQuestion();
      currentQuestion.shuffleChoices();

      // Display the current question text
      questionContainer.innerText = currentQuestion.text;

      // Display the choices as radio buttons
      currentQuestion.choices.forEach((choice, index) => {
          const choiceElement = document.createElement("div");
          const inputElement = document.createElement("input");
          inputElement.type = "radio";
          inputElement.name = "choice";
          inputElement.value = index;

          const labelElement = document.createElement("label");
          labelElement.textContent = choice;

          choiceElement.appendChild(inputElement);
          choiceElement.appendChild(labelElement);
          choicesContainer.appendChild(choiceElement);
      });
  }

  function nextButtonHandler() {
      const choices = document.querySelectorAll("input[name='choice']");
      let selectedAnswer = null;

      // Loop through all choices and find the selected one
      choices.forEach((choice) => {
          if (choice.checked) {
              selectedAnswer = parseInt(choice.value);
          }
      });

      if (selectedAnswer !== null) {
          quiz.checkAnswer(selectedAnswer);
          quiz.moveToNextQuestion();
          showQuestion();
      } else {
          alert("Please select an answer!");
      }
  }

  function showResults() {
      // Hide the quiz and display the results
      document.getElementById("quizView").style.display = "none";
      resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct!`;
  }

  // Initialize quiz by showing the first question
  showQuestion();

  // Add event listener to the Next button
  nextButton.addEventListener("click", nextButtonHandler);
});
>>>>>>> dd41786a0fa97bbf0044deca322dbd264006666d
