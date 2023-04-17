import React,{useState} from 'react';
import { Form, Input, Button,  Card } from 'antd'
import "./kelly.css";

function Simple_interest(){
    const [k, setk] = useState(0);
    const [y, sety] = useState(0);
    const [m, setm] = useState(0);
    const [d, setd] = useState(0);
    const [i, seti] = useState(0);
    const [intetest, setIntetest] = useState(0);
    const [total, setTotal] = useState(0);

    // function onFinishFiled (errorInfo) {console.log(errorInfo)};
    // function onFinish (values)  
    // {
    //     console.log(values.Winning_Per) 
    // }
    const handleSubmit =  () => {
      // event.preventDefault();
      fetch(`http://127.0.0.1:8000/simple?k=${k}&y=${y}&m=${m}&d=${d}&i=${i}`,{mode: 'cors'})
      .then(response => response.json())
      .then(data => {
      console.log(data);
      setIntetest(data.Interest);
      setTotal(data.Total);
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
      <div className='para-test'>Months</div>
      <Form.Item
      
      onChange={(event) => setm(event.target.value)}
      name="Months"
      rules={[
          {     //月份正则化
              pattern: /^(0|[1-9]\d?|12)$/,
              validateTrigger: 'onBlur',
              message:'please input the Month'
          },
          { 
              required: true, 
              message: 'please input the num' 
          }
      ]}>

      <div>
      <Input size="large" placeholder="please input the Month" defaultValue="0" maxLength={30} />
      </div>

      </Form.Item>
      </div>
      
      <div className='input-container'>
      <div className='para-test'>Day</div>
      <Form.Item
      
      onChange={(event) => setd(event.target.value)}
      name="Day"
      rules={[
          {     //天数正则化
              pattern: /^(0|[1-9]\d?|31)$/,
              validateTrigger: 'onBlur',
              message:'please input the Month'
          },
          { 
              required: true, 
              message: 'please input the Month' 
          }
      ]}>

      <div>
      <Input size="large" placeholder="please input the Month" defaultValue="0" maxLength={30} />
      </div>
      </Form.Item>
    
      </div>
    

      <div className='input-container'>
      <div className='para-test'>rates</div>
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
          <h1 className="title">Calculation Results</h1>
          <div className='input-container'>
          <div className='para-test'>Interest</div>
            <Form.Item name="interest">
             <div>
                <Input size="large" type='number' value={intetest} maxLength={30} readOnly/>
            </div>
            </Form.Item>
          </div>

          <div className='input-container'>
          <div className='para-test'>Total</div>
            <Form.Item name="total">
             <div>
                <Input size="large" type='number' value={total} maxLength={30} readOnly/>
            </div>
            </Form.Item>
          </div>
            </Form>
            

            <h1 className="title">Discribtion</h1>
            <div className='input-container'>
            <div className="paragraph-container">
                <p className='paragraph'>
                    "Compound interest, which means that the annual income can also generate income. 
                    Specifically, the entire loan period is divided into several sections, and the interest calculated on the basis of the previous section is added to the principal to form an increased principal. 
                    The increased principal is used as the principal base for calculating interest in the next period, 
                    until the interest of each period is calculated, 
                    and after summing up, the interest for the entire loan period is obtained, 
                    which is commonly known as rolling interest.
                </p> 
              </div>
            </div>
      </Card>
    </div>
    );
}


export default Simple_interest;