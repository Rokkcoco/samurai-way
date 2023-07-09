import {FieldValue, FieldValues} from "react-hook-form";


const SEND_MESSAGE = "SEND-MESSAGE"
type DialogsType = {
    id: number
    name: string
}
type MessagesType = {
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
        ] as DialogsType[],
        messages: [
            {id: 1, message: "Hi"},
            {id: 2, message: "How are you?"},
            {id: 3, message: "Yo"},
            {id: 4, message: "Yo"},
            {id: 5, message: "Yo"}
        ] as MessagesType[]
    }

    export type DialogsPageType = typeof initialState

const dialogsReducer = (state: DialogsPageType = initialState, action: any): DialogsPageType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {...state, messages: [...state.messages, {id: Date.now(), message: action.newMessageBody}]}
        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody:string) => ({type: SEND_MESSAGE, newMessageBody})
export default dialogsReducer