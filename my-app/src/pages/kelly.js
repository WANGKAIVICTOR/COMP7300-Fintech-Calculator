import React,{useState} from 'react';
import { Form, Input, Button,  Card } from 'antd'
import "./kelly.css";

function Kellys(){
    const [odds, setOdds] = useState(0);
    const [p, setP] = useState(0);
    const [q, setQ] = useState(0);
    const [betSize, setBetSize] = useState(0);

    // function onFinishFiled (errorInfo) {console.log(errorInfo)};
    // function onFinish (values)  
    // {
    //     console.log(values.Winning_Per) 
    // }
    const handleSubmit =  () => {
      // event.preventDefault();
      fetch(`http://127.0.0.1:8000/kelly?b=${odds}&p=${p}&q=${q}`,{mode: 'cors'})
      .then(response => response.json())
      .then(data => {
      console.log(data);
      setBetSize(data.betSize);
      console.log(data.betSize);
      })
      
    .catch(error => {
      console.error(error);
    });
  };

    return (
    <div className="login">
      <Card className="calculator-container">
          <h1 className="title">Configuration</h1>
          <Form validateTrigger={['onBlur', 'onChange']} onFinish={handleSubmit}>


      <div className='input-container'>
        <div className='para-test'>获胜率</div>
        <Form.Item
        onChange={(event) => setOdds(event.target.value)}

        name="Winning_Per"
        rules={[
            {
            pattern: /^(0|[1-9]\d?|100)$/,
            validateTrigger: 'onBlur',
            message:'please input the correct num between [0,100]'
            },
            { 
              required: true, 
              message: 'please input the num' 
            }
        ]}
        >
          <div>
        <Input size="large" placeholder='请输入获胜率' defaultValue="0"/>
        </div>
        </Form.Item>
        <div className='percentage'> % </div>
      </div>
      
      <div className='input-container'>
      <div className='para-test'>净赔率(胜)</div>
      <Form.Item
      onChange={(event) => setP(event.target.value)}
      name="NetOdds_Win"
      rules={[
          {
              pattern: /^(0|[1-9]\d?|100)$/,
              validateTrigger: 'onBlur',
              message:'please input the num between [0,100]'
          },
          { 
            required: true, 
            message: 'please input the num' 
        }
      ]}>
      <div>
        <Input size="large" placeholder="请输入落败率" maxLength={30} defaultValue="0"/>
      </div>
      </Form.Item>
      <div className='percentage'> % </div>
      </div>
      

      <div className='input-container'>
      <div className='para-test'>落败率</div>
      <Form.Item
      
      onChange={(event) => setQ(event.target.value)}
      name="Defeat_Rat"
      rules={[
          {
              pattern: /^(0|[1-9]\d?|100)$/,
              validateTrigger: 'onBlur',
              message:'please input the num between [0,100]'
          },
          { 
              required: true, 
              message: 'please input the num' 
          }
      ]}>

      <div>
      <Input size="large" placeholder="请输入落败率" defaultValue="0" maxLength={30} />
      </div>

      </Form.Item>
      <div className='percentage'> % </div>
      </div>
    

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" >
                Summit
            </Button>
          </Form.Item>

          <h1 className="title">Result</h1>
          <div className='input-container'>
          <div className='para-test'>Best Betting Ratio</div>
            <Form.Item 
            name="NetOdds_Los"
            >
             <div>
            <Input size="large" type='number' value={betSize} maxLength={30} readOnly/>
            </div>
            </Form.Item>
            <div className='percentage'> % </div>
          </div>
       

          </Form>
      </Card>
    </div>
    );
}


export default Kellys;