import React from 'react';
import { Form, Input, Button, Checkbox, message, Card } from 'antd'
import "./kelly.css";

function Kellys(){

    function onFinishFiled (errorInfo) {console.log(errorInfo)}
    function onFinish (values)  
    {
        console.log(values) 
    }

    return (
    <div className="login">
      <Card className="calculator-container">
          <h1 className="title">参数设置</h1>
          
          <Form validateTrigger={['onBlur', 'onChange']}
            initialValues={{
                "Winning_Per": '111',
                "NetOdds_Win": '222',
                "Defeat_Rat": '50',
                "NetOdds_Los": "50",
                remember: true
            }}
            onFinish={onFinish}
            onFinishFiled={onFinishFiled}
          >


      <div className='input-container'>
        <div className='para-test'>获胜率</div>
        <Form.Item
        name="Winning_Per"
        rules={[
            {
            pattern: /^(0|[1-9]\d?|100)$/,
            validateTrigger: 'onBlur',
            message:'please input the correct 获胜率 [0,100]'
            },
            { 
            required: true,
            message: 'please input the 获胜率' 
            }
        ]}
        >
        <Input size="large" placeholder='请输入获胜率' />
        </Form.Item>
        <div className='percentage'> % </div>
      </div>
      
      <div className='input-container'>
      <div className='para-test'>净赔率(胜)</div>
      <Form.Item
      name="NetOdds_Win"
      rules={[
          {
              pattern: /^(0|[1-9]\d?|100)$/,
              validateTrigger: 'onBlur',
              message:'please input the correct 获胜率 [0,100]'
          },
          { 
              required: true, 
              message: 'please type your password' 
          }
      ]}>
      <Input size="large" placeholder="请输入落败率" maxLength={30} />
      </Form.Item>
      <div className='percentage'> % </div>
      </div>
      

      <div className='input-container'>
      <div className='para-test'>落败率</div>
      <Form.Item
      name="Defeat_Rat"
      rules={[
          {
              pattern: /^(0|[1-9]\d?|100)$/,
              validateTrigger: 'onBlur',
              message:'please input the correct 获胜率 [0,100]'
          },
          { 
              required: true, 
              message: 'please type your password' 
          }
      ]}>
      <Input size="large" placeholder="请输入落败率" maxLength={30} />
      </Form.Item>
      <div className='percentage'> % </div>
      </div>
      
      <div className='input-container'>
      <div className='para-test'>净赔率(败)</div>
        <Form.Item 
        name="NetOdds_Los"
        rules={[
            {
                pattern: /^(0|[1-9]\d?|100)$/,
                validateTrigger: 'onBlur',
                message:'please input the correct 获胜率 [0,100]'
            },
            { 
                required: true, 
                message: 'please type your password' 
            }
        ]}>
        <Input size="large" placeholder="请输入落败率" maxLength={30} />
        </Form.Item>
        <div className='percentage'> % </div>
      </div>


    




          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
                计算结果
            </Button>
          </Form.Item>


          <h1 className="title">计算结果</h1>
          <div className='input-container'>
          <div className='para-test'>最佳投注比例</div>
            <Form.Item 
            name="NetOdds_Los"
            rules={[
                {
                    pattern: /^(0|[1-9]\d?|100)$/,
                    validateTrigger: 'onBlur',
                    message:'please input the correct 获胜率 [0,100]'
                },
                { 
                    required: true, 
                    message: 'please type your password' 
                }
            ]}>
            <Input size="large" placeholder="请输入落败率" maxLength={30} />
            </Form.Item>
            <div className='percentage'> % </div>
          </div>
          
          <div className='input-container'>
          <div className='para-test'>预期收益</div>
            <Form.Item 
            name="NetOdds_Los"
            rules={[
                {
                    pattern: /^(0|[1-9]\d?|100)$/,
                    validateTrigger: 'onBlur',
                    message:'please input the correct 获胜率 [0,100]'
                },
                { 
                    required: true, 
                    message: 'please type your password' 
                }
            ]}>
            <Input size="large" placeholder="请输入落败率" maxLength={30} />
            </Form.Item>
            <div className='percentage'> % </div>
          </div>

          </Form>
      </Card>
    </div>
    );
}


export default Kellys;