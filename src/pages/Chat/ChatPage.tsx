import React, {FC, UIEvent, useEffect, useRef, useState} from 'react';
import {ChatMessageAPIType} from "../../api/chat-api";
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
    const status = useAppSelector(state => state.chat.status)


    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, []);


    return (
        <div>
            {status === "error" && <div>Some error occured. Please refresh the page</div>}
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}


const Messages = () => {
    const messages = useAppSelector(state => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    const scrollHandler = (event: UIEvent<HTMLDivElement>) => {
        const element = event.currentTarget
        if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    };

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages]);

    return <div style={{height: "500px", overflowY: "auto"}} onScroll={scrollHandler}>
        {messages?.map((m, i) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    return <div>
        <img src={message.photo} style={{width: "30px"}}/><b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})

const AddMessageForm = () => {
    const [message, setMessage] = useState('')
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.chat.status)

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
            <button disabled={status !== "ready"} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}
export default ChatPage