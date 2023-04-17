import React,{Component} from 'react';
import {  Card} from 'antd'
import "./index.css";
import Launcher from './../../components/Launcher'
import  './../../styles';

class Component1 extends Component {
  // const navigate = useNavigate();
  // const handleClick_kelly = () => { navigate('/kelly');window.location.reload();};
  // const handleClick_marketnew = () => { navigate('/marketnew');window.location.reload();};
  // const handleClick_compunds = () => { navigate('/compound');window.location.reload();};
  // const handleClick_simple = () => { navigate('/simple');window.location.reload();};

  constructor() {
    super();
    this.state = {
      messageList: []
    };
  }
 
  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
  }
 
  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }


  render(){
  return (
    <div className="login">
      
    <div>
      <Launcher
        agentProfile={{
          teamName: 'react-chat-window',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
    </div>
    
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
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/purchasing_power'>purchasing power</a></li></div>
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/kelly'>xxx</a></li></div>          
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/kelly'>xxx</a></li></div>
        </div>
        
        <div className="title-container">
          <div className="News-title">News</div>
        </div>

        <div className="calculator-item-row">
          <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/marketnews'>Market News</a></li></div>
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
}

export default Component1;
