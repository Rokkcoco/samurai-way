import React, {FC, useEffect, useState} from 'react';

const wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName:string
}

const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};


const Chat = () => {




    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        wsChannel.addEventListener("message", (e:MessageEvent)=> {
            const newMessages = JSON.parse(e.data);
            setMessages(prevMessages => [...prevMessages, ...newMessages])
        })
    }, []);

    return <div style={{height: "500px", overflowY: "auto"}}>
        {messages?.map((m,i) => <Message key={i} message={m}/>)}
    </div>
}

const Message:FC<{message:ChatMessageType}> = ({message}) => {


    return <div>
        <img src={message.photo} style={{width: "30px"}}/><b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}
const AddMessageForm = () => {
    const [message, setMessage] = useState('')
    const sendMessage = () => {
        if (!message) return
        wsChannel.send(message)
        setMessage('')
    };
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
}
export default ChatPage