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
    postsData: PostsDataType[]
    newPostTextData: string
}
export type MessagesPageType = {
    messagesData: MessagesDataType[]
    dialogsData: DialogsDataType[]
}
export type StateType = {
    profilePage: ProfilePageType
    messagesPage: MessagesPageType
}
export type StoreType = {
    _state:StateType,
    _callSubscriber: (state: StateType)=>void,
    getState: ()=>StateType,
    subscribe: (observer: (state:StateType)=>void)=>void,
    dispatch: (action:any)=>void
}

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
export const store: StoreType = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: "Hi, how are you", likesCount: 12},
                {id: 2, message: "How are you?", likesCount: 23},
                {id: 3, message: "How old are you", likesCount: 2},
                {id: 4, message: "It's my first post", likesCount: 25},
                {id: 5, message: "Yo", likesCount: 9}
            ],
            newPostTextData: "it-kamasutra.com"

        },
        messagesPage: {
            dialogsData: [
                {id: 1, name: "Dimych"},
                {id: 2, name: "Andrew"},
                {id: 3, name: "Sveta"},
                {id: 4, name: "Sasha"},
                {id: 5, name: "Viktor"},
                {id: 6, name: "Valera"}
            ],
            messagesData: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How are you?"},
                {id: 3, message: "Yo"},
                {id: 4, message: "Yo"},
                {id: 5, message: "Yo"}
            ]
        }
    },
    _callSubscriber(state: StateType){
        console.log('State changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer: (state:StateType)=>void){
        this._callSubscriber = observer
    },
    dispatch(action:any){
    if (action.type === ADD_POST) {
        const newPost: PostsDataType = {id: Date.now(), message: this._state.profilePage.newPostTextData, likesCount: 0}
        this._state.profilePage.postsData.push(newPost)
        this._state.profilePage.newPostTextData =''
        this._callSubscriber(this._state)
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
        this._state.profilePage.newPostTextData = action.newText
        this._callSubscriber(this._state)
    }
    }
}

window.store = store
declare global {
    interface Window {
        store:StoreType;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text:string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text})

