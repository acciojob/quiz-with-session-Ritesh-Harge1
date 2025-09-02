const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Rome"],
    answer: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Shakespeare", "Tolstoy", "Hemingway", "Dickens"],
    answer: 0
  },
  {
    question: "Which ocean is the largest?",
    choices: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: 2
  }
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || Array(questions.length).fill(null);

// Render questions
questions.forEach((q, idx) => {
  const qDiv = document.createElement("div");

  const qText = document.createElement("p");
  qText.textContent = q.question;
  qDiv.appendChild(qText);

  q.choices.forEach((choice, i) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "q" + idx;
    input.value = i;

    if (progress[idx] === i) input.checked = true;

    input.addEventListener("change", () => {
      progress[idx] = i;
      sessionStorage.setItem("progress", JSON.stringify(progress));
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(choice));
    qDiv.appendChild(label);
    qDiv.appendChild(document.createElement("br"));
  });

  questionsDiv.appendChild(qDiv);
});

// Submit button
submitBtn.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, idx) => {
    if (progress[idx] === q.answer) score++;
  });

  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

