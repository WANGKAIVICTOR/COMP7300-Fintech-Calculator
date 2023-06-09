import React,{useState} from 'react';
import { Form, Input, Button,  Card } from 'antd'
import "./kelly.css";

function Loans(){
    const [c, setc] = useState(0); //current_year_gdp
    const [l, setl] = useState(0);  //years
    
    const [gdp_growth_rate, setRate] = useState(0);

    const handleSubmit =  () => {
      // event.preventDefault();
      fetch(`http://127.0.0.1:8000/gdp_growth_rate?current_year_gdp=${c}&last_year_gdp=${l}`,{mode: 'cors'})
      .then(response => response.json())
      .then(data => {
      console.log(data);
      setRate(data["gdp_growth_rate"]);
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
        <div className='para-test'>current year gdp</div>
        <Form.Item
        onChange={(event) => setc(event.target.value)}
        name="Capital"
        rules={[
            {
              pattern: /^\d+$/,  
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
      <div className='para-test'>last year gdp</div>
      <Form.Item
      onChange={(event) => setl(event.target.value)}
      name="Year"
      rules={[
          { 
            
              pattern: /^\d+$/, 
              validateTrigger: 'onBlur',
              message:'please input the year'
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
      

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" >
                Summit
            </Button>
          </Form.Item>

          <h1 className="title">Calculation Result</h1>
          <div className='input-container'>
          <div className='para-test'>GDP Growth Rate</div>
            <Form.Item name="interest">
                <div><Input size="large" type='number' value={gdp_growth_rate} maxLength={30} readOnly/></div>
            </Form.Item>
          </div>
            </Form>

            <h1 className="title">GDP Growth Formula is...</h1>
            <div className='input-container'>
            <div className="paragraph-container">
                <p className='paragraph'>
                    " The GDP Growth Rate Calculator is a tool used to calculate and track the growth rate of a country's Gross Domestic Product (GDP) over time. GDP is a common measure of a country's economic performance, representing the total value of all goods and services produced within its borders in a given period. The GDP Growth Rate Calculator helps analysts, policymakers, and investors understand how a country's economy is performing, by comparing changes in GDP over different periods. By inputting GDP data from different years, the calculator can display the annual growth rate as a percentage, helping users analyze economic trends and make informed decisions."
                </p> 
              </div>
            </div>

      </Card>
    </div>
    );
}


export default Loans;