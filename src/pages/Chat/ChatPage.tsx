import React, {FC, useEffect, useState} from 'react';
import {ChatMessageType} from "../../api/chat-api";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";


const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};


const Chat = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, []);


    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages = () => {
    const messages = useAppSelector(state => state.chat.messages)


    return <div style={{height: "500px", overflowY: "auto"}}>
        {messages?.map((m, i) => <Message key={i} message={m}/>)}
    </div>
}

const Message: FC<{ message: ChatMessageType }> = ({message}) => {


    return <div>
        <img src={message.photo} style={{width: "30px"}}/><b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}
const AddMessageForm = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending")
    const dispatch = useAppDispatch()

    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    };
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={false} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}
export default ChatPage