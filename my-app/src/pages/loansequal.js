import React,{useState} from 'react';
import { Form, Input, Button,  Card } from 'antd'
import "./kelly.css";

function Loans_qual(){
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
      fetch(`http://158.182.6.106:8000/same_monthly?k=${k}&y=${y}&t=${t}&i=${i}`,{mode: 'cors'})
      .then(response => response.json())
      .then(data => {
      console.log(data);
      setIntetest(data.Interest);
      setTotal(data.Total);
      setEachtime(data["each time"]);
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
            pattern: /^(0|[1-9]\d?|100)$/,   //正则化数字
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
              pattern: /^(0|[1-9]\d?|100)$/, 
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
              pattern: /^(0|[1-9]\d?|12)$/,
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
              pattern: /^(0|[1-9]\d?|100)$/,
              validateTrigger: 'onBlur',
              message:'please input the rates'
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
            

            <h1 className="title">Simple interest is...</h1>
            <div className='input-container'>
            <div className="paragraph-container">
                <p className='paragraph'>
                    "Simple interest refers to the cost of borrowing or the income of lending.
                     It is a method of calculating interest.
                      The calculation of simple interest depends on the amount of the loan or contribution.
                      The length of the borrowing period of the balance and the level of interest rates in the market.
                      The simple interest calculation method, as long as the principal earns interest during the loan period, no matter how long the time is, the interest generated will not be added to the principal and the interest will be double-calculated. 
                      The "principal" mentioned here refers to the original full amount of the goods to others to collect interest, and the "interest" refers to the situation that the borrower pays the lender the amount exceeding the principal and the period is not an integer number of years. 
                      For example, the deposit period of a depositor is 3 years, 7 months and 12 days.
                      At this time, the calculation method of the income is still in accordance with the above formula, but the number of months and days must be converted into years.
                      In the date conversion in the field of economic mathematics, the following conventions are followed: there are 360 days in a year and 30 days in a month.
                </p> 
              </div>
            </div>
      </Card>
    </div>
    );
}


export default Loans_qual;