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
  const restartButton = document.getElementById("restartButton");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/

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
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

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
  }

  // showResults() - Displays the quiz results
  function showResults() {
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
});
