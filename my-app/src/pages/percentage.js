import React,{useState} from 'react';
import { Form, Input, Button,  Card } from 'antd'
import "./kelly.css";

function Principal(){
    const [p, setp] = useState(0); //price
    const [c, setc] = useState(0); //cost

    const [rate, setrate] = useState(0);

    const handleSubmit =  () => {
      // event.preventDefault();
      fetch(`http://127.0.0.1:8000/markup_percentage?price=${p}&cost=${c}`,{mode: 'cors'})
      .then(response => response.json())
      .then(data => {
      console.log(data);
      setrate(data['markup_percentage']);
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
        <div className='para-test'>Price</div>
        <Form.Item
        onChange={(event) => setp(event.target.value)}
        name="Capital"
        rules={[
            {
            pattern: /^\d+$/,   //正则化数字
            validateTrigger: 'onBlur',
            message:'please input the correct num'
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
      

      <div className='input-container'>
        <div className='para-test'>Cost</div>
        <Form.Item
        onChange={(event) => setc(event.target.value)}
        name="Capital"
        rules={[
            {
            pattern: /^\d+$/,   //正则化数字
            validateTrigger: 'onBlur',
            message:'please input the correct num'
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
          <div className='para-test'>markup percentage</div>
            <Form.Item name="interest">
                <div><Input size="large" type='number' value={rate} maxLength={30} readOnly/></div>
            </Form.Item>
          </div>
            </Form>
            
            <h1 className="title">The Percentage Markup Calculator is...</h1>
            <div className='input-container'>
            <div className="paragraph-container">
                <p className='paragraph'>
                The Percentage Markup Calculator is a financial tool used to determine the selling price of aproduct or service based on the desired profit margin. By inputting the cost of production and thedesired percentage markup, the calculator can calculate the selling price needed to achieve thedesired profit margin. The Percentage Markup Calculator helps businesses and individualsunderstand the cost of production and the potential profit marains for their products or servicesand make informed pricing decisions. This tool is useful for pricing strategies, budgeting, andfinancial planning, and can be applied to various industries such as retail, manufacturing, andservice sectors.
                </p> 
              </div>
            </div>

      </Card>
    </div>
    );
}


export default Principal;