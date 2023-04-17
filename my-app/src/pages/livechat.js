import React, { useState } from 'react';
import Launcher from './../components/Launcher'


function Livechat() {
    const [messageList, setMessageList] = useState([]);

    function _onMessageWasSent(message) {
        setMessageList([...messageList, message]);
    }
    
    return (
        <Launcher
            agentProfile={{
                teamName: 'react-chat-window',
                imageUrl:
                    'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
            }}
            onMessageWasSent={_onMessageWasSent}
            messageList={messageList}
            showEmoji
        />
    );
}


export default Livechat;