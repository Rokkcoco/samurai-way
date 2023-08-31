

const subscribers = {
    "messages-received": [] as MessagesReceivedSubscribesType[],
    "status-changed": [] as StatusChangedSubscribesType[]
}

let ws: WebSocket | null = null

const closeHandler = () => {
    notifySubscribersAboutStatus("pending")
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s => s(newMessages))
}

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("message", messageHandler)
    ws?.removeEventListener("open", openHandler)
    ws?.removeEventListener("error", errorHandler)
}
const notifySubscribersAboutStatus = (status:StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}

const openHandler = () => {
    notifySubscribersAboutStatus("ready")
};

const errorHandler = () => {
    notifySubscribersAboutStatus("error")
    console.error("RESTART PAGE")
};

export function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    notifySubscribersAboutStatus("pending")
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
    ws.addEventListener("open", openHandler)
    ws.addEventListener("error", errorHandler)
}



export const chatAPI = {
    subscribe(eventName: EventsNamesType,callback: MessagesReceivedSubscribesType | StatusChangedSubscribesType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscribesType | StatusChangedSubscribesType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    send(message:string) {
        ws?.send(message)
    },
    start() {
        createChannel()
    },
    stop(){
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        ws?.close()
    }
}

export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type MessagesReceivedSubscribesType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscribesType = (status: StatusType) => void
type EventsNamesType = "messages-received" | "status-changed"
export type StatusType = "pending" | "ready" | "error"