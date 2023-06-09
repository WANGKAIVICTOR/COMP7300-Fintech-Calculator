import React, { useState, useEffect } from 'react';
import Launcher from './../components/Launcher'


function Livechat() {
    const [messageList, setMessageList] = useState([]);

    function _onMessageWasSent(message) {
        setMessageList([...messageList, message]);
    }

    // fetch the games according to the genres
    const [data, setData] = useState([])

    // useEffect(() => {
    //     fetch('http://localhost:8000/score', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             mode: 'cors',
    //         },
    //         body: JSON.stringify({ selected })
    //     })
    //         .then(response => response.json())
    //         .then(resp => setData(resp['data']))
    //         .catch(error => console.log(error))
    // }, []);

    console.log(data);


    // return (
    //     <Launcher
    //         agentProfile={{
    //             teamName: 'react-chat-window',
    //             imageUrl:
    //                 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
    //         }}
    //         onMessageWasSent={_onMessageWasSent}
    //         messageList={messageList}
    //         showEmoji
    //     />
    // );
    return (
        <div className="form-section">
            <textarea
                rows="5"
                className="form-control"
                placeholder="Ask me anything..."
            ></textarea>
            <button className="btn">
                Generate Response
            </button>
        </div>
    )
}


export default Livechat;