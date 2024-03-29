import {AppThunkType, InferActionsType} from "./redux-store";
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from "uuid";

type ChatMessageType = ChatMessageAPIType & {
    id: string
}
const initialState = {
    messages: [] as ChatMessageType[],
    status: "pending" as StatusType
}

const chatReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "chat/MESSAGES-RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({
                    ...m,
                    id: v1()
                }))].filter((m, index, array) => index >= array.length - 100)
            }
        case "chat/STATUS-CHANGED":
            return {...state, status: action.payload.status}
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({type: "chat/MESSAGES-RECEIVED", payload: {messages}} as const),
    statusChanged: (status: StatusType) => ({type: "chat/STATUS-CHANGED", payload: {status}} as const),
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}


let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}


export const startMessagesListening = (): ThunkType => (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => (dispatch) => {
    chatAPI.unsubscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): ThunkType => (dispatch) => {
    chatAPI.send(message)
}

export default chatReducer
type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = AppThunkType<ActionsType, void>