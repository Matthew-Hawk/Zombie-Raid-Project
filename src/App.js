import './App.css';
import React, { useState, useEffect } from "react";
function App() {

  const [counter, setCounter] = useState(0);
  const [result, setResult] = useState('Have not left for adventure yet');

  const handleClick1 = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  const handleClick2 = () => {
    setCounter(prevCounter => prevCounter - 1);
  };

  const handleClick3 = () => {
    setCounter(0);
    setResult('Have not left for adventure yet');
  };

  const handleCheckCounter = () => {
    checkCounter(counter);
  };

  function checkCounter(counterValue) {
    const limit = 5;
    if (counterValue >= limit) {
      setResult("You lived");
    } else {
      setResult("You died");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='Header-title'>TRIALS</h1>
      </header>
      <h2 className='App-Counter'>{counter}</h2>
      <h2 className='App-Counter'>{result}</h2>
      <body className ='App-Body'>
        <div className='Body-bullet-buttons'>
          <button 
            type="button" 
            className='Body-Button' 
            onClick={handleClick1}
            >Add 1</button>
          <button 
            type="button" 
            className='Body-Button' 
            onClick={handleClick2}
            >Subtract 1</button>
        </div>
      <button 
        type="button" 
        className='Body-Button' 
        onClick={handleClick3}
        >Reset</button>
      <button 
        type="button" 
        className='Body-Button'
        onClick={handleCheckCounter} 
        >Run Adventure</button>
      </body>
    </div>
  );
}

export default App;
