import React, { useState } from 'react';

function MyForm() {
  const [odds, setOdds] = useState('');
  const [p, setP] = useState('');
  const [q, setQ] = useState('');
  const [betSize, setBetSize] = useState('');
  
  
  const handleSubmit = async (event) => {
    console.log(odds,p,q)
    event.preventDefault();
    fetch(`http://127.0.0.1:8000/kelly?b=${odds}&p=${p}&q=${q}`,{mode: 'cors'})
    .then(response => response.json())
    .then(data => {
    console.log(data);
    setBetSize(data.betSize);
    // 这里可以对返回的数据进行处理
  })

 

  .catch(error => {
    console.error(error);
  });

    // const url = `http://127.0.0.1:8000/kelly?b=${odds}&p=${p}&q=${q}`;
    // const response = await fetch(url);
    // const data = await response.json();
    // console.log(response)
    // setBetSize(data.betSize);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="odds">Odds:</label>
        <input type="text" id="odds" name="odds" onChange={(event) => setOdds(event.target.value)} />
      </div>
      <div>
        <label htmlFor="p">Chance of victory:</label>
        <input type="text" id="p" name="p" onChange={(event) => setP(event.target.value)} />
      </div>
      <div>
        <label htmlFor="q">Chance of losing:</label>
        <input type="text" id="q" name="q" onChange={(event) => setQ(event.target.value)} />
      </div>
      <button type="submit">Submit</button>
      <div>
        <label htmlFor="betSize">Bet Size:</label>
        <input type="text" id="betSize" name="betSize" value={betSize} readOnly />
      </div>
    </form>
  );
}

export default MyForm;