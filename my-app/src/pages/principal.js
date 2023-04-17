import React,{useState} from 'react';
import { Form, Input, Button,  Card } from 'antd'
import "./kelly.css";

function Principal(){
    const [r, setr] = useState(0); //rate
    const [time, setTime] = useState(0);

    const handleSubmit =  () => {
      // event.preventDefault();
      fetch(`http://127.0.0.1:8000/doubling_time?r=${r}`,{mode: 'cors'})
      .then(response => response.json())
      .then(data => {
      console.log(data);
      setTime(data['time']);
      })

    .catch(error => {
      console.error(error);
    });
  };

    return (
    <div className="login-pages">
      <Card className="calculator-container">
          <h1 className="title">Configuration</h1>
          <Form validateTrigger={['onBlur', 'onChange']}
            // initialValues={{
            //     "Winning_Per": 70,
            //     "NetOdds_Win": 30,
            //     "Defeat_Rat": 50,
            //     remember: true
            // }}
            onFinish={handleSubmit}
            // onFinishFiled={onFinishFiled}
          >

      <div className='input-container'>
        <div className='para-test'>Rate</div>
        <Form.Item
        onChange={(event) => setr(event.target.value)}
        name="Capital"
        rules={[
            {
            pattern: /^(0|[1-9]\d?|100)$/,   //正则化数字
            validateTrigger: 'onBlur',
            message:'please input the correct num from 1-100'
            },
            { 
              required: true, 
              message: 'please input the num' 
            }
        ]}
        >
          <div>
        <Input size="large" placeholder='Please input the Capital' defaultValue="0"/>
        </div>
        </Form.Item>
      </div>
      
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" >
                Summit
            </Button>
          </Form.Item>


          <h1 className="title">Calculation Result</h1>
          <div className='input-container'>
          <div className='para-test'>Time</div>
            <Form.Item name="interest">
                <div><Input size="large" type='number' value={time} maxLength={30} readOnly/></div>
            </Form.Item>
          </div>
            </Form>
            
            

            <h1 className="title">Principal Doubling Time Calculator is...</h1>
            <div className='input-container'>
            <div className="paragraph-container">
                <p className='paragraph'>
                The Principal Doubling Time Calculator is a financial tool used to estimate the time it takes for an investment or savings account to double in value based on the interest rate earned. By inputting the initial principal amount and the annual interest rate, the calculator can determine the number of years it will take for the investment or savings account to reach twice its original value. The Principal Doubling Time Calculator helps investors and savers understand the growth potential of their investments and make informed decisions about their financial future. This tool is useful for retirement planning, long-term investing, and other financial goals.
                </p> 
              </div>
            </div>

      </Card>
    </div>
    );
}


export default Principal;