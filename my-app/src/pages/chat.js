import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

function Chat() {
    const [history, setHistory] = useState([])

    useEffect(() => {
        addResponseMessage('Welcome to this **awesome** chat!');
    }, []);

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        fetch('https://e9df-35-204-112-1.ngrok.io/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                mode: 'cors',
                heads: { 'content-type': 'application/x-www-form-urlencoded' }
            },
            body: JSON.stringify({ "prompt": newMessage, "history": history })
        })
            .then(response => response.json())
            .then(function (resp) {
                // setHistory(resp['history'])
                addResponseMessage(resp['response']['result'])
            })
            .catch(error => console.log(error))
    };

    return (
        <div className="App">
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                title="Fintech Chatbot"
                subtitle="Welcome to CHATGLM"
            />
        </div>
    );
}

export default Chat;