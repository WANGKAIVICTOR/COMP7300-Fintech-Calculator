import React,{useState} from 'react';
import { Form, Input, Button,  Card } from 'antd'
import "./kelly.css";

function Loans_qual(){
    const [i, seti] = useState(0); //initial_amount
    const [a, seta] = useState(0);  //annual_inflation_rate
    const [t, sett] = useState(0);  //time 
    const [value, setValue] = useState(0);
    

    // function onFinishFiled (errorInfo) {console.log(errorInfo)};
    // function onFinish (values)  
    // {
    //     console.log(values.Winning_Per) 
    // }
    const handleSubmit =  () => {
      // event.preventDefault();
      fetch(`http://127.0.0.1:8000/purchasing_power?initial_amount=${i}&annual_inflation_rate=${a}&time=${t}`,{mode: 'cors'})
      .then(response => response.json())
      .then(data => {
      console.log(data);
      setValue(data['value']);
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
        <div className='para-test'>Initial amount</div>
        <Form.Item
        onChange={(event) => seti(event.target.value)}
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
      <div className='para-test'>Annual inflation rate</div>
      <Form.Item
      onChange={(event) => seta(event.target.value)}
      name="Year"
      rules={[
          { 
            // 年份正则化
              pattern: /^(0|[1-9]\d?|100)$/, 
              validateTrigger: 'onBlur',
              message:'please input the Annual inflation rate from 1-100'
          },
          { 
            required: true, 
            message: 'please input the num' 
        }
      ]}>
      <div>
        <Input size="large" placeholder="Please input the Months" maxLength={30} defaultValue="0"/>
      </div>
      </Form.Item>
      </div>
      

      <div className='input-container'>
      <div className='para-test'>Time</div>
      <Form.Item
      
      onChange={(event) => sett(event.target.value)}
      name="Number of installments"
      rules={[
          {     
              pattern: /^\d+$/,
              validateTrigger: 'onBlur',
              message:'please input the Number of installments'
          },
          { 
              required: true, 
              message: 'please input the num' 
          }
      ]}>

      <div>
      <Input size="large" placeholder="please input the Number of installments" defaultValue="0" maxLength={30} />
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
          <div className='para-test'>Value</div>
            <Form.Item name="interest">
                <div><Input size="large" type='number' value={value} maxLength={30} readOnly/></div>
            </Form.Item>
          </div>

            

          </Form>
      </Card>
    </div>
    );
}


export default Loans_qual;