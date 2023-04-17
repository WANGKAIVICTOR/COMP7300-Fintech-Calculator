import React,{useState} from 'react';
import { Form, Input, Button,  Card } from 'antd'
import "./kelly.css";

function Loans(){
    const [k, setk] = useState(0); //capacity
    const [y, sety] = useState(0);  //years
    const [t, sett] = useState(0);  //Number of installments 
    const [i, seti] = useState(0);  //rates of year
    const [intetest, setIntetest] = useState(0);
    const [total, setTotal] = useState(0);
    const [each_time, setEachtime] = useState(" ");
    

    // function onFinishFiled (errorInfo) {console.log(errorInfo)};
    // function onFinish (values)  
    // {
    //     console.log(values.Winning_Per) 
    // }
    const handleSubmit =  () => {
      // event.preventDefault();
      fetch(`http://158.182.6.106:8000/decline_monthly?k=${k}&y=${y}&t=${t}&i=${i}`,{mode: 'cors'})
      .then(response => response.json())
      .then(data => {
      console.log(data);
      setIntetest(data.Interest);
      setTotal(data.Total);
      const concatenatedString = data["each time"].join(", ");
      setEachtime(concatenatedString);
      console.log(concatenatedString);
      })
      
    .catch(error => {
      console.error(error);
    });
  };


    return (
    <div className="login">
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
        <div className='para-test'>Capital</div>
        <Form.Item
        onChange={(event) => setk(event.target.value)}
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
      <div className='para-test'>Year</div>
      <Form.Item
      onChange={(event) => sety(event.target.value)}
      name="Year"
      rules={[
          { 
            // 年份正则化
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
      

      <div className='input-container'>
      <div className='para-test'>Number of installments</div>
      <Form.Item
      
      onChange={(event) => sett(event.target.value)}
      name="Number of installments"
      rules={[
          {     //月份正则化
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
        

      <div className='input-container'>
      <div className='para-test'>Rates</div>
      <Form.Item
      onChange={(event) => seti(event.target.value)}
      name="rates"
      rules={[
          {     
              pattern: /^(0(\.\d+)?|1(\.0+)?)$/,
              validateTrigger: 'onBlur',
              message:'please input the rates should be 0.0 - 1.0'
          },
          { 
              required: true, 
              message: 'please input the rates' 
          }
      ]}>

      <div>
      <Input size="large" placeholder="please input the rates" defaultValue="0" maxLength={30} />
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
          <div className='para-test'>Interest</div>
            <Form.Item name="interest">
                <div><Input size="large" type='number' value={intetest} maxLength={30} readOnly/></div>
            </Form.Item>
          </div>

          <div className='input-container'>
          <div className='para-test'>Total</div>
            <Form.Item name="total">
            <div><Input size="large" type='number' value={total} maxLength={30} readOnly/></div>
            
            </Form.Item>
          </div>
            

            <div className='input-container'>
            <div className='para-test'>Amount of each repayment</div>
            <Form.Item name="Amount of each repayment">                
             <div> <Input size="large" value={each_time} maxLength={30} readOnly/></div>
            </Form.Item>
          </div>
            </Form>
            

            <h1 className="title">The Equal Loan Payment is...</h1>
            <div className='input-container'>
            <div className="paragraph-container">
                <p className='paragraph'>
                The Equal Loan Payment Calculator is a financial tool used to calculate the monthly payment amount for a loan with equal payments over its term. With this type of loan repayment plan, the borrower pays a fixed amount each month that includes both principal and interest. This means that the borrower will pay less in interest if they make extra payments or pay off the loan early. The Equal Loan Payment Calculator uses inputs such as loan amount, interest rate, and loan term to calculate the monthly payment amount, which helps borrowers understand their repayment schedule and budget accordingly. This calculator can be useful for those considering taking out a loan, as it provides an estimate of the monthly payment amount based on the loan terms.
                </p> 
              </div>
            </div>
      </Card>
    </div>
    );
}


export default Loans;