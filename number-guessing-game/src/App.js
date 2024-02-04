import React, { useState, useEffect } from 'react';
import './App.css';

const NumberGuessingGame = () => {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleInputChange = (event) => {
    setUserGuess(event.target.value);
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault();

    const guess = parseInt(userGuess, 10);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      setFeedback('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts(attempts + 1);

    if (guess === targetNumber) {
      setFeedback(`Congratulations! You guessed the correct number in ${attempts} attempts.`);
    } else if (guess < targetNumber) {
      setFeedback('Too low! Try a higher number.');
    } else {
      setFeedback('Too high! Try a lower number.');
    }
  };

  const handleNewGame = () => {
    setTargetNumber(generateRandomNumber());
    setUserGuess('');
    setFeedback('');
    setAttempts(0);
  };

  useEffect(() => {
    document.title = `Guess the Number | Attempts: ${attempts}`;
  }, [attempts]);

  return (
    <div className="number-guessing-game">
      <h1>Number Guessing Game</h1>
      <p>Guess a number between 1 and 100:</p>
      <form onSubmit={handleGuessSubmit}>
        <input
          type="text"
          value={userGuess}
          onChange={handleInputChange}
          placeholder="Enter your guess"
        />
        <button type="submit">Guess</button>
      </form>
      <p>{feedback}</p>
      <button onClick={handleNewGame}>New Game</button>
    </div>
  );
};

export default NumberGuessingGame;