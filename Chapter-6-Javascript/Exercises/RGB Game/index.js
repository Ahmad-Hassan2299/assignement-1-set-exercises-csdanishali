// 🎵 Sound effects
const correctSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_b43c01e2d3.mp3");
const wrongSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_43a1e7d5d6.mp3");

let correctColor;
let score = 0;
let lives = 3;
let highScore = localStorage.getItem("rgbHighScore") || 0;
let streak = 0;
let totalOptions = 3;
let timer;
let timeLeft = 5;

// DOM elements
const colorToGuess = document.getElementById("colorToGuess");
const colorOptions = document.getElementById("colorOptions");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const messageDisplay = document.getElementById("message");
const replayBtn = document.getElementById("replayBtn");
const highScoreDisplay = document.getElementById("highScore");
const timerDisplay = document.getElementById("timer");
const darkToggle = document.getElementById("toggleDark");

// 🌙 Toggle Dark Mode
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// Load dark mode if remembered
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// Start Game
function startGame() {
  score = 0;
  lives = 3;
  streak = 0;
  totalOptions = 3;
  timeLeft = 5;
  messageDisplay.textContent = "";
  replayBtn.style.display = "none";
  updateDisplay();
  generateRound();
}

// Round Generator
function generateRound() {
  clearInterval(timer);
  timeLeft = 10;
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      clearInterval(timer);
      loseLife("⏰ Time's up!");
    }
  }, 1000);

  colorOptions.innerHTML = "";
  correctColor = randomRGB();
  colorToGuess.textContent = correctColor;

  const correctIndex = Math.floor(Math.random() * totalOptions);

  for (let i = 0; i < totalOptions; i++) {
    const color = i === correctIndex ? correctColor : randomRGB();
    const btn = document.createElement("div");
    btn.classList.add("color-btn");
    btn.style.backgroundColor = color;
    btn.addEventListener("click", () => checkAnswer(color));
    colorOptions.appendChild(btn);
  }
}

// Check Answer
function checkAnswer(color) {
  clearInterval(timer);
  if (color === correctColor) {
    correctSound.play();
    score++;
    streak++;
    messageDisplay.textContent = "✅ Correct!";
    if (streak % 5 === 0) {
      lives++;
      messageDisplay.textContent += " 💖 Bonus life!";
    }
    // Difficulty increase
    if (score >= 5 && score < 10) totalOptions = 4;
    else if (score >= 10) totalOptions = 5;
  } else {
    wrongSound.play();
    loseLife("❌ Incorrect!");
    return;
  }

  updateDisplay();
  setTimeout(generateRound, 700);
}

// Lose Life
function loseLife(msg) {
  lives--;
  streak = 0;
  messageDisplay.textContent = msg;
  updateDisplay();

  if (lives <= 0) endGame();
  else setTimeout(generateRound, 1000);
}

// Update Display
function updateDisplay() {
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  highScoreDisplay.textContent = highScore;
}

// Timer UI
function updateTimer() {
  timerDisplay.textContent = timeLeft;
}

// End Game
function endGame() {
  messageDisplay.textContent = `💀 Game Over! Final Score: ${score}`;
  replayBtn.style.display = "inline-block";
  colorOptions.innerHTML = "";

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("rgbHighScore", score);
    highScoreDisplay.textContent = highScore;
    messageDisplay.textContent += " 🏆 New High Score!";
  }
}

// Generate RGB Color
function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Start game on load
startGame();

  