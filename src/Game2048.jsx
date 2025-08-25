import React, { useState, useEffect, useCallback } from 'react';

const Game2048 = () => {
  // Aggiungi un numero casuale in una posizione vuota
  const addRandomNumber = (grid) => {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }
    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  // Inizializza la griglia vuota
  const initializeGrid = () => {
    const grid = Array(4).fill(null).map(() => Array(4).fill(0));
    // Aggiungi due numeri casuali all'inizio
    addRandomNumber(grid);
    addRandomNumber(grid);
    return grid;
  };

  const [grid, setGrid] = useState(initializeGrid);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Funzione per muovere e fondere le tile
  const moveLeft = (grid) => {
    let newGrid = grid.map(row => [...row]);
    let scoreIncrease = 0;
    let moved = false;

    for (let i = 0; i < 4; i++) {
      let row = newGrid[i].filter(val => val !== 0);
      
      // Fusione
      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          scoreIncrease += row[j];
          row[j + 1] = 0;
          if (row[j] === 2048) setGameWon(true);
        }
      }
      
      row = row.filter(val => val !== 0);
      while (row.length < 4) {
        row.push(0);
      }
      
      // Verifica se c'è stato movimento
      for (let j = 0; j < 4; j++) {
        if (newGrid[i][j] !== row[j]) {
          moved = true;
        }
      }
      
      newGrid[i] = row;
    }

    return { grid: newGrid, scoreIncrease, moved };
  };

  const moveRight = (grid) => {
    const reversed = grid.map(row => [...row].reverse());
    const result = moveLeft(reversed);
    return {
      ...result,
      grid: result.grid.map(row => [...row].reverse())
    };
  };

  const moveUp = (grid) => {
    const transposed = transpose(grid);
    const result = moveLeft(transposed);
    return {
      ...result,
      grid: transpose(result.grid)
    };
  };

  const moveDown = (grid) => {
    const transposed = transpose(grid);
    const result = moveRight(transposed);
    return {
      ...result,
      grid: transpose(result.grid)
    };
  };

  const transpose = (grid) => {
    return grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
  };

  const isGameOver = (grid) => {
    // Controlla se ci sono celle vuote
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) return false;
      }
    }

    // Controlla se ci sono mosse possibili
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const current = grid[i][j];
        if ((i < 3 && grid[i + 1][j] === current) || 
            (j < 3 && grid[i][j + 1] === current)) {
          return false;
        }
      }
    }
    return true;
  };

  const handleMove = useCallback((direction) => {
    if (gameOver || gameWon) return;

    let result;
    switch (direction) {
      case 'ArrowLeft':
        result = moveLeft(grid);
        break;
      case 'ArrowRight':
        result = moveRight(grid);
        break;
      case 'ArrowUp':
        result = moveUp(grid);
        break;
      case 'ArrowDown':
        result = moveDown(grid);
        break;
      default:
        return;
    }

    if (result.moved) {
      addRandomNumber(result.grid);
      setGrid(result.grid);
      setScore(prev => prev + result.scoreIncrease);
      
      if (isGameOver(result.grid)) {
        setGameOver(true);
      }
    }
  }, [grid, gameOver, gameWon]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
        event.preventDefault();
        handleMove(event.code);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleMove]);

  const resetGame = () => {
    setGrid(initializeGrid());
    setScore(0);
    setGameWon(false);
    setGameOver(false);
  };

  // Funzione per ottenere i colori basati sul valore
  const getTileStyle = (value) => {
    const styles = {
      0: 'bg-gradient-to-br from-orange-100 to-orange-50 text-transparent',
      2: 'bg-gradient-to-br from-yellow-200 to-yellow-100 text-orange-800',
      4: 'bg-gradient-to-br from-yellow-300 to-yellow-200 text-orange-900',
      8: 'bg-gradient-to-br from-orange-300 to-orange-200 text-red-900',
      16: 'bg-gradient-to-br from-orange-400 to-orange-300 text-red-900',
      32: 'bg-gradient-to-br from-red-300 to-orange-400 text-white',
      64: 'bg-gradient-to-br from-red-400 to-red-300 text-white',
      128: 'bg-gradient-to-br from-red-500 to-red-400 text-white shadow-lg',
      256: 'bg-gradient-to-br from-red-600 to-red-500 text-white shadow-lg',
      512: 'bg-gradient-to-br from-red-700 to-red-600 text-white shadow-xl',
      1024: 'bg-gradient-to-br from-red-800 to-red-700 text-yellow-200 shadow-xl',
      2048: 'bg-gradient-to-br from-yellow-400 via-red-500 to-red-800 text-white shadow-2xl animate-pulse'
    };
    return styles[value] || 'bg-gradient-to-br from-red-900 to-red-800 text-yellow-200 shadow-2xl';
  };

  const getFontSize = (value) => {
    if (value >= 1024) return 'text-xl';
    if (value >= 128) return 'text-2xl';
    if (value >= 16) return 'text-3xl';
    return 'text-4xl';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            2048
          </h1>
          <div className="flex justify-between items-center mb-4">
            <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-6 py-3 rounded-xl shadow-lg">
              <div className="text-sm font-medium">PUNTEGGIO</div>
              <div className="text-2xl font-bold">{score}</div>
            </div>
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 font-bold"
            >
              NUOVO GIOCO
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="bg-gradient-to-br from-orange-300 to-red-300 p-4 rounded-2xl shadow-inner mb-6">
          <div className="grid grid-cols-4 gap-3">
            {grid.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`
                    aspect-square rounded-xl flex items-center justify-center font-bold transition-all duration-200 transform hover:scale-105
                    ${getTileStyle(cell)}
                    ${getFontSize(cell)}
                  `}
                >
                  {cell !== 0 && cell}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="text-center text-gray-600 mb-4">
          <p className="text-sm mb-2">Usa le frecce della tastiera per muovere le tessere</p>
          <div className="flex justify-center space-x-2">
            <div className="grid grid-cols-3 gap-1 w-32">
              <div></div>
              <button
                onClick={() => handleMove('ArrowUp')}
                className="bg-gradient-to-r from-orange-200 to-yellow-200 hover:from-orange-300 hover:to-yellow-300 p-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                ↑
              </button>
              <div></div>
              <button
                onClick={() => handleMove('ArrowLeft')}
                className="bg-gradient-to-r from-orange-200 to-yellow-200 hover:from-orange-300 hover:to-yellow-300 p-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                ←
              </button>
              <div></div>
              <button
                onClick={() => handleMove('ArrowRight')}
                className="bg-gradient-to-r from-orange-200 to-yellow-200 hover:from-orange-300 hover:to-yellow-300 p-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                →
              </button>
              <div></div>
              <button
                onClick={() => handleMove('ArrowDown')}
                className="bg-gradient-to-r from-orange-200 to-yellow-200 hover:from-orange-300 hover:to-yellow-300 p-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                ↓
              </button>
              <div></div>
            </div>
          </div>
        </div>

        {/* Game Over/Win Overlay */}
        {(gameOver || gameWon) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm mx-4">
              <h2 className={`text-4xl font-bold mb-4 ${gameWon ? 'text-yellow-500' : 'text-red-500'}`}>
                {gameWon ? 'HAI VINTO! 🎉' : 'GAME OVER! 😔'}
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Punteggio finale: <span className="font-bold text-orange-600">{score}</span>
              </p>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 font-bold text-lg"
              >
                RIPROVA
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game2048;