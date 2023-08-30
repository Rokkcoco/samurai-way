import {AppThunkType, InferActionsType} from "./redux-store";
import {chatAPI, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "redux";


const initialState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "chat/MESSAGES-RECEIVED":
            return {...state, messages: [...state.messages, ...action.payload.messages]}
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({type: "chat/MESSAGES-RECEIVED", payload: {messages}} as const)
}
let _newMessageHandlerCreator: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandlerCreator === null) {
        return _newMessageHandlerCreator = (messages: ChatMessageType[]) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandlerCreator
}
export const startMessagesListening = (): ThunkType => (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message:string): ThunkType => (dispatch) => {
    chatAPI.send(message)
}

export default chatReducer
type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = AppThunkType<ActionsType, void>