const SEND_MESSAGE = "SEND-MESSAGE"
type DialogType = {
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

export type DialogsPageType = typeof initialState

const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsType): DialogsPageType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {...state, messages: [...state.messages, {id: Date.now(), message: action.newMessageBody}]}
        default:
            return state
    }
}

export const sendMessage = (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody})
type sendMessageActionType = ReturnType<typeof sendMessage>
type ActionsType = sendMessageActionType
export default dialogsReducer