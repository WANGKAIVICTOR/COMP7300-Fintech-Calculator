
  import './index.css'
  import React  from "react";
  import { Form, Input, Button,  Card } from 'antd'

  function News(){
    
    const data = [
      {
        "category": "technology",
        "datetime": 1596589501,
        "headline": "Square surges after reporting 64% jump in revenue, more customers using Cash App",
        "id": 5085164,
        "image": "https://image.cnbcfm.com/api/v1/image/105569283-1542050972462rts25mct.jpg?v=1542051069",
        "related": "",
        "source": "CNBC",
        "summary": "Shares of Square soared on Tuesday evening after posting better-than-expected quarterly results and strong growth in its consumer payments app.",
        "url": "https://www.cnbc.com/2020/08/04/square-sq-earnings-q2-2020.html"
      },
      {
        "category": "business",
        "datetime": 1596588232,
        "headline": "B&G Foods CEO expects pantry demand to hold up post-pandemic",
        "id": 5085113,
        "image": "https://image.cnbcfm.com/api/v1/image/106629991-1595532157669-gettyimages-1221952946-362857076_1-5.jpeg?v=1595532242",
        "related": "",
        "source": "CNBC",
        "summary": "\"I think post-Covid, people will be working more at home, which means people will be eating more breakfast\" and other meals at home, B&G CEO Ken Romanzi said.",
        "url": "https://www.cnbc.com/2020/08/04/bg-foods-ceo-expects-pantry-demand-to-hold-up-post-pandemic.html"
      },
      {
        "category": "top news",
        "datetime": 1596584406,
        "headline": "Anthony Levandowski gets 18 months in prison for stealing Google self-driving car files",
        "id": 5084850,
        "image": "https://image.cnbcfm.com/api/v1/image/106648265-1596584130509-UBER-LEVANDOWSKI.JPG?v=1596584247",
        "related": "",
        "source": "CNBC",
        "summary": "A U.S. judge on Tuesday sentenced former Google engineer Anthony Levandowski to 18 months in prison for stealing a trade secret from Google related to self-driving cars months before becoming the head of Uber Technologies Inc's rival unit.",
        "url": "https://www.cnbc.com/2020/08/04/anthony-levandowski-gets-18-months-in-prison-for-stealing-google-self-driving-car-files.html"
      }
    ];
    
   
    //种类
    //时间
    //标题
    //图片
    //受控组件回调
      return (
        <div className="login">
          <Card className="calculator-container">
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
  
  
  export default News;
  