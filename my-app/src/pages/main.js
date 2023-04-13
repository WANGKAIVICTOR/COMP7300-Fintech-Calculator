import React from 'react';
import { useNavigate  } from 'react-router-dom';

function Component1() {
  const navigate = useNavigate();
  const handleClick_kelly = () => { navigate('/kelly');window.location.reload();};
  const handleClick_marketnew = () => { navigate('/marketnew');window.location.reload();};
  const handleClick_compunds = () => { navigate('/compunds');window.location.reload();};

  return (
    <div>
      <h1>Component1</h1>
      <button onClick={handleClick_kelly}>跳转到 kelly-formula</button>
      <button onClick={handleClick_marketnew}>跳转到 Component2</button>
      <button onClick={handleClick_compunds}>跳转到 Component2</button>
      <button onClick={handleClick_kelly}>跳转到 Component2</button>
      <button onClick={handleClick_marketnew}>跳转到 Component2</button>
      <button onClick={handleClick_compunds}>跳转到 Component2</button>
    </div>
  );
}

export default Component1;
