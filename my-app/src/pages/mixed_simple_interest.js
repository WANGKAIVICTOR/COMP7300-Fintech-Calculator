import React,{useState} from 'react';
import { Form, Input, Button,  Card } from 'antd'
import "./kelly.css";

function Kellys(){
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
      fetch(`http://127.0.0.1:8000/compound?k=${k}&y=${y}&m=${m}&d=${d}&i=${i}`,{mode: 'cors'})
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
          <h1 className="title">参数设置</h1>
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
                计算结果
            </Button>
          </Form.Item>
          <h1 className="title">计算结果</h1>
          <div className='input-container'>
          <div className='para-test'>interest</div>
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
                <div>
                    复利就是复合利息，它是指每年的收益还可以产生收益，具体是将整个借贷期限分割为若干段，\n
                    前一段按本金计算出的利息要加入到本金中，形成增大了的本金，作为下一段计算利息的本金基数，
                    直到每一段的利息都计算出来，加总之后，就得出整个借贷期内的利息，简单来说就是俗称的利滚利。
                    Para:
                        k: 本金
                        y: 年份
                        m: 月份
                        d: 天数
                        i: 年利率
                    Return:
                        interest: 利息
                        total: 总计返还
                </div> 
            </div>
      </Card>
    </div>
    );
}


export default Kellys;