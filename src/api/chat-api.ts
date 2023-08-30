let subscribers: SubscribesType[] = []

let ws: WebSocket | null = null

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

export function createChannel() {
    ws?.removeEventListener("close", closeHandler)
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
}

export const chatAPI = {
    subscribe(callback: SubscribesType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscribesType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    send(message:string) {
        ws?.send(message)
    },
    start() {
        createChannel()
    },
    stop(){
        subscribers = []
        ws?.removeEventListener("close", closeHandler)
        ws?.removeEventListener("message", messageHandler)
        ws?.close()
    }
}

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type SubscribesType = (messages: ChatMessageType[]) => void;