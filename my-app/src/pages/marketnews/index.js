import './index.css'
import React ,{useState, useEffect} from "react";

function News(){
  
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://158.182.6.106:8000/market-news?category= general");
      const json = await response.json();
      setData(json);
      console.log(json)
    }
    fetchData();
  }, []);
  
 
  //种类
  //时间
  //标题
  //图片
  //受控组件回调
    return (
        
      <div className="comment-list">
      {/* 使用 .map() 函数遍历数据数组 */}
      {data.map(item => (
        <div className="list-item" key={item.id}>
          <div className="user-face">
            {/* 在这里放照片 */}
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
  
      );
  
}


export default News;
