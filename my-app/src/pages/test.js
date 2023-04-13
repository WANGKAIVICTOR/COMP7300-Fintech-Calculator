import React, { useState } from 'react';

function Calculator() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  const handleButtonClick = () => {
    setC(a + b);
  };

  return (
    <div>
      <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
      <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
      
      
      <button onClick={handleButtonClick}>Calculate</button>
      <input type="number" value={c} readOnly />
      
    </div>
  );
}

export default Calculator;






