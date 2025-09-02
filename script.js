// Define the exact questions expected by Cypress
const questions = [
  {
    question: "What is the highest mountain in the world?",
    choices: ["K2", "Everest", "Kilimanjaro", "Denali"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    question: "What is the chemical symbol for water?",
    choices: ["H2O", "O2", "CO2", "NaCl"],
    answer: 0
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Shakespeare", "Hemingway", "Tolstoy", "Dickens"],
    answer: 0
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3
  }
];

const questionsDiv = document.getElementById('questions');
const submitBtn = document.getElementById('submit');
const scoreDiv = document.getElementById('score');

// Load progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem('progress')) || Array(questions.length).fill(null);

// Render the questions and choices
questions.forEach((q, index) => {
  const qDiv = document.createElement('div');
  const qText = document.createElement('p');
  qText.textContent = q.question;
  qDiv.appendChild(qText);

  q.choices.forEach((choice, i) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'q' + index;
    input.value = i;

    // Restore checked state from sessionStorage
    if (progress[index] == i) input.checked = true;

    input.addEventListener('change', () => {
      progress[index] = i;
      sessionStorage.setItem('progress', JSON.stringify(progress));
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(choice));
    qDiv.appendChild(label);
    qDiv.appendChild(document.createElement('br'));
  });

  questionsDiv.appendChild(qDiv);
});

// Submit button functionality
submitBtn.addEventListener('click', () => {
  let score = 0;
  questions.forEach((q, index) => {
    if (progress[index] == q.answer) score++;
  });
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem('score', score);
});

