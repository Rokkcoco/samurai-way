import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";

export type PostsDataType = {
    id: number
    message: string
    likesCount: number
}
export type DialogsDataType = {
    id: number
    name: string
}
export type MessagesDataType = {
    id: number
    message: string
}
export type ProfilePageType = {
    posts: PostsDataType[]
    newPostText: string
}
export type MessagesPageType = {
    messages: MessagesDataType[]
    dialogs: DialogsDataType[]
    newMessageBody: string
}
export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: MessagesPageType
    sidebar: any
}
export type StoreType = {
    _state: StateType,
    _callSubscriber: (state: StateType) => void,
    getState: () => StateType,
    subscribe: (observer: (state: StateType) => void) => void,
    dispatch: (action: any) => void
}

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"
export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how are you", likesCount: 12},
                {id: 2, message: "How are you?", likesCount: 23},
                {id: 3, message: "How old are you", likesCount: 2},
                {id: 4, message: "It's my first post", likesCount: 25},
                {id: 5, message: "Yo", likesCount: 9}
            ],
            newPostText: "it-kamasutra.com"

        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: "Dimych"},
                {id: 2, name: "Andrew"},
                {id: 3, name: "Sveta"},
                {id: 4, name: "Sasha"},
                {id: 5, name: "Viktor"},
                {id: 6, name: "Valera"}
            ],
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How are you?"},
                {id: 3, message: "Yo"},
                {id: 4, message: "Yo"},
                {id: 5, message: "Yo"}
            ],
            newMessageBody: ""
        },
        sidebar: {}
    },
    _callSubscriber(state: StateType) {
        console.log('State changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer: (state: StateType) => void) {
        this._callSubscriber = observer
    },
    dispatch(action: any) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state)
    }
}


window.store = store
declare global {
    interface Window {
        store: StoreType;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text})
export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBody = (body: string) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: body})
