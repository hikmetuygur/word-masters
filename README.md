# Wordle Masters

Wordle Masters is a simple word-guessing game where players try to guess a randomly selected word within a limited number of attempts. This project consists of an HTML, CSS, and JavaScript-based web application that allows users to play the game in their web browsers.

## Preview

![Word Masters Demo](/assets/wordle-preview.mp4)

## How to Play

1. When you open the Wordle Masters game in your web browser, you will see a grid of empty boxes representing letters. The objective is to guess the hidden word within a limited number of rounds.

2. Each round, you can enter a letter by pressing the corresponding key on your keyboard. The letter will appear in the empty boxes. The word to be guessed is five letters long.

3. After entering a full five-letter word, press the "Enter" key to submit your guess.

4. The game will provide feedback on your guess:

   - Correct letters in the correct position will be marked in dark green.
   - Correct letters in the wrong position will be marked in a different color.
   - Incorrect letters will be marked with an animation.

5. Continue guessing words until you correctly guess the entire word or complete all six rounds.

6. If you guess the word correctly within the six rounds, you win the game and a fun confetti animation will celebrate your victory.

7. If you are unable to guess the word within the allotted rounds, you lose, and the game will reveal the hidden word.

## Installation and Usage

To run the Wordle Masters game locally on your machine, follow these steps:

1. Clone or download this repository to your computer.

2. Open the `index.html` file in your web browser (e.g., Chrome, Firefox).

3. Start playing the Wordle Masters game following the instructions outlined in the "How to Play" section.

## Credits

- <a href="https://frontendmasters.com/">frontendmasters.com</a> :heart:
- This project uses the [JSConfetti](https://www.jsdelivr.com/package/npm/js-confetti) library to create the confetti animation.
- The game fetches a random word of the day from the [Words API](https://www.wordsapi.com/).

## Author

The Wordle Masters game was developed by Brian Holt and Hikmet Uygur.

## Acknowledgments

Special thanks to <a href="https://frontendmasters.com/">frontendmasters.com</a> and the creators of the Words API and JSConfetti for providing the tools used in this project.

Made from <a href="https://twitter.com/huygurdev">Hikmet</a> with :heart:
