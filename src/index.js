document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/
  const quizDuration = 120; // 120 seconds (2 minutes)
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    new Question("What is the largest ocean on Earth?", ["Atlantic", "Indian", "Pacific", "Southern"], "Pacific", 2),
    new Question("Which element has the chemical symbol 'O'?", ["Oxygen", "Gold", "Hydrogen", "Silver"], "Oxygen", 1),
    new Question("Who wrote 'Romeo and Juliet'?", ["Charles Dickens", "Shakespeare", "Mark Twain", "Hemingway"], "Shakespeare", 2),
    new Question("What is the hardest natural substance on Earth?", ["Diamond", "Iron", "Gold", "Graphite"], "Diamond", 2),
    new Question("Which gas do plants absorb from the atmosphere?", ["Oxygen", "Carbon dioxide", "Nitrogen", "Helium"], "Carbon dioxide", 1),
    new Question("Which planet is known as the Red Planet?", ["Earth", "Mars", "Jupiter", "Saturn"], "Mars", 1)
  ];

  /************  QUIZ INSTANCE  ************/
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/
  showQuestion();

  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear previous question and choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question
    const question = quiz.getQuestion();
    question.shuffleChoices();

    // Show the question text
    questionContainer.innerText = question.text;

    // Update the progress bar
    const progressPercentage = ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    // Update the question count
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

    // Create radio buttons for each choice
    question.choices.forEach((choice, index) => {
      const inputElement = document.createElement("input");
      inputElement.type = "radio";
      inputElement.name = "choice";
      inputElement.value = choice;
      inputElement.id = `choice${index}`;

      const labelElement = document.createElement("label");
      labelElement.setAttribute("for", `choice${index}`);
      labelElement.innerText = choice;

      choiceContainer.appendChild(inputElement);
      choiceContainer.appendChild(labelElement);
      choiceContainer.appendChild(document.createElement("br")); // Add a line break
    });
  }

  function nextButtonHandler() {
    let selectedAnswer;

    // Get all choice elements
    const choices = document.querySelectorAll('input[name="choice"]');

    // Loop through choices and find the selected one
    choices.forEach(choice => {
      if (choice.checked) {
        selectedAnswer = choice.value; // Store the selected answer
      }
    });

    // Check if an answer was selected
    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer); // Check if the selected answer is correct
      quiz.moveToNextQuestion(); // Move to the next question
      showQuestion(); // Show the next question
    } else {
      alert("Please select an answer!"); // Prompt if no answer is selected
    }
  }

  function showResults() {
    quizView.style.display = "none"; // Hide the quiz view
    endView.style.display = "flex"; // Show the end view
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // Show the result
  }
});
