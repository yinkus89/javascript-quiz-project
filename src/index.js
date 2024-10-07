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
<<<<<<< HEAD
  const restartButton = document.getElementById("restartButton");
=======
>>>>>>> dd41786a0fa97bbf0044deca322dbd264006666d

  /************  SET VISIBILITY OF VIEWS  ************/
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/
<<<<<<< HEAD

  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question(
      "What is the capital of France?",
      ["Miami", "Paris", "Oslo", "Rome"],
      "Paris",
      1
    ),
    new Question(
      "Who created JavaScript?",
      ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"],
      "Brendan Eich",
      2
    ),
    new Question(
      "What is the mass–energy equivalence equation?",
      ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"],
      "E = mc^2",
      3
    ),
    new Question(
      "What is the largest planet in our Solar System?",
      ["Earth", "Mars", "Jupiter", "Saturn"],
      "Jupiter",
      2
    ),
    new Question(
      "Which element has the chemical symbol 'O'?",
      ["Osmium", "Oxygen", "Gold", "Iron"],
      "Oxygen",
      1
    ),
    new Question(
      "Who wrote 'Hamlet'?",
      [
        "Charles Dickens",
        "Mark Twain",
        "William Shakespeare",
        "Ernest Hemingway",
      ],
      "William Shakespeare",
      2
    ),
    new Question(
      "What is the smallest prime number?",
      ["0", "1", "2", "3"],
      "2",
      1
    ),
    new Question(
      "In what year did the Titanic sink?",
      ["1912", "1905", "1915", "1920"],
      "1912",
      3
    ),
    new Question(
      "What is the powerhouse of the cell?",
      ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
      "Mitochondria",
      2
    ),
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
=======
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
>>>>>>> dd41786a0fa97bbf0044deca322dbd264006666d
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/
<<<<<<< HEAD

  // Convert the time remaining in seconds to minutes and seconds
  function updateTimer() {
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    // Display the time remaining in the time remaining container
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }

  // Show first question
  showQuestion();

  /************  TIMER  ************/
  let timer;

  function startTimer() {
    timer = setInterval(() => {
      quiz.timeRemaining--;

      updateTimer();
      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  }

  startTimer();

  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", restartQuiz);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  function showQuestion() {
    const currentQuestion = quiz.getQuestion();

    // Clear the previous question and choices
    questionContainer.innerText = currentQuestion.text;
    choiceContainer.innerHTML = "";

    // Shuffle and display the choices
    currentQuestion.shuffleChoices();
    currentQuestion.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = "choice";
      choiceElement.value = choice;

      const label = document.createElement("label");
      label.innerText = choice;
      label.prepend(choiceElement);

      const choiceWrapper = document.createElement("div");
      choiceWrapper.appendChild(label);

      choiceContainer.appendChild(choiceWrapper);
    });

    // Update the progress bar and question count
    const progressPercentage =
      ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;
  }

  // nextButtonHandler() - Handles the click on the next button
  function nextButtonHandler() {
    let selectedAnswer;

    // 1. Get all the choice elements
    const choiceElements = document.querySelectorAll('input[name="choice"]');

    // 2. Loop through all the choice elements and find the selected one
    choiceElements.forEach((choiceElement) => {
      if (choiceElement.checked) {
        selectedAnswer = choiceElement.value;
      }
    });

    // 3. If an answer is selected, check if it is correct and move to the next question
    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      if (!quiz.hasEnded()) {
        quiz.moveToNextQuestion();
        showQuestion();
      } else {
        endQuiz();
      }
    }
  }

  // endQuiz() - Ends the quiz and shows the results
  function endQuiz() {
    clearInterval(timer);
    showResults();
=======
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
>>>>>>> dd41786a0fa97bbf0044deca322dbd264006666d
  }

  // showResults() - Displays the quiz results
  function showResults() {
<<<<<<< HEAD
    // Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // Show the end view (div#endView)
    endView.style.display = "flex";

    // Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }

  // restartQuiz() - Restarts the quiz from the beginning
  function restartQuiz() {
    // Reset the quiz properties
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.timeRemaining = quizDuration;

    // Shuffle the questions again
    quiz.shuffleQuestions();

    // Hide the end view and show the quiz view again
    endView.style.display = "none";
    quizView.style.display = "block";

    // Reset and start the timer
    clearInterval(timer);
    updateTimer();
    startTimer();

    // Show the first question
    showQuestion();
  }
=======
    quizView.style.display = "none"; // Hide the quiz view
    endView.style.display = "flex"; // Show the end view
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // Show the result
  }
>>>>>>> dd41786a0fa97bbf0044deca322dbd264006666d
});
