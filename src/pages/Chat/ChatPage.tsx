import React, {FC, useEffect, useState} from 'react';


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};


const Chat = () => {
    const [wsChannel, setWsChannel] = useState<null | WebSocket>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            setTimeout(createChannel, 3000)
        };

        function createChannel() {
            ws.removeEventListener("close", closeHandler)
            ws.close()
            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws.addEventListener("close", closeHandler)
            setWsChannel(ws)
        }

        createChannel()

        return () => {
            ws.removeEventListener("close", closeHandler)
            ws.close()
        }
    }, []);

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}

const Messages: FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            setMessages(prevMessages => [...prevMessages, ...newMessages])
        };
        wsChannel?.addEventListener("message", messageHandler)

        return () => {
            wsChannel?.removeEventListener("message", messageHandler)
        }

    }, []);

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
const AddMessageForm: FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending")
    useEffect(() => {
        const openHandler = () => {
            setReadyStatus("ready")
        };
        wsChannel?.addEventListener("open", openHandler)

        return () => {
            wsChannel?.removeEventListener("open", openHandler)
        }

    }, []);
    const sendMessage = () => {
        if (!message) return
        wsChannel?.send(message)
        setMessage('')
    };
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={wsChannel === null || readyStatus !== "ready"} onClick={sendMessage}>Send</button>
        </div>
    </div>
}
export default ChatPage