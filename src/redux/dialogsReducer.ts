import {InferActionsType} from "./redux-store";

export type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}
const initialState = {
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Andrew"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Viktor"},
        {id: 6, name: "Valera"}
    ] as DialogType[],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "Yo"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"}
    ] as MessageType[]
}



const dialogsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "dialogsPage/SEND-MESSAGE":
            return {...state, messages: [...state.messages, {id: Date.now(), message: action.newMessageBody}]}
        default:
            return state
    }
}
export const actions = {
    sendMessage: (newMessageBody: string) => ({type: "dialogsPage/SEND-MESSAGE", newMessageBody} as const)
}

export default dialogsReducer
export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>