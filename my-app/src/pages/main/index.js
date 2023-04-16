import React from 'react';
import { useNavigate  } from 'react-router-dom';
import {  Button, Card} from 'antd'
import "./index.css";
function Component1() {
  const navigate = useNavigate();
  // const handleClick_kelly = () => { navigate('/kelly');window.location.reload();};
  const handleClick_marketnew = () => { navigate('/marketnew');window.location.reload();};
  const handleClick_compunds = () => { navigate('/compound');window.location.reload();};
  const handleClick_simple = () => { navigate('/simple');window.location.reload();};

  return (
    <div className="login">
      <Card className="login-container">
        {/* <h1>这里是一个九宫格</h1> */}
        <div className="title-container">
          <div className="Fintech-title">Fintech Calculator</div>
        </div>
        
        <div className="calculator-item-row">
          <li><a className="gradient-button gradient-button-1" href='/kelly'>跳转到 kelly-formula</a></li>
          <li><a className="gradient-button gradient-button-1" href='/kelly'>跳转到 kelly-formula</a></li>
          <li><a className="gradient-button gradient-button-1" href='/kelly'>跳转到 kelly-formula</a></li>
          <li><a className="gradient-button gradient-button-1" href='/kelly'>跳转到 kelly-formula</a></li>
          
        </div>
          
        <Button onClick={handleClick_marketnew}>跳转到 marketnew</Button>
        <Button onClick={handleClick_compunds}>跳转到 compound</Button>
        <Button onClick={handleClick_simple}>跳转到 simple</Button>
        <Button onClick={handleClick_marketnew}>跳转到 Component2</Button>
        <Button onClick={handleClick_compunds}>跳转到 Component2</Button>
      </Card>
    </div>
  );
}

export default Component1;
