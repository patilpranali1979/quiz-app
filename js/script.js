const questions = [
    {
        question: "1. What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "None of these"
        ],
        answer: 0
    },
    {
        question: "2. Which language is used for styling web pages?",
        options: ["HTML", "CSS", "Java", "Python"],
        answer: 1
    },
    {
        question: "3. Which symbol is used for comments in JavaScript?",
        options: ["##", "<!-- -->", "//", "**"],
        answer: 2
    },
    {
        question: "4. Which keyword declares a variable in JavaScript?",
        options: ["int", "var", "string", "define"],
        answer: 1
    },
    {
        question: "5. Which company developed JavaScript?",
        options: ["Microsoft", "Google", "Netscape", "Apple"],
        answer: 2
    },
    {
        question: "6. Which HTML tag creates a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
    },
    {
        question: "7. Which method adds an element to an array?",
        options: ["push()", "pop()", "shift()", "delete()"],
        answer: 0
    },
    {
        question: "8. Which operator is used for strict equality?",
        options: ["=", "==", "===", "!="],
        answer: 2
    },
    {
        question: "9. Which function displays a message in the console?",
        options: ["print()", "console.log()", "display()", "show()"],
        answer: 1
    },
    {
        question: "10. Which HTML tag is used for the largest heading?",
        options: ["<h6>", "<head>", "<h1>", "<heading>"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const finalScore = document.getElementById("final-score");
const percentage = document.getElementById("percentage");
const restartBtn = document.getElementById("restart-btn");

// Display Question
function showQuestion() {

    answered = false;
    nextBtn.disabled = true;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        optionsContainer.appendChild(button);
    });
}

// Check Answer
function checkAnswer(selected, button) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;

    const allButtons = document.querySelectorAll(".option-btn");

    if (selected === correctAnswer) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
        allButtons[correctAnswer].classList.add("correct");
    }

    allButtons.forEach(btn => {
        btn.disabled = true;
    });

    scoreElement.textContent = `Score: ${score}`;

    nextBtn.disabled = false;
}

// Next Question
nextBtn.addEventListener("click", () => {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Show Final Result
function showResult() {

    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");

    finalScore.textContent =
        `Your Score: ${score} / ${questions.length}`;

    const result = (score / questions.length) * 100;

    percentage.textContent =
        `Percentage: ${result}%`;
}

// Restart Quiz
restartBtn.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    quizBox.classList.remove("hide");
    resultBox.classList.add("hide");

    showQuestion();
});

// Start Quiz
showQuestion();