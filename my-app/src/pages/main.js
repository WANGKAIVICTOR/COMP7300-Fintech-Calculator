import React from 'react';
import { useNavigate  } from 'react-router-dom';
import {  Button } from 'antd'
function Component1() {
  const navigate = useNavigate();
  const handleClick_kelly = () => { navigate('/kelly');window.location.reload();};
  const handleClick_marketnew = () => { navigate('/marketnew');window.location.reload();};
  const handleClick_compunds = () => { navigate('/compound');window.location.reload();};
  const handleClick_simple = () => { navigate('/simple');window.location.reload();};


  return (
    <div>
      <h1>这里是一个九宫格</h1>
      <Button onClick={handleClick_kelly}>跳转到 kelly-formula</Button>
      <Button onClick={handleClick_marketnew}>跳转到 marketnew</Button>
      <Button onClick={handleClick_compunds}>跳转到 compound</Button>
      <Button onClick={handleClick_simple}>跳转到 simple</Button>
      <Button onClick={handleClick_marketnew}>跳转到 Component2</Button>
      <Button onClick={handleClick_compunds}>跳转到 Component2</Button>
    </div>
  );
}

export default Component1;
