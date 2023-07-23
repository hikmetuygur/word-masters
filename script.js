const letters = document.querySelectorAll(".letter");
const loadingDiv = document.querySelector(".info-bar");
const title = document.querySelector(".title");
const alert = document.querySelector(".alert");
const ANSWER_LENGTH = 5;
const ROUNDS = 6;
const jsConfetti = new JSConfetti();

async function init() {
  let currentGuess = "";
  let currentRow = 0;
  let done = false;
  let isLoading = true;

  const res = await fetch("https://words.dev-apis.com/word-of-the-day?");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split("");
  setLoading(false);
  isLoading = false;

  console.log(word);

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      // add letter to the end
      currentGuess += letter;
    } else {
      //replace the last letter
      currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
  }

  async function commit() {
    if (currentGuess.length !== ANSWER_LENGTH) {
      //do nothing
      return;
    }

    // validate the word
    isLoading = true;
    setLoading(true);

    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });

    const resObj = await res.json();
    const validWord = resObj.validWord;
    // const { validWord } = resObj;

    isLoading = false;
    setLoading(false);

    if (!validWord) {
      markInvalidWord();
      return;
    }

    // do all marking and correct, close, wrong
    const guessParts = currentGuess.split("");
    const map = makeMap(wordParts);

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        //do nothing we already did it
      } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
        map[guessParts[i]]--;
      } else {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
      }
    }

    // did user win or lose ???
    if (currentGuess === word) {
      //win
      alert.innerText = "You win!";
      alert.classList.add("winner");
      title.classList.add("winner");
      done = true;
      jsConfetti.addConfetti({
        emojis: ["💐", "🌹", "🌼", "🌸"],
      });
      return;
    } else if (currentRow === ROUNDS) {
      alert.innerText = `you lose. the word was ${word}`;
      done = true;
    }
    currentRow++;
    currentGuess = "";
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
  }

  function markInvalidWord() {
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");

      setTimeout(function () {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid");
      }, 20);
    }
    alert.innerText = "Not a valid word.";

    setTimeout(function () {
      alert.innerText = "";
    }, 1000);
  }

  document.addEventListener("keydown", function handleKeyPress(e) {
    const action = e.key;

    if (done || isLoading) {
      // do nothing
      return;
    }

    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
  loadingDiv.classList.toggle("show", isLoading);
}

function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
}

init();
