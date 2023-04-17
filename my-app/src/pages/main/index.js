import React, { useState, useEffect } from 'react';
import { Card } from 'antd'
import "./index.css";
import BarChart from '../barchart';

function Component1() {
  const [messageList, setMessageList] = useState([]);


  const [userdata, setUserData] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('http://127.0.0.1:8000/data_explore');
  //     const jsonData = await response.json();
  //     setUserData(jsonData.data);
  //     console.log(jsonData.data)
  //   }
  //   fetchData();
  // }, []);

  const config = {
    userdata,
    xField: 'name',
    yField: 'value',
    isStack: true,
  };


  function _onMessageWasSent(message) {
    setMessageList([...messageList, message]);
  }

  function _sendMessage(text) {
    if (text.length > 0) {
      setMessageList([
        ...messageList,
        {
          author: 'them',
          type: 'text',
          data: { text },
        },
      ]);
    }
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:8000/market-news?category= general");
      const json = await response.json();
      setData(json);
      console.log(json)
    }
    fetchData();
  }, []);

  useEffect(() => {
    let interval;
    function startAnimation() {
      interval = setInterval(() => {
        const commentList = document.querySelector('.comment-list');
        const items = commentList.querySelectorAll('.list-item');

        // 先隐藏所有元素
        Array.from(items).forEach(item => item.classList.remove('active'));

        // 显示当前元素
        items[0].classList.add('active');

        // 执行滚动效果，将第一个元素移到最后
        setTimeout(() => {
          commentList.insertBefore(items[items.length - 1], items[0])
        }, 300);
      }, 3000); // 每隔3秒钟滚动一次
    }

    if (data.length > 0) {
      startAnimation(); // 启动滚动动画
    }

    return () => {
      clearInterval(interval);
    };
  }, [data]);


  return (
    <div className="main-pages">
     
        <Card className="login-container">
          {/* <h1>这里是一个九宫格</h1> */}
          <div className="title-container">
            <div className="Fintech-title">Fintech Calculator</div>
          </div>

          <div className="calculator-item-row">
            <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/kelly'>Kelly Calculator</a></li></div>
            <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/compound'>Compound Interest Calculator</a></li></div>
            <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/simple'>Simple Interest Calculator</a></li></div>
            <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/loans'>Equal Loan Payment Calculator</a></li></div>
            <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/loansequal'> Equal Principal Payment Calculator</a></li></div>
            <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/gdp'>GDP Growth Rate Calculator</a></li></div>
            <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/purchasing_power'> Devaluation Calculator</a></li></div>
            <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/principal'>Principal Doubling Time Calculator</a></li></div>
            <div className="bottom-container"><li><a className="gradient-button gradient-button-1" href='/percentage'> Percentage Markup Calculator</a></li></div>
          </div>

          <div className="title-container">
            <div className="News-title">User Data</div>
          </div>

          <div>
            <BarChart />
          </div>

          <div className="title-container">
            <div className="News-title">News</div>
          </div>

          <div className="comment-list">
            {/* 使用 .map() 函数遍历数据数组 */}
            {data.map(item => (
              <div className="list-item" key={item.id}>
                <div className="user-face">
                  <img className="user-head" src={item.image} alt="" />
                </div>
                <div className="comment">
                  <a className="user" href={item.url}>{item.headline}</a>
                  <p className="text">{item.summary}</p>
                  <div className="info">
                    <span className="time">{new Date(item.datetime * 1000).toLocaleString()}</span>
                    <div>{item.source}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </Card>
      
    </div>
  );
}
export default Component1;
