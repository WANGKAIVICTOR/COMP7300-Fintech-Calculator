import React from 'react';
import {  Card} from 'antd'
import "./index.css";
function Component1() {
  // const navigate = useNavigate();
  // const handleClick_kelly = () => { navigate('/kelly');window.location.reload();};
  // const handleClick_marketnew = () => { navigate('/marketnew');window.location.reload();};
  // const handleClick_compunds = () => { navigate('/compound');window.location.reload();};
  // const handleClick_simple = () => { navigate('/simple');window.location.reload();};

  return (
    <div className="login">
      <Card className="login-container">
        {/* <h1>这里是一个九宫格</h1> */}
        <div className="title-container">
          <div className="Fintech-title">Fintech Calculator</div>
        </div>
        
        <div className="calculator-item-row">
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/kelly'>Kelly Calculator</a></li></div>
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/compound'>Compound Interest</a></li></div>
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/simple'>Simple Interest</a></li></div>
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/loans'>equal principal payment</a></li></div>
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/loansequal'>Equal loan payment</a></li></div>
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/test'>test</a></li></div>          
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/kelly'>xxx</a></li></div>
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/kelly'>xxx</a></li></div>          
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/kelly'>xxx</a></li></div>
        </div>
        
        <div className="title-container">
          <div className="News-title">News</div>
        </div>

        <div className="calculator-item-row">
          
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/marketnews'>Marketnews</a></li></div>
        
        </div>

        
        {/* <Button onClick={handleClick_marketnew}>跳转到 marketnew</Button>
        <Button onClick={handleClick_compunds}>跳转到 compound</Button>
        <Button onClick={handleClick_simple}>跳转到 simple</Button>
        <Button onClick={handleClick_marketnew}>跳转到 Component2</Button>
        <Button onClick={handleClick_compunds}>跳转到 Component2</Button> */}
      </Card>
    </div>
  );
}

export default Component1;
